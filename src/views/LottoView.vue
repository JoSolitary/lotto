<template>
  <Player v-for="(player, playerId) in lotto.players"
    :id="playerId"
    :lottoId="id"
  />

  <div class="container mt-1">
    <div class="row justify-content-between">
      <div class="col-auto">
        <form class="row row-cols-lg-auto g-3 align-items-center">
          <div class="col-auto">
            <label class="visually-hidden" for="player-name"> Nouveau joueur </label>
            <input type="text" v-model="player.name" class="form-control" id="player-name" placeholder="Nouveau joueur"/>
          </div>
          <div class="col-auto">
            <a @click="addPlayer()" role="button"><i class="bi-plus-lg bi-success bi-m"></i></a>
          </div>
        </form>
      </div>
    </div>
  </div>

  <footer class="footer fixed-bottom bg-dark">
      <div class="row">
        <div class="col-auto">
          <div class="row align-items-center">
            <div class="col-auto">
              <select class="form-control" @change="selectGame()" v-model="current">
                <option v-for="(game, gameId) in lotto.games" :value="gameId">
                  {{ game.name }} - {{ GAMETYPES[game.type] }}
                </option>
              </select>
            </div>
            <div class="col">
              <a @click="deleteGame()" role="button"><i class="bi-trash-fill bi-danger bi-m"></i></a>
              <a @click="addGameForm = true" role="button"><i class="bi-plus-lg bi-success bi-m"></i></a>
            </div>
          </div>
        </div>
        <div v-if="addGameForm" class="col">
          <form>
          <div class="row align-items-center">
            <div class="col-2">
              <input v-model="game.name" class="form-control" type="text" id="game-name" placeholder="Nom">
            </div>
            <div class="col-2">
              <select class="form-control" v-model="game.type">
                <option v-for="(value, key) in GAMETYPES" :value="key"> {{ value }} </option>
              </select>
            </div>
            <div class="col-2">
              <input v-model="game.keepDraw" class="form-check-input" type="checkbox" id="keep-draw">
              <label class="form-check-label" for="keep-draw">
                Continuer le tirage
              </label>
            </div>
            <div class="col-2">
              <button class="btn btn-primary" @click.prevent="addGame()"> Valider </button>
              <button class="btn btn-danger" @click.prevent="addGameForm = false"> Annuler </button>
            </div>
          </div>
          </form>
        </div>
        <div class="col ms-5 ps-5" v-else>
          <Game
            :id="current"
            :lottoId="id"
          />
      </div>
    </div>
  </footer>
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

      current: null,
      addGameForm: false,
    }
  },
  created() {
    if (!this.store.myStore.lottos.hasOwnProperty(this.id)) this.$router.push("/404")

    this.lotto = this.store.myStore.lottos[this.id]

    this.current = this.store.myStore.game
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
      this.current = uuid

      this.addGameForm = false
    },
    addPlayer() {
      this.lotto.players[v4()] = {
        name: this.player.name,
        grids: {},
      }
      this.player.name = ""
    },
    selectGame(){
      this.store.myStore.game = this.current
    },
    deleteGame(){
      delete this.lotto.games[this.current]
    },
  },
}
</script>

<style scoped>
</style>