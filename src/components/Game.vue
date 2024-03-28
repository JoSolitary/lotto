<template>
  <div class="container">
    <div class="row" v-if="selected">
      <div class="col">
        <div class="number-list">
          <ul class="list-inline">
            <li v-for="number in game.draw" class="list-inline-item">
              <span class="fs-1"> {{ number }} </span>
              <small> {{ DEPARTMENTS[number] }} </small>
              <i class="bi bi-caret-right-fill bi-m"></i>
            </li>
            <li>
              <input type="number" v-model="draw" class="form-control" id="draw"/>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-auto">
        <form class="row">
          <div class="col-auto">
            <input type="number" v-model="draw" class="form-control" id="draw"/>
          </div>
          <div class="col-auto">
            <button @click.prevent="saveDraw()" class="btn btn-primary">
              Ajouter
            </button>
          </div>
          <div class="col-auto">
            <button @click.prevent="deleteGame()" class="btn btn-danger">
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
import DEPARTMENTS from "@/objects/departments.js";

export default {
  props: {
    id: String,
    lottoId: String,
  },
  data(){
    return {
      store: useStore(),
      GAMETYPES: GAMETYPES,
      DEPARTMENTS: DEPARTMENTS,

      lotto: {},
      game: {},

      draw: {},
    }
  },
  computed: {
    selected() {
      return this.store.myStore.game === this.id
    }
  },
  mounted(){
    this.lotto = this.store.myStore.lottos[this.lottoId]
    this.game = this.lotto.games[this.id]
  },
  updated(){
    this.lotto = this.store.myStore.lottos[this.lottoId]
    this.game = this.lotto.games[this.id]
  },
  methods: {
    saveDraw(){
      this.lotto.games[this.id].draw.push(this.draw)
      this.draw = ""
    },
    deleteGame(){
      delete this.lotto.games[this.id]
    },
  }
}

</script>

<style scoped>

.number-list{
  width: 100%;
  overflow-x: auto;
}
</style>