import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton";
import { getRelatedRecipes, useRecipeById } from "../services/recipeService";
import type { Recipe } from "../types/recipe";

function RecipeDetailPage() {
  //const [recipe, setRecipe] = useState<Recipe | undefined>();
  const [relatedRecipes, setRelatedRecipes] = useState<Recipe[]>();
  //const [isLoading, setIsLoading] = useState(true);
  const [isRelatedLoading, setIsRelatedLoading] = useState(true);
  //const [currentPage, setCurrentPage] = useState(1);
  //const pageSize = 6;
  const { n } = useParams();
  const pageID = Number(n);
  const { data, isPending: isLoading, isError } = useRecipeById(pageID);
  const recipe: Recipe = data;

  useEffect(() => {
    scrollTo(0, 0);
    //setIsLoading(true);
    setIsRelatedLoading(true);
    /*useRecipeById(pageID).then((data) => {
      setRecipe(data);
      setIsLoading(false);
    });*/
    getRelatedRecipes(pageID).then((data) => {
      setRelatedRecipes(data);
      setIsRelatedLoading(false);
    });
  }, [pageID]);

  if (isLoading) {
    return <div className="loading-recipe">레시피를 불러오는 중...</div>;
  }
  if (isError) {
    return <div className="loading-recipe">레시피를 불러오지 못했어요.</div>;
  }

  if (recipe === undefined) {
    return <div className="cannot-find-recipe">레시피를 찾을 수 없습니다.</div>;
  }

  return (
    <main className="grid-cols-1">
      <header className=" w-screen relative left-1/2 -translate-x-1/2 bg-gray-100 border-b-0 text-center mt-[2em]">
        <Link to="/">
          <h1 className="font-bold text-2xl py-[1em]">천 개의 레시피</h1>
        </Link>
      </header>
      <div className="flex flex-col gap-10">
        <div></div>
        <div id="detail-top" className="flex flex-row gap-5">
          <img
            src={recipe.image}
            alt={""}
            className="recipe-card__image aspect-square border basis-1/3 rounded-xl"
            width="160"
          />
          <div className="basis-2/3 flex flex-col gap-2">
            <div className="flex flex-row gap-4 items-center pb-5">
              <h2 className="detail-h2">{recipe.name}</h2>
              <p className="text-sm text-blue-600">{recipe.difficulty}</p>
            </div>
            <p>
              총 요리 시간 {recipe.prepTimeMinutes + recipe.cookTimeMinutes}분
            </p>
            <p>준비 시간 {recipe.prepTimeMinutes}분</p>
            <p>조리 시간 {recipe.cookTimeMinutes}분</p>
            <div className="mt-auto flex flex-row gap-2">
              {recipe.tags.map((tag) => (
                <div key={tag} className="bg-gray-200 rounded-xs p-1 text-xs">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
        <FavoriteButton recipeId={recipe.id} />
        <div className="border-b border-gray-200"></div>

        <div id="detail-ingredient">
          <h2 className="detail-h2 pb-5">재료</h2>
          <p>{recipe.ingredients.join(", ")}</p>
        </div>

        <div className="border-b border-gray-200"></div>

        <div id="detail-recipe">
          <h2 className="detail-h2 pb-5">레시피</h2>
          <ol className="flex flex-col gap-2">
            {recipe.instructions.map((step, index) => (
              <li key={String(recipe.id) + String(index)}>
                {index + 1}. {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="border-b border-gray-200"></div>

        <div id="detail-info">
          <h2 className="detail-h2 pb-5">요리 정보</h2>
          <div className="flex flex-col gap-2">
            <p>유형: {recipe.cuisine}</p>
            <p>음식 특징: {recipe.mealType}</p>
            <p>칼로리: {recipe.caloriesPerServing}kcal</p>
            <p>
              별점: {recipe.rating} (리뷰 {recipe.reviewCount}개)
            </p>
          </div>
        </div>

        <div className="border-b border-gray-200"></div>

        <div id="detail-related">
          <h2 className="detail-h2 pb-5">이 요리와 연관 있는 레시피 보기</h2>
          <div>
            {isRelatedLoading || relatedRecipes === undefined ? (
              <p>연관 레시피를 불러오는 중...</p>
            ) : (
              <div className="overflow-hidden">
                <div className="related-scroll-animate gap-5">
                  {relatedRecipes.map((recipe) => (
                    <Link
                      className="flex flex-col aspect-square recipe-card group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                      key={recipe.id}
                      to={`/recipes/${recipe.id}`}
                    >
                      <img
                        src={recipe.image}
                        alt={""}
                        className="recipe-card__image w-xs min-h-0 flex-1 object-cover transition duration-300 group-hover:scale-105"
                      />
                      <div className="recipe-card__content shrink-0 space-y-1 bg-slate-50 p-4">
                        <div className="flex flex-row w-full">
                          <h2 className="text-xl font-bold text-slate-900">
                            {recipe.name}
                          </h2>
                          <div className="text-sm text-blue-600 ml-auto">
                            {recipe.difficulty}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {recipe.tags.map((tag) => (
                            <div
                              key={tag}
                              className="mt-2 rounded-md border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600"
                            >
                              {tag}
                            </div>
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
      </div>
    </main>
  );
}

export default RecipeDetailPage;
