import {create} from 'zustand'

export const useSearchResultStore = create((set) => ({
    searchResult: [],
    searchTitle: "Popular recipes",
    searchIngredients: [],
    setSearchResult: (newSearchResult) => set((state) => ({ searchResult: newSearchResult })),
    setSearchTitle: (newSearchTitle) => set((state) => ({ searchTitle: newSearchTitle })),
    setSearchIngredients: (newSearchIngredients) => set(({ searchIngredients: newSearchIngredients })),
}))