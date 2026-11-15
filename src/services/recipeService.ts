import { recipes } from "../data/recipes.ts";
import type { Recipe } from "../types/recipe";

export const getAllRecipes = (): Promise<Recipe[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(recipes);
    }, 1000);
  });
};

export const getRecipeById = (id: number): Promise<Recipe | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(recipes.find((recipe) => recipe.id === id));
    }, 1000);
  });
};

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
