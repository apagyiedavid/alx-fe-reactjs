import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import recipesData from "../data.json";



function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const foundRecipe = recipesData.find(
      (item) => item.id === parseInt(id)
    );
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) {
    return <p className="text-center mt-10">Recipe not found</p>;
  }

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-72 object-cover rounded-t-lg"
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">
            {recipe.title}
          </h1>

          <h2 className="text-xl font-semibold mb-2">
            Ingredients
          </h2>
          <ul className="list-disc list-inside mb-6">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold mb-2">
            Cooking Instructions
          </h2>
          <ol className="list-decimal list-inside space-y-2">
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
