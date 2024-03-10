import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => {
    return {
      lottos: {},
    }
  },
  getters: {
    // doubleCount: (state) => state.count * 2,
  },
  actions: {
  },
  persist: true,
})