import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById, getRelatedRecipes } from "../services/recipeService";
import type { Recipe } from "../types/recipe";

function RecipeDetailPage() {
  const [recipe, setRecipe] = useState<Recipe | undefined>();
  const [relatedRecipes, setRelatedRecipe] = useState<Recipe[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isRelatedLoading, setIsRelatedLoading] = useState(true);
  //const [currentPage, setCurrentPage] = useState(1);
  //const pageSize = 6;
  const { n } = useParams();
  const pageID = Number(n);

  useEffect(() => {
    getRecipeById(pageID).then((data) => {
      setRecipe(data);
      setIsLoading(false);
    });
    getRelatedRecipes(pageID).then((data) => {
      setRelatedRecipe(data);
      setIsRelatedLoading(false);
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
      <div id="detail-top">
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
      <div id="detail-ingredient">
        <h2>재료</h2>
        <p>{recipe.ingredients.join(", ")}</p>
      </div>
      <div id="detail-recipe">
        <h2>레시피</h2>
        <ol>
          {recipe.instructions.map((step, index) => (
            <li key={String(recipe.id) + String(index)}>
              {index + 1}. {step}
            </li>
          ))}
        </ol>
      </div>
      <div id="detail-info">
        <h2>요리 정보</h2>
        <p>유형: {recipe.cuisine}</p>
        <p>음식 특징: {recipe.mealType}</p>
        <p>칼로리: {recipe.caloriesPerServing}kcal</p>
        <p>
          별점: {recipe.rating} (리뷰 {recipe.reviewCount}개)
        </p>
      </div>
    </main>
  );
}

export default RecipeDetailPage;
