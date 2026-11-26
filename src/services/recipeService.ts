import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { recipes } from "../data/recipes.ts";
import type { Recipe } from "../types/recipe";

export function useAllRecipes() {
  return useQuery({
    queryKey: ["recipes", { limit: 100, skip: 0 }],
    queryFn: async () => {
      const params = new URLSearchParams({
        limit: "100",
        skip: "0",
        select: "id, name, cuisine, difficulty, cookTimeMinutes, tags, image",
      });
      const response = await fetch(
        `https://frontend-seminar-week5-server.vercel.app/recipes?${params}`,
      );
      if (!response.ok) throw new Error("Recipe loading has failed");
      else return response.json();
    },
  });
}

export function useRecipeById(id: number) {
  return useQuery({
    queryKey: ["recipe", { id: id }],
    queryFn: async () => {
      const response = await fetch(
        `https://frontend-seminar-week5-server.vercel.app/recipes/${id}`,
      );
      if (!response.ok) throw new Error("Recipe loading has failed");
      else return response.json();
    },
  });
}

export const getRelatedRecipes = (id: number): Promise<Recipe[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentRecipe = recipes.find((recipe) => recipe.id === id);

      if (!currentRecipe) {
        resolve([]);
        return;
      }

      const relatedRecipes = recipes.filter(
        (recipe) =>
          recipe.id !== currentRecipe.id &&
          recipe.tags.some((tag) => currentRecipe.tags.includes(tag)),
      );

      resolve(relatedRecipes);
    }, 2000);
  });
};
