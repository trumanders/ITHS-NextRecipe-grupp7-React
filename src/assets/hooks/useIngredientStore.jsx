import { create } from "zustand";

export const useIngredientStore = create((set) => ({
  ingredients: [],
  updateIngredients: (newIngredientArray) =>
    set({ ingredients: newIngredientArray }),
}));
