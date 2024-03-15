import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => {
    return {
      myStore: {
        lottos: {},
        game: null
      },
    }
  },
  persist: true,
})