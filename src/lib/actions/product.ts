"use server";
import { and, asc, desc, eq, ilike, inArray, sql } from "drizzle-orm";
import { db } from "../db";
import { products } from "../db/schema/products";
import { productVariants } from "../db/schema/variants";
import { productImages } from "../db/schema/product_images";
import { colors } from "../db/schema/filters/colors";
import { sizes } from "../db/schema/filters/sizes";
import { genders } from "../db/schema/filters/genders";
import { categories } from "../db/schema/categories";
import { brands } from "../db/schema/brands";

// Filter Params Type
export interface ProductFilterParams {
  search?: string;
  gender?: string[];
  size?: string[];
  color?: string[];
  category?: string[]; // category slugs
  brand?: string[]; // brand slugs
  priceMin?: number;
  priceMax?: number;
  sortBy?: "featured" | "newest" | "price_asc" | "price_desc";
  page?: number;
  limit?: number;
}

export interface ProductListItem {
  id: string;
  name: string;
  description: string | null;
  slug?: string; // if added later
  minPrice: number | null;
  maxPrice: number | null;
  category: string | null;
  brand: string | null;
  gender: string | null;
  imageUrls: string[]; // prioritized primary first
  createdAt: Date | null;
}

export interface ProductListResult {
  products: ProductListItem[];
  totalCount: number;
  page: number;
  limit: number;
}

// Helper to build order by
function buildOrder(sortBy?: ProductFilterParams["sortBy"]) {
  switch (sortBy) {
    case "price_asc":
      return asc(sql`min_price`);
    case "price_desc":
      return desc(sql`max_price`);
    case "newest":
      return desc(products.createdAt);
    default:
      return desc(products.createdAt);
  }
}

// Main list fetch
export async function getAllProducts(
  params: ProductFilterParams
): Promise<ProductListResult> {
  const {
    search,
    gender = [],
    size = [],
    color = [],
    category = [],
    brand = [],
    priceMin,
    priceMax,
    sortBy,
    page = 1,
    limit = 24,
  } = params;

  const offset = (page - 1) * limit;

  // Base filters collected
  const filters = [] as any[];
  filters.push(eq(products.isPublished, true));
  if (search) filters.push(ilike(products.name, `%${search}%`));
  if (gender.length) filters.push(inArray(genders.slug, gender));
  if (category.length) filters.push(inArray(categories.slug, category));
  if (brand.length) filters.push(inArray(brands.slug, brand));
  // price filters will be applied on aggregated price values later via HAVING

  // Build CTE for variant aggregation for min/max price & variant derived filters (color/size)
  const variantAgg = db.$with("variant_agg").as(
    db
      .select({
        productId: productVariants.productId,
        minPrice: sql<number>`MIN(COALESCE(${productVariants.salePrice}, ${productVariants.price}))`,
        maxPrice: sql<number>`MAX(COALESCE(${productVariants.salePrice}, ${productVariants.price}))`,
        colors: sql<string[]>`ARRAY_AGG(DISTINCT ${productVariants.colorId})`,
        sizes: sql<string[]>`ARRAY_AGG(DISTINCT ${productVariants.sizeId})`,
      })
      .from(productVariants)
      .groupBy(productVariants.productId)
  );

  // Images aggregation (choose up to 3, primary first then by sort_order)
  // If a color filter is active, prefer images tied to variants of that color first
  const imagesAgg = db.$with("images_agg").as(
    db
      .select({
        productId: productImages.productId,
        images: sql<
          string[]
        >`ARRAY_AGG(${productImages.url} ORDER BY CASE WHEN ${productImages.variantId} IS NOT NULL THEN 0 ELSE 1 END, ${productImages.isPrimary} DESC, ${productImages.sortOrder} ASC)`,
      })
      .from(productImages)
      .groupBy(productImages.productId)
  );

  // Compose main query
  const baseQuery = db
    .with(variantAgg, imagesAgg)
    .select({
      id: products.id,
      name: products.name,
      description: products.description,
      minPrice: sql<number>`variant_agg.minPrice`.as("min_price"),
      maxPrice: sql<number>`variant_agg.maxPrice`.as("max_price"),
      category: categories.slug,
      brand: brands.slug,
      gender: genders.slug,
      images: sql<string[]>`COALESCE(images_agg.images, ARRAY[]::text[])`,
      createdAt: products.createdAt,
    })
    .from(products)
    .leftJoin(variantAgg, eq(variantAgg.productId, products.id))
    .leftJoin(imagesAgg, eq(imagesAgg.productId, products.id))
    .leftJoin(categories, eq(categories.id, products.categoryId))
    .leftJoin(genders, eq(genders.id, products.genderId))
    .leftJoin(brands, eq(brands.id, products.brandId))
    .where(filters.length ? and(...filters) : undefined);

  // Wrap base in subquery to apply variant-level filters (color/size) & price HAVING
  const rows = await db
    .select()
    .from(baseQuery.as("p"))
    .where(
      and(
        color.length
          ? sql`EXISTS (SELECT 1 FROM ${productVariants} v WHERE v.product_id = p.id AND v.color_id IN (${sql.join(
              color
            )}) )`
          : undefined,
        size.length
          ? sql`EXISTS (SELECT 1 FROM ${productVariants} v WHERE v.product_id = p.id AND v.size_id IN (${sql.join(
              size
            )}) )`
          : undefined,
        priceMin != null ? sql`p.min_price >= ${priceMin}` : undefined,
        priceMax != null ? sql`p.max_price <= ${priceMax}` : undefined
      )
    )
    .orderBy(buildOrder(sortBy))
    .limit(limit)
    .offset(offset);

  // Total count (reuse same filters, but count distinct products)
  const countRes = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(baseQuery.as("p"))
    .where(
      and(
        color.length
          ? sql`EXISTS (SELECT 1 FROM ${productVariants} v WHERE v.product_id = p.id AND v.color_id IN (${sql.join(
              color
            )}) )`
          : undefined,
        size.length
          ? sql`EXISTS (SELECT 1 FROM ${productVariants} v WHERE v.product_id = p.id AND v.size_id IN (${sql.join(
              size
            )}) )`
          : undefined,
        priceMin != null ? sql`p.min_price >= ${priceMin}` : undefined,
        priceMax != null ? sql`p.max_price <= ${priceMax}` : undefined
      )
    );

  const productsMapped: ProductListItem[] = rows.map((r) => ({
    id: r.id,
    name: r.name,
    description: r.description ?? null,
    minPrice: (r as any).min_price ?? null,
    maxPrice: (r as any).max_price ?? null,
    category: r.category ?? null,
    brand: r.brand ?? null,
    gender: r.gender ?? null,
    imageUrls: (r as any).images?.slice(0, 3) ?? [],
    createdAt: r.createdAt ?? null,
  }));

  return {
    products: productsMapped,
    totalCount: countRes[0]?.count ?? 0,
    page,
    limit,
  };
}

