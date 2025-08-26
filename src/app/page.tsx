import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';

// Sample product data - in a real app, this would come from the database
const featuredProducts = [
  {
    id: '1',
    name: 'Nike Air Max 270',
    description: 'The Nike Air Max 270 delivers unrivaled, all-day comfort. The shoe\'s design draws inspiration from Air Max icons, showcasing Nike\'s greatest innovation with its large window and fresh array of colors.',
    price: 150.00,
    image: '/api/placeholder/400/400',
    category: 'Running',
    inStock: true,
  },
  {
    id: '2',
    name: 'Nike ZoomX Vaporfly',
    description: 'The Nike ZoomX Vaporfly is designed for elite runners who want to push their limits. With its revolutionary design and lightweight construction, it helps you run faster with less effort.',
    price: 250.00,
    image: '/api/placeholder/400/400',
    category: 'Running',
    inStock: true,
  },
  {
    id: '3',
    name: 'Nike Air Jordan 1',
    description: 'The Air Jordan 1 is a classic basketball shoe that has transcended the court to become a cultural icon. Its timeless design and premium materials make it a must-have for any sneaker collection.',
    price: 170.00,
    image: '/api/placeholder/400/400',
    category: 'Basketball',
    inStock: true,
  },
  {
    id: '4',
    name: 'Nike Free Run',
    description: 'The Nike Free Run is designed to mimic the natural movement of your foot. Its flexible sole and breathable upper provide a barefoot-like feel while offering the protection and support you need.',
    price: 120.00,
    image: '/api/placeholder/400/400',
    category: 'Training',
    inStock: false,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Just Do It
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover the latest in athletic footwear and apparel. From running to basketball, 
              we have everything you need to perform at your best.
            </p>
            <div className="space-x-4">
              <Link
                href="/products"
                className="inline-block bg-white text-gray-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </Link>
              <Link
                href="/categories"
                className="inline-block border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-gray-900 transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular athletic footwear and apparel. 
            Each product is designed to help you achieve your goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-block bg-black text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600">
              Find the perfect gear for your sport and lifestyle
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Running', image: '/api/placeholder/400/300', href: '/categories/running' },
              { name: 'Basketball', image: '/api/placeholder/400/300', href: '/categories/basketball' },
              { name: 'Training', image: '/api/placeholder/400/300', href: '/categories/training' },
            ].map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group block relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
