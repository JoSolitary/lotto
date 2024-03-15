<template>
  <Player v-for="(player, playerId) in lotto.players"
    :lottoId="id"
    :playerId="playerId"
  />

  <div class="container mt-1">
    <div class="row justify-content-between">
      <div class="col-auto">
        <h1 class="fw-light"> Ajouter un joueur </h1>
      </div>
      <div class="col-auto">
        <form class="row row-cols-lg-auto g-3 align-items-center">
          <div class="col-auto">
            <label class="visually-hidden" for="player-name"> Nom </label>
            <input type="text" v-model="player.name" class="form-control" id="player-name" placeholder="Nom"/>
          </div>
          <div class="col-auto">
            <button @click.prevent="addPlayer()" class="btn btn-primary">
              Valider
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="container mt-1">
    <div class="row">
      <div class="col">
        <h1 class="fw-light"> Tirages </h1>
      </div>
    </div>
    <div class="row" v-for="(game, gameId) in lotto.games">
      <div class="col">
        <Game
          :lottoId="id"
          :gameId="gameId"
        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <form>
          <div class="row">
            <div class="col">
              <div class="form-control">
                <input v-model="game.name" class="form-control" type="text" id="game-name" placeholder="Nom">
              </div>
            </div>
            <div class="col">
              <select class="form-control" v-model="game.type">
                <option v-for="(value, key) in GAMETYPES" :value="key"> {{ value }} </option>
              </select>
            </div>
            <div class="col">
              <div class="form-check">
                <input v-model="game.keepDraw" class="form-check-input" type="checkbox" id="keep-draw">
                <label class="form-check-label" for="keep-draw">
                  Continuer le tirage
                </label>
              </div>
            </div>
            <div class="col">
              <button class="btn btn-primary" @click.prevent="addGame()"> Valider </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "@/store"
import { v4 } from "uuid"

import GAMETYPES from "@/objects/gameTypes.js";
import Player from '@/components/Player.vue'
import Game from '@/components/Game.vue'

export default {
  components: { Player, Game },
  data() {
    return {
      id: this.$route.params.id,
      store: useStore(),
      GAMETYPES: GAMETYPES,
      
      lotto: {},

      player: {
        name: "",
      },

      game: {
        name: "",
        type: "line",
        keepDraw: false,
      },

    }
  },
  created() {
    if (!this.store.myStore.lottos.hasOwnProperty(this.id)) this.$router.push("/404")

    this.lotto = this.store.myStore.lottos[this.id]
  },
  methods: {
    addGame(){
      var draw = []
      if (this.game.keepDraw && this.store.myStore.game && this.lotto.games[this.store.myStore.game]){
        try{
          draw = this.lotto.games[this.store.myStore.game].draw
        }
        catch(err){
          console.log(err)
        }
      }
      const game = {
        draw: draw,
        name: this.game.name,
        type: this.game.type,
      }
      const uuid = v4()
      this.lotto.games[uuid] = game
      this.store.myStore.game = uuid
    },
    addPlayer() {
      this.lotto.players[v4()] = {
        name: this.player.name,
        grids: {},
      }
      this.player.name = ""
    },
  },
}
</script>

<style scoped>

</style>