export default function ProfilePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-dark-900 mb-8">
          Profile Settings
        </h1>

        <div className="bg-white rounded-lg shadow-sm border border-light-300 p-6">
          <h2 className="text-xl font-semibold text-dark-900 mb-4">
            Account Information
          </h2>
          <p className="text-dark-700 mb-4">
            Manage your account settings and personal information.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-light-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dark-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-light-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dark-500"
                placeholder="Enter your email"
              />
            </div>

            <button className="bg-dark-900 text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
