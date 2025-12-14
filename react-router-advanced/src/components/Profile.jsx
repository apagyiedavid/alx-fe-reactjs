import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

// ProfileDetails Component (needs to be exported)
export function ProfileDetails() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Details</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <p className="mt-1 text-lg text-gray-900">John Doe</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <p className="mt-1 text-lg text-gray-900">john@example.com</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <p className="mt-1 text-gray-600">Full-stack developer passionate about React and modern web technologies.</p>
        </div>
      </div>
    </div>
  );
}

// ProfileSettings Component (needs to be exported)
export function ProfileSettings() {
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('light');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Notifications
          </label>
          <div className="flex items-center">
            <button
              type="button"
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                notifications ? 'bg-blue-600' : 'bg-gray-200'
              }`}
              onClick={() => setNotifications(!notifications)}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  notifications ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className="ml-3 text-sm text-gray-600">
              {notifications ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Theme
          </label>
          <div className="flex space-x-4">
            {['light', 'dark', 'auto'].map((themeOption) => (
              <button
                key={themeOption}
                className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                  theme === themeOption
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setTheme(themeOption)}
              >
                {themeOption}
              </button>
            ))}
          </div>
        </div>

        <div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Profile Component
export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">User Profile</h1>
          <p className="text-gray-600 mt-2">Manage your profile information and settings</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-8">
              <nav className="space-y-2">
                <Link
                  to="/profile"
                  className="block px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium text-gray-700"
                  end
                >
                  Profile Details
                </Link>
                <Link
                  to="/profile/settings"
                  className="block px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors font-medium text-gray-700"
                >
                  Settings
                </Link>
                <button
                  onClick={() => navigate(-1)}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium text-gray-700 mt-4"
                >
                  ← Go Back
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area with Routes */}
          <div className="lg:w-3/4">
            <Routes>
              <Route path="/" element={<ProfileDetails />} />
              <Route path="/settings" element={<ProfileSettings />} />
            </Routes>

            {/* Additional Info Card */}
            <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Profile Completion</h3>
              <div className="mb-4">
                <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-3/4"></div>
                </div>
                <p className="text-sm mt-2">75% complete</p>
              </div>
              <p className="text-blue-100">Complete your profile to unlock all features!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}