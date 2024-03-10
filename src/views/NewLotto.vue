<template>
  <div class="container">
    <div class="row ">
      <div class="col-auto">
        <form class="form">
          <div class="row g-3">
            <div class="col-sm">
              <input type="text" v-model="lotto.date" class="form-control" placeholder="Date" aria-label="Date">
            </div>
            <div class="col-sm">
              <input type="text" v-model="lotto.place" class="form-control" placeholder="Lieu" aria-label="Lieu">
            </div>
            <div class="col-sm">
              <button type="submit" @click.prevent="createLotto" class="btn btn-primary"> Valider </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from '@/store'
import { v4 as uuidv4 } from 'uuid';

export default {
  data(){
    return {
      store: useStore(),
      lotto: {
        date: new Date().toJSON().slice(0,10),
        place: "",
        players: {
          [uuidv4()]: {
            "name": "Josselin",
            grids: {}
          }
        }
      }
    }
  },
  methods: {
    createLotto(){
      this.store.lottos[uuidv4()] = this.lotto
    }
  }
}
</script>

<style scoped>
</style>
