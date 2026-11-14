import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRecipeById, getRelatedRecipes } from "../services/recipeService";
import type { Recipe } from "../types/recipe";

function RecipeDetailPage() {
  const [recipe, setRecipe] = useState<Recipe | undefined>();
  const [relatedRecipes, setRelatedRecipes] = useState<Recipe[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isRelatedLoading, setIsRelatedLoading] = useState(true);
  //const [currentPage, setCurrentPage] = useState(1);
  //const pageSize = 6;
  const { n } = useParams();
  const pageID = Number(n);

  useEffect(() => {
    scrollTo(0, 0);
    setIsLoading(true);
    getRecipeById(pageID).then((data) => {
      setRecipe(data);
      setIsLoading(false);
    });
    getRelatedRecipes(pageID).then((data) => {
      setRelatedRecipes(data);
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
    <main className="grid-cols-1">
      <header className=" w-screen relative left-1/2 -translate-x-1/2 bg-gray-100 border-b-0 text-center -mt-[2em]">
        <Link to="/">
          <h1 className="font-bold text-2xl py-[1em]">천 개의 레시피</h1>
        </Link>
      </header>
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
          <div>
            {recipe.tags.map((tag) => (
              <div key={tag}>{tag}</div>
            ))}
          </div>
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
      <div id="detail-related">
        <h2>이 요리와 연관 있는 레시피 보기</h2>
        <div>
          {isRelatedLoading || relatedRecipes === undefined ? (
            <p>연관 레시피를 불러오는 중...</p>
          ) : (
            <div className="overflow-hidden">
              <div className="related-scroll-animate">
                {relatedRecipes.map((recipe) => (
                  <Link
                    className="recipe-card"
                    key={recipe.id}
                    to={`/recipes/${recipe.id}`}
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="recipe-card__image"
                      width="160"
                    />
                    <div className="recipe-card__content">
                      <h2>{recipe.name}</h2>
                      <p>{recipe.difficulty}</p>
                      <div>
                        {recipe.tags.map((tag) => (
                          <div key={tag}>{tag}</div>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default RecipeDetailPage;
