import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllRecipes } from "../services/recipeService";
import type { Recipe } from "../types/recipe";

function RecipeListPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const allTags = [...new Set(recipes.flatMap((recipe) => recipe.tags))];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredRecipes =
    selectedTags.length === 0
      ? recipes
      : recipes.filter((recipe) =>
          selectedTags.some((tag) => recipe.tags.includes(tag)),
        );

  const pageCount = Math.ceil(filteredRecipes.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const visibleRecipes = filteredRecipes.slice(
    startIndex,
    startIndex + pageSize,
  );

  const toggleTag = (tag: string) => {
    setSelectedTags((currentTags) =>
      currentTags.includes(tag)
        ? currentTags.filter((currentTag) => currentTag !== tag)
        : [...currentTags, tag],
    );
    setCurrentPage(1);
  };

  useEffect(() => {
    getAllRecipes().then((data) => {
      setRecipes(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p>레시피를 불러오는 중...</p>;
  }

  return (
    <main>
      <h1 className="text-2xl text-black font-bold"> 레시피 목록</h1>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-md bg-black px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
          onClick={() => {
            setSelectedTags([]);
            setCurrentPage(1);
          }}
        >
          전체
        </button>

        {allTags.map((tag) => (
          <button
            type="button"
            key={tag}
            className={`rounded-xl px-3 py-2 text-sm font-semibold shadow-sm transition ${
              selectedTags.includes(tag)
                ? "bg-gray-500 text-white"
                : "bg-black text-white hover:bg-gray-600"
            }`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibleRecipes.map((recipe) => (
          <Link
            className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            key={recipe.id}
            to={`/recipes/${recipe.id}`}
          >
            <img
              src={recipe.image}
              alt={recipe.name}
              className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
            />
            <div className="space-y-1 bg-slate-50 p-4">
              <h2 className="text-xl font-bold text-slate-900">
                {recipe.name}
              </h2>
              <p className="text-sm text-blue-600">
                {recipe.cuisine} · {recipe.difficulty}
              </p>
              <p className="text-sm text-blue-600">
                조리 시간: {recipe.cookTimeMinutes}분
              </p>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="mt-2 rounded-md border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        {Array.from({ length: pageCount }, (_, index) => index + 1).map(
          (page) => (
            <button
              type="button"
              key={page}
              onClick={() => setCurrentPage(page)}
              disabled={currentPage === page}
              className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                currentPage === page
                  ? "text-slate-400"
                  : "text-gray-900 hover:text-slate-600"
              }`}
            >
              {page}
            </button>
          ),
        )}
      </div>
    </main>
  );
}

export default RecipeListPage;
