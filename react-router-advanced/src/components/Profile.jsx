import { Link, Outlet } from "react-router-dom";

function Profile() {
  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      <div className="flex gap-4 mb-6">
        <Link to="" className="text-blue-600 hover:underline">
          Details
        </Link>

        <Link to="settings" className="text-blue-600 hover:underline">
          Settings
        </Link>
      </div>

      <Outlet />
    </div>
  );
}

export default Profile;
