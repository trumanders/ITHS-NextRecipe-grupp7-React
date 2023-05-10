import { create } from 'zustand'

export const useClickStore = create((set) => ({
    isClicked: 0,
    setIsClicked: () => set((state) => ({isClicked: state.isClicked +1}))
}))