// getProduct detailed fetch
export interface ProductDetailVariant {
  id: string;
  sku: string;
  price: number;
  salePrice: number | null;
  colorId: string;
  sizeId: string;
  inStock: number;
  weight: number;
}
export interface ProductDetailImage {
  id: string;
  url: string;
  isPrimary: boolean;
  sortOrder: number;
  variantId: string | null;
}
export interface ProductDetail {
  id: string;
  name: string;
  description: string | null;
  category: { id: string; slug: string; name: string } | null;
  brand: { id: string; slug: string; name: string } | null;
  gender: { id: string; slug: string; label: string } | null;
  variants: ProductDetailVariant[];
  images: ProductDetailImage[];
  minPrice: number | null;
  maxPrice: number | null;
  createdAt: Date | null;
}

export async function getProduct(
  productId: string
): Promise<ProductDetail | null> {
  // Base product row
  const productRow = await db.query.products.findFirst({
    where: (p, { eq }) => eq(p.id, productId),
    with: {
      // relations trimmed earlier; fetching manually via separate queries below for clarity & to avoid cycles
    } as any,
  });
  if (!productRow) return null;

  const variantsRows = await db
    .select()
    .from(productVariants)
    .where(eq(productVariants.productId, productId));
  const imagesRows = await db
    .select()
    .from(productImages)
    .where(eq(productImages.productId, productId));
  const categoryRow = await db
    .select({ id: categories.id, slug: categories.slug, name: categories.name })
    .from(categories)
    .where(eq(categories.id, productRow.categoryId));
  const genderRow = await db
    .select({ id: genders.id, slug: genders.slug, label: genders.slug })
    .from(genders)
    .where(eq(genders.id, productRow.genderId));
  const brandRow = await db
    .select({ id: brands.id, slug: brands.slug, name: brands.name })
    .from(brands)
    .where(eq(brands.id, productRow.brandId));

  const minMax = await db
    .select({
      min: sql<number>`MIN(COALESCE(${productVariants.salePrice}, ${productVariants.price}))`,
      max: sql<number>`MAX(COALESCE(${productVariants.salePrice}, ${productVariants.price}))`,
    })
    .from(productVariants)
    .where(eq(productVariants.productId, productId));

  return {
    id: productRow.id,
    name: productRow.name,
    description: productRow.description ?? null,
    category: categoryRow[0] || null,
    brand: brandRow[0] || null,
    gender: genderRow[0] || null,
    variants: variantsRows.map((v) => ({
      id: v.id,
      sku: v.sku,
      price: Number(v.price),
      salePrice: v.salePrice ? Number(v.salePrice) : null,
      colorId: v.colorId,
      sizeId: v.sizeId,
      inStock: v.inStock,
      weight: v.weight,
    })),
    images: imagesRows.map((i) => ({
      id: i.id,
      url: i.url,
      isPrimary: i.isPrimary,
      sortOrder: i.sortOrder ?? 0,
      variantId: i.variantId ?? null,
    })),
    minPrice: minMax[0]?.min ?? null,
    maxPrice: minMax[0]?.max ?? null,
    createdAt: productRow.createdAt ?? null,
  };
}
