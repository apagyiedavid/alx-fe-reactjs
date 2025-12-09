import { useEffect, useState } from "react";
import recipesData from "../data.json";
import { Link } from "react-router-dom";


function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(recipesData);
  }, []);

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
      King Dave Recipe Sharing Platform
      </h1>
      <Link
       to="/add-recipe"
       className="inline-block mb-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
>
       + Add New Recipe
       </Link>


      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="yellow-50 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                {recipe.title}
              </h2>

              <p className="text-gray-600 mb-4">
                {recipe.summary}
              </p>

              <Link
                to={`/recipe/${recipe.id}`}
                className="text-yellow-600 font-medium hover:underline hover:text-red-600"
              >
                View Recipe →
              </Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
