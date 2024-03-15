<template>
  <div class="container mt-1">
      <div class="row justify-content-between">
        <div class="col-auto">
          <h1 class="fw-light"> {{ player.name }} </h1>
        </div>
        <div class="col-auto">
          <button @click="addGrid(playerId)" class="btn btn-primary">
            Ajouter une grille
          </button>
        </div>
        <div class="col-auto">
          <button @click="deletePlayer(playerId)" class="btn btn-danger"> Supprimer </button>
        </div>
      </div>
    </div>
    
    <div class="album py-5">
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div class="col" v-for="(grid, gridId) in player.grids">
            <Grid
              :lottoId="lottoId"
              :playerId="playerId"
              :gridId="gridId"
            />
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { useStore } from "@/store"
import { v4 } from "uuid"

import Grid from "@/components/Grid.vue"

export default {
  components: { Grid },
  props: {
    lottoId: String,
    playerId: String,
  },
  data(){
    return {
      store: useStore(),
      lotto: {},
      player: {},
    }
  },
  mounted(){
    this.lotto = this.store.myStore.lottos[this.lottoId]
    this.player = this.lotto.players[this.playerId]
  },
  methods: {
    addGrid(id) {
      var numbers = []
      for (let i = 0; i < 3; i++) {
        numbers[i] = []
        for (let j = 0; j < 9; j++) {
          numbers[i][j] = null
        }
      }

      const grid = { numbers: numbers }
      this.lotto.players[id].grids[v4()] = grid
    },
    deletePlayer(playerId){
      delete this.lotto.players[playerId]
    },
  }
}

</script>

<style>
</style>