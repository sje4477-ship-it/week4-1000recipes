import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { User } from "../services/authService";
import { getFavorites } from "../services/favoriteService";
import type { Recipe } from "../types/recipe";

type MyPageProps = {
  user: User | null;
};

function MyPage({ user }: MyPageProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getFavorites()
      .then((favoriteRecipes) => setRecipes(favoriteRecipes))
      .catch(() => {
        setErrorMessage("즐겨찾기 목록을 불러오지 못했습니다.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <main className="mx-auto mt-8 w-full max-w-5xl space-y-6 px-6">
      <section>
        <h1 className="text-2xl font-bold text-slate-900">마이페이지</h1>
        {user && (
          <p className="mt-2 text-slate-600">
            {user.displayName}님, 안녕하세요.
          </p>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          즐겨찾기한 레시피
        </h2>

        {isLoading ? (
          <p>즐겨찾기를 불러오는 중...</p>
        ) : errorMessage ? (
          <p className="text-red-600">{errorMessage}</p>
        ) : recipes.length === 0 ? (
          <p>아직 즐겨찾기한 레시피가 없어요.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <li key={recipe.id}>
                <Link
                  to={`/recipes/${recipe.id}`}
                  className="block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="h-44 w-full object-cover"
                  />
                  <div className="space-y-2 p-4">
                    <h3 className="font-bold text-slate-900">{recipe.name}</h3>
                    <p className="text-sm text-slate-600">
                      {recipe.cuisine} · {recipe.difficulty}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default MyPage;
