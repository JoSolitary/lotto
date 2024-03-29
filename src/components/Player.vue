<template>
  <div class="container mt-1">
      <div class="row">
        <div class="col-auto">
          <h1 class="fw-light"> {{ player.name }} </h1>
        </div>
        <div class="col-auto">
          <a @click="deletePlayer()" class="mx-1">
            <i class="bi bi-trash-fill bi-danger bi-m"></i>
          </a>
        </div>
      </div>
    </div>
    
    <div class="album py-5">
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <div class="col" v-for="(grid, gridId) in player.grids">
            <Grid
              :lottoId="lottoId"
              :playerId="id"
              :id="gridId"
            />
          </div>
          <div class="col border rounded-3 border-secondary" role="button" @click="addGrid()">
            <div class="h-100 d-flex align-items-center justify-content-center">
              <i class="bi bi-plus-lg bi-success bi-l"></i>
            </div>
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
    id: String,
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
    this.player = this.lotto.players[this.id]
  },
  methods: {
    addGrid() {
      var numbers = []
      for (let i = 0; i < 3; i++) {
        numbers[i] = []
        for (let j = 0; j < 9; j++) {
          numbers[i][j] = null
        }
      }

      const grid = { numbers: numbers }
      this.lotto.players[this.id].grids[v4()] = grid
    },
    deletePlayer(){
      delete this.lotto.players[this.id]
    },
  }
}

</script>

<style>
</style>