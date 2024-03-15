<template>
  <table class="table table-bordered table-dark" :class="{'complete': computedGrid.complete}">
    <tbody>
      <tr v-for="(row, rowIndex) in computedGrid.row" :class="{'': row.complete}">
        <td v-for="(col, colIndex) in row.col" class="cell">
          <span v-if="edit">
            <input
              type="number"
              v-model="grid.numbers[rowIndex][colIndex]"
              :id="`${gridId}:${rowIndex}:${colIndex}`"
              @input="handleInput"
              class="grid-input form-control"
              maxlength="2"
            />
          </span>
          <span v-else :class="{'checked': col.checked}">
            {{ col.value }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="row justify-content-between">
    <div class="col-auto">
      <a @click="editGrid()"
        ><i
          class="bi-pencil-square bi-m"
          :class="edit ? 'bi-warning' : 'bi-light'"
        ></i
      ></a>
    </div>
    <div class="col-auto">
      <button @click="deleteGrid()" class="btn btn-danger">
        Supprimer
      </button>
    </div>
  </div>
</template>

<script>
import { useStore } from "@/store"

export default {
  props: {
    lottoId: String,
    playerId: String,
    gridId: String
  },
  data(){
    return {
      store: useStore(),

      lotto: {},
      player: {},
      grid: {},

      edit: false,
    }
  },
  mounted(){
    this.lotto = this.store.myStore.lottos[this.lottoId]
    this.player = this.lotto.players[this.playerId]
    this.grid = this.player.grids[this.gridId]
  },
  computed: {
    computedGrid(){
      let def = {value: null, checked: false}
      let result = {
        complete: false,
        row: [
          { complete: false, col: [{...def},{...def},{...def},{...def},{...def},{...def},{...def},{...def},{...def}]},
          { complete: false, col: [{...def},{...def},{...def},{...def},{...def},{...def},{...def},{...def},{...def}]},
          { complete: false, col: [{...def},{...def},{...def},{...def},{...def},{...def},{...def},{...def},{...def}]},
        ]
      }
      let game = {}
      let draw = []

      try{
        game = this.lotto.games[this.store.myStore.game]
        draw = game.draw
      }
      catch(err){
        //
      }

      if (!this.grid.numbers){
        return result
      }

      let gridComplete = 0
      for ( let i=0; i < this.grid.numbers.length; i++ ){
        let rowComplete = 0
        for ( let j=0; j < this.grid.numbers[i].length; j++ ){
          result.row[i].col[j].value = this.grid.numbers[i][j] // Copy number to new Object
          if (draw.includes(this.grid.numbers[i][j])){
            result.row[i].col[j].checked = true
            gridComplete++
            rowComplete++
          }
        }
        result.row[i].complete = (rowComplete === 5)
      }
      result.complete = (gridComplete === 15)

      return result
    }
  },
  methods: {
    editGrid(){
      this.edit = !this.edit
    },
    deleteGrid() {
      delete this.lotto.players[this.playerId].grids[this.gridId]
    },
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
  }
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
