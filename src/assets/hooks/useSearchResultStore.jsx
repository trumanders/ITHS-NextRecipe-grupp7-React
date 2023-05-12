import {create} from 'zustand'

export const useSearchResultStore = create((set) => ({
    searchResult: [],
    searchTitle: "Popular recipes",
    setSearchResult: (newSearchResult) => set((state) => ({ searchResult: newSearchResult })),
    setSearchTitle: (newSearchTitle) => set((state) => ({ searchTitle: newSearchTitle })),
}))