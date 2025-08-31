import Link from "next/link";

export default function OrdersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-dark-900 mb-8">My Orders</h1>

        <div className="bg-white rounded-lg shadow-sm border border-light-300 p-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-light-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-dark-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-dark-900 mb-2">
              No orders yet
            </h2>
            <p className="text-dark-700 mb-6">
              When you place your first order, it will appear here.
            </p>
            <Link
              href="/products"
              className="inline-block bg-dark-900 text-white px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
