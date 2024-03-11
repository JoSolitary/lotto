<template>
  <template v-for="(player, playerId) in lotto.players" class="container">
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
            <table class="table table-dark table-bordered border-white">
              <tbody>
                <tr v-for="(row, rowIndex) in grid.numbers">
                  <td v-for="(col, colIndex) in row" class="cell">
                    <span v-if="gridEdit.includes(gridId)">
                      <input type="number" v-model="grid.numbers[rowIndex][colIndex]" :id="`${gridId}:${rowIndex}:${colIndex}`" @input="handleInput" class="grid-input form-control" maxlength="2">
                    </span>
                    <span v-else>
                      {{ col ?? "" }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="row justify-content-between">
              <div class="col-auto">
                <a @click="editGrid(gridId)"><i class="bi-pencil-square bi-m" :class="gridEdit.includes(gridId) ? 'bi-warning' : 'bi-light'"></i></a>
              </div>
              <div class="col-auto">
                <button
                  @click="deleteGrid(playerId, gridId)"
                  class="btn btn-danger"
                >
                  Supprimer
                </button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </template>

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
      <div class="col-auto">
        {{ game.type }}
      </div>
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
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <form>
          <div class="row">
            <div class="col">
              <select class="form-control" v-model="game.type">
                <option value="line"> Ligne </option>
                <option value="grid"> Carton </option>
                <option value="reverse"> Inversée </option>
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
// Sélection de la partie en cours sélectionne les chiffres tirés pendant cette partie

import { useStore } from "@/store"
import { v4 } from "uuid"
export default {
  data() {
    return {
      id: this.$route.params.id,
      store: useStore(),
      lotto: {},

      player: {
        name: "",
      },

      game: {
        type: "line",
        keepDraw: false,
      },

      draw: "",

      gridEdit: [],
    }
  },
  created() {
    if (!this.store.lottos.hasOwnProperty(this.id)) this.$router.push("/404")

    this.lotto = this.store.lottos[this.id]
  },
  methods: {
    handleInput(event) {
      const value = event.target.value
      const split = event.target.id.split(':')
      const gridId = split[0]
      const rowId = split[1]
      const colId = split[2]

      let nextColId = colId
      let nextRowId = rowId
      
      let maxLenght = 2
      if (colId == 0) maxLenght = 1

      if (value.length >= maxLenght) {
        if (colId >=8) {
          nextColId = 0
          nextRowId++
        }
        else {
          nextColId++
        }
        const nextInput = document.getElementById(`${gridId}:${nextRowId}:${nextColId}`)
        if (nextInput) {
          nextInput.focus()
        }
      }      
    },

    addGame(){
      const game = {
        type: this.game.type,
        draw: []
      }
      
      this.lotto.games[v4()] = game
    },

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

    saveDraw(gameId){
      this.lotto.games[gameId].draw.push(this.draw)
      this.draw = ""
    },

    addPlayer() {
      this.lotto.players[v4()] = {
        name: this.player.name,
        grids: {},
      }
      this.player.name = ""
    },
    editGrid(gridId){
      const i = this.gridEdit.indexOf(gridId)
      if (i !== -1) this.gridEdit.splice(i,1)
      else this.gridEdit.push(gridId)
    },
    deleteGrid(playerId, gridId) {
      delete this.lotto.players[playerId].grids[gridId]
    },
    deletePlayer(playerId){
      delete this.lotto.players[playerId]
    }
  },
}
</script>

<style scoped>
.cell {
  width: 40px;
  height: 40px;
  padding: 0;
  text-align: center;
  vertical-align: middle;
}
</style>