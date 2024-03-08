import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({ store : { lottos: [] }}),
  getters: {
    // doubleCount: (state) => state.count * 2,
  },
  actions: {
    reset() {
      this.store = {
        lottos: []
      }
    },
  },
  persist: true,
})