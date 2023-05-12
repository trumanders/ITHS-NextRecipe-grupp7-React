import { create } from 'zustand'

export const useClickStore = create((set) => ({
    isClicked: 0,
    prevClick: 0,
    setIsClicked: () => set((state) => ({isClicked: state.isClicked +1})),
    setPrevClick: () => set((state) => ({prevClick: state.prevClick +1}))
}))