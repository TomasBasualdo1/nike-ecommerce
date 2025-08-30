import Link from "next/link";
import Image from "next/image";
import Card from "@/components/Card";
import { getFeaturedProducts } from "@/lib/actions/product";

export default async function Home() {
  // Fetch 4 random products from the database
  const featuredProducts = await getFeaturedProducts(4);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-dark-900 to-dark-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Just Do It
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-light-400 max-w-2xl">
                Discover the latest in athletic footwear and apparel. From
                running to basketball, we have everything you need to perform at
                your best.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="inline-block bg-white text-dark-900 px-8 py-4 rounded-md font-semibold hover:bg-light-200 transition-colors text-center"
                >
                  Shop Now
                </Link>
                <Link
                  href="/collections"
                  className="inline-block border-2 border-white text-white px-8 py-4 rounded-md font-semibold hover:bg-white hover:text-dark-900 transition-colors text-center"
                >
                  Browse Collections
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/hero-shoe.png"
                alt="Featured Nike Shoe"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
            Featured Products
          </h2>
          <p className="text-dark-500 text-lg max-w-2xl mx-auto">
            Discover our most popular athletic footwear and apparel. Each
            product is designed to help you achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              title={product.name}
              image={product.imageUrl || "/shoes/shoe-1.jpg"}
              price={Number(product.minPrice || 0)}
              originalPrice={
                product.minPrice !== null &&
                product.maxPrice !== null &&
                product.maxPrice !== product.minPrice
                  ? Number(product.maxPrice)
                  : undefined
              }
              category={product.subtitle || undefined}
              href={`/products/${product.id}`}
              variant="featured"
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-block bg-dark-900 text-white px-8 py-4 rounded-md font-semibold hover:bg-dark-700 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-dark-500 text-lg">
              Find the perfect gear for your sport and lifestyle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Lifestyle",
                image: "/shoes/shoe-5.avif",
                href: "/products?category[]=running&category[]=lifestyle",
                description: "Everyday shoes for all-day comfort",
              },
              {
                name: "Shoes",
                image: "/shoes/shoe-6.avif",
                href: "//products?category[]=running&category[]=shoes",
                description: "Versatile shoes for all your workouts",
              },
              {
                name: "Running Shoes",
                image: "/shoes/shoe-7.avif",
                href: "/products?category[]=running&category[]=running-shoes",
                description: "Performance footwear for every runner",
              },
            ].map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group block relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-light-300 text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-dark-900 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Elevate Your Game?
          </h2>
          <p className="text-light-400 text-lg mb-8 max-w-2xl mx-auto">
            Join millions of athletes worldwide who trust Nike for their
            performance needs. Discover your potential with our latest
            collection.
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-dark-900 px-8 py-4 rounded-md font-semibold hover:bg-light-200 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
}
