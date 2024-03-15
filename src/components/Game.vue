<template>
  <div class="container">
    <div class="row" @click="selectGame()">
      <div class="col-auto">
        {{ game.name }}
      </div>
      <div class="col-auto">
        {{ GAMETYPES[game.type] }}
      </div>
    </div>
    <div class="row" v-if="selected">
      <div class="col">
        <span v-for="number in game.draw"> {{ ` ${number} ` }} </span>
      </div>
      <div class="col">
        <form class="row row-cols-lg-auto g-3 align-items-center">
          <div class="col-auto">
            <input type="number" v-model="draw" class="form-control" id="draw"/>
          </div>
          <div class="col-auto">
            <button @click.prevent="saveDraw(gameId)" class="btn btn-primary">
              Ajouter
            </button>
          </div>
          <div class="col-auto">
            <button @click.prevent="deleteGame(gameId)" class="btn btn-danger">
              Supprimer
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "@/store"
import GAMETYPES from "@/objects/gameTypes.js";

export default {
  props: {
    lottoId: String,
    gameId: String,
  },
  data(){
    return {
      store: useStore(),
      GAMETYPES: GAMETYPES,

      lotto: {},
      game: {},

      draw: {},
    }
  },
  computed: {
    selected() {
      return this.store.myStore.game === this.gameId
    }
  },
  mounted(){
    this.lotto = this.store.myStore.lottos[this.lottoId]
    this.game = this.lotto.games[this.gameId]
  },
  methods: {
    saveDraw(gameId){
      this.lotto.games[gameId].draw.push(this.draw)
      this.draw = ""
    },
    deleteGame(gameId){
      delete this.lotto.games[gameId]
    },
    selectGame(){
      if (this.selected) delete this.store.myStore.game
      else this.store.myStore.game = this.gameId
    }
  }
}

</script>