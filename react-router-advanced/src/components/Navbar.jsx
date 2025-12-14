import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex gap-6">
      <Link to="/profile" className="hover:underline">
        Profile
      </Link>

      <Link to="/blog/1" className="hover:underline">
        Blog Post 1
      </Link>

      <Link to="/blog/2" className="hover:underline">
        Blog Post 2
      </Link>
    </nav>
  );
}

export default Navbar;
