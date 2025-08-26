"use client";

import { useState } from "react";
import Card from "@/components/Card";

// Sample product data
const allProducts = [
  {
    id: "1",
    title: "Nike Air Max 270",
    description: "The Nike Air Max 270 delivers unrivaled, all-day comfort.",
    price: 150.0,
    image: "/shoes/shoe-8.avif",
    category: "Running",
    inStock: true,
  },
  {
    id: "2",
    title: "Nike ZoomX Vaporfly",
    description: "The Nike ZoomX Vaporfly is designed for elite runners.",
    price: 250.0,
    image: "/shoes/shoe-9.avif",
    category: "Running",
    inStock: true,
  },
  {
    id: "3",
    title: "Nike Air Jordan 1",
    description: "The Air Jordan 1 is a classic basketball shoe.",
    price: 170.0,
    image: "/shoes/shoe-10.avif",
    category: "Basketball",
    inStock: true,
  },
  {
    id: "4",
    title: "Nike Free Run",
    description: "The Nike Free Run mimics natural foot movement.",
    price: 120.0,
    image: "/shoes/shoe-11.avif",
    category: "Training",
    inStock: false,
  },
  {
    id: "5",
    title: "Nike LeBron 18",
    description: "The LeBron 18 provides explosive power and comfort.",
    price: 200.0,
    image: "/shoes/shoe-12.avif",
    category: "Basketball",
    inStock: true,
  },
  {
    id: "6",
    title: "Nike Metcon 6",
    description: "The Metcon 6 is perfect for CrossFit and training.",
    price: 130.0,
    image: "/shoes/shoe-13.avif",
    category: "Training",
    inStock: true,
  },
  {
    id: "7",
    title: "Nike Pegasus 38",
    description: "The Pegasus 38 offers smooth, responsive cushioning.",
    price: 120.0,
    image: "/shoes/shoe-14.avif",
    category: "Running",
    inStock: true,
  },
  {
    id: "8",
    title: "Nike React Infinity Run",
    description: "The React Infinity Run reduces injury risk.",
    price: 160.0,
    image: "/shoes/shoe-15.avif",
    category: "Running",
    inStock: true,
  },
];

const categories = ["All", "Running", "Basketball", "Training"];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">All Products</h1>
        <p className="text-gray-600">
          Discover our complete collection of athletic footwear
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Search Products
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or description..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label
              htmlFor="sort"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Sort By
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {sortedProducts.length} of {allProducts.length} products
        </p>
      </div>

      {/* Products Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <Card key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No products found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
              setSortBy("name");
            }}
            className="mt-4 inline-block bg-black text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-800 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
