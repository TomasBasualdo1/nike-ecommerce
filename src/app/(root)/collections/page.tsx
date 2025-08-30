import Link from "next/link";
import Image from "next/image";

const collections = [
  {
    name: "Lifestyle",
    description: "Everyday shoes for all-day comfort",
    image: "/shoes/shoe-5.avif",
    href: "/products?category[]=running&category[]=lifestyle",
  },
  {
    name: "Shoes",
    description: "Versatile shoes for all your workouts",
    image: "/shoes/shoe-6.avif",
    href: "/products?category[]=running&category[]=shoes",
  },
  {
    name: "Running Shoes",
    description: "Performance footwear for every runner",
    image: "/shoes/shoe-7.avif",
    href: "/products?category[]=running&category[]=running-shoes",
  },
];

export default function CollectionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-dark-900 mb-4">
          Shop by Collection
        </h1>
        <p className="text-dark-500 text-lg max-w-2xl mx-auto">
          Curated collections to help you perform at your best.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {collections.map((collection) => (
          <Link
            key={collection.name}
            href={collection.href}
            className="group block relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-64">
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {collection.name}
                </h3>
                <p className="text-light-300 text-sm">
                  {collection.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
