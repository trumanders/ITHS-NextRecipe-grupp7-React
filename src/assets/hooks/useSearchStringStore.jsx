import {create} from 'zustand'

export const useSearchStringStore = create((set) => ({
    searchString: {ingredients: "", type: "", intolerances: "", diet: "", call: ""},
    setSearchString: (newSearchString) => set(() => ({searchString: {
        ingredients: newSearchString.ingredients,
        type: newSearchString.type,
        intolerances: newSearchString.intolerances,
        diet: newSearchString.diet,
        call: newSearchString.call
    }})),
}))