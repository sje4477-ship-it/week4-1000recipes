import { useEffect, useState } from "react";
import { getAllRecipes } from "../services/recipeService";
import type { Recipe } from "../types/recipe";

function RecipeDetailPage() {
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
      <h1>레시피 목록</h1>
      <div>
        <button
          type="button"
          onClick={() => {
            setSelectedTags([]);
            setCurrentPage(1);
          }}
        >
          전체
        </button>

        {allTags.map((tag) => (
          <button type="button" key={tag} onClick={() => toggleTag(tag)}>
            {tag}
          </button>
        ))}
      </div>

      {visibleRecipes.map((recipe) => (
        <article className="recipe-card" key={recipe.id}>
          <img
            src={recipe.image}
            alt={recipe.name}
            className="recipe-card__image"
            width="160"
          />
          <div className="recipe-card__content">
            <h2>{recipe.name}</h2>
            <p>
              {recipe.cuisine} · {recipe.difficulty}
            </p>
            <p>조리 시간: {recipe.cookTimeMinutes}분</p>
            <p>태그: {recipe.tags.join(", ")}</p>
          </div>
        </article>
      ))}
      <div>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map(
          (page) => (
            <button
              type="button"
              key={page}
              onClick={() => setCurrentPage(page)}
              disabled={currentPage === page}
            >
              {page}
            </button>
          ),
        )}
      </div>
    </main>
  );
}

export default RecipeDetailPage;
