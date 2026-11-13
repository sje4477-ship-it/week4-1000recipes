import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/recipeService";
import type { Recipe } from "../types/recipe";

function RecipeDetailPage() {
  const [recipe, setRecipe] = useState<Recipe | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  //const pageSize = 6;
  const { n } = useParams();
  const pageID = Number(n);

  useEffect(() => {
    getRecipeById(pageID).then((data) => {
      setRecipe(data);
      setIsLoading(false);
    });
  }, [pageID]);

  if (isLoading) {
    return <p>레시피를 불러오는 중...</p>;
  }

  if (recipe === undefined) {
    return <p>레시피를 찾을 수 없습니다.</p>;
  }

  return (
    <main>
      <div id="recipe-detail-top">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="recipe-card__image"
          width="160"
        />
        <div>
          <h2>{recipe.name}</h2>
          <p>{recipe.difficulty}</p>
          <p>
            총 요리 시간 {recipe.prepTimeMinutes + recipe.cookTimeMinutes}분
          </p>
          <p>준비 시간 {recipe.prepTimeMinutes}분</p>
          <p>조리 시간 {recipe.cookTimeMinutes}분</p>
          <p>
            {recipe.tags.map((tag) => (
              <div key={tag}>{tag}</div>
            ))}
          </p>
        </div>
      </div>
    </main>
  );
}

export default RecipeDetailPage;
