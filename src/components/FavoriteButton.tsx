import { useEffect, useState } from "react";
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../services/favoriteService";

type FavoriteButtonProps = {
  recipeId: number;
};

function FavoriteButton({ recipeId }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getFavorites()
      .then((recipes) => {
        setIsFavorite(recipes.some((recipe) => recipe.id === recipeId));
      })
      .catch(() => {
        setErrorMessage(
          "즐겨찾기 상태를 불러오지 못했어요. 로그인 상태를 확인해 주세요.",
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [recipeId]);

  const handleClick = async () => {
    const previousFavorite = isFavorite;
    const nextFavorite = !previousFavorite;

    setIsFavorite(nextFavorite);
    setIsSaving(true);
    setErrorMessage("");

    try {
      if (nextFavorite) {
        await addFavorite(recipeId);
      } else {
        await removeFavorite(recipeId);
      }
    } catch {
      setIsFavorite(previousFavorite);
      setErrorMessage("즐겨찾기 변경에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      {!isLoading && (
        <button
          type="button"
          onClick={handleClick}
          disabled={isSaving}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-black shadow-sm transition hover:border-gray-400 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isFavorite ? "즐겨찾기 해제" : "즐겨찾기"}
        </button>
      )}
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}

export default FavoriteButton;
