import { useParams } from "react-router-dom";

function BlogPost() {
  const { id } = useParams();

  return (
    <div className="max-w-lg mx-auto bg-green-100 p-6 rounded">
      <h2 className="text-xl font-bold mb-2">
        Blog Post #{id}
      </h2>

      <p className="text-gray-700">
        This is a dynamic blog post page.
      </p>
    </div>
  );
}

export default BlogPost;
