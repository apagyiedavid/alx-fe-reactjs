import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <Link to="/profile">Profile</Link> |{" "}
        <Link to="/post/5">View Post</Link>
      </nav>
    </div>
  );
}

export default Home;
