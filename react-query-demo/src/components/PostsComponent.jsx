import { useQuery } from "react-query";

const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};

function PostsComponent() {
  const query = useQuery(
    ["posts"],            // ✅ array key (important)
    fetchPosts,
    {
      cacheTime: 1000 * 60 * 5,          // ✅ required
      staleTime: 1000 * 60 * 1,          // ✅ required
      refetchOnWindowFocus: false,       // ✅ required
      keepPreviousData: true,            // ✅ required
    }
  );

  if (query.isLoading) {
    return <p>Loading posts...</p>;
  }

  if (query.isError) {
    return <p>Error: {query.error.message}</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Posts</h2>

      <button onClick={query.refetch} style={{ marginBottom: "10px" }}>
        Refetch Posts
      </button>

      <ul>
        {query.data.slice(0, 10).map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsComponent;
