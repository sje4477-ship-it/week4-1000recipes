import type { Recipe } from "../types/recipe";

const API_BASE_URL = "https://frontend-seminar-week5-server.vercel.app";

type FavoritesResponse = {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
};

export async function getFavorites(): Promise<Recipe[]> {
  const response = await fetch(`${API_BASE_URL}/favorites`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("즐겨찾기 목록을 불러오지 못했습니다.");
  }
  const data: FavoritesResponse = await response.json();
  return data.recipes;
}

export async function addFavorite(recipeId: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ recipeId }),
  });

  if (!response.ok) {
    throw new Error("즐겨찾기에 추가하지 못했습니다.");
  }
}

export async function removeFavorite(recipeId: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/favorites/${recipeId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("즐겨찾기를 해제하지 못했습니다.");
  }
}
