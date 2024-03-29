<template>
  <div class="row align-items-center" v-if="selected">
    <div class="col">
      <div class="number-list">
        <ul class="list-inline">
          <li v-for="number in game.draw" class="list-inline-item">
            <div class="row">
              <div class="col-auto">
                <div class="row">
                  <div class="col text-center">
                      <span class="fs-1"> {{ number }} </span>
                    </div>
                  </div>
                  <div class="row">
                    <small> {{ DEPARTMENTS[number] }} </small>
                  </div>
              </div>
              <div class="col">
                <i class="bi bi-caret-right-fill bi-m"></i>
              </div>
            </div>
          </li>
          <li class="list-inline-item">
            <form @submit.prevent="saveDraw()">
              <input type="number" v-model="draw" id="draw" class="form-control draw-input"/>
            </form>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-auto me-2 text-center">
      <a @click="deleteDraw()"><i class="bi bi-backspace-fill bi-danger bi-m"></i></a>
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
      game: {
        draw: []
      },

      draw: {},
    }
  },
  computed: {
    selected() {
      return this.store.myStore.game === this.id
    }
  },
  mounted(){
    this.updateDraw()
  },
  updated(){
    this.updateDraw()
  },
  methods: {
    updateDraw(){
      if (this.store.myStore.game && this.lotto.games && this.store.myStore.game in this.lotto.games){
        this.lotto = this.store.myStore.lottos[this.lottoId]
        this.game = this.lotto.games[this.id]
      }
    },
    saveDraw(){
      this.lotto.games[this.id].draw.push(this.draw)
      this.draw = ""
    },
    deleteDraw(){
      if (this.lotto.games && this.id in this.lotto.games && this.lotto.games[this.id].draw && this.lotto.games[this.id].draw.length > 0)
      this.lotto.games[this.id].draw.pop()
    },
  }
}

</script>

<style scoped>

.number-list{
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
}

.draw-input{
  height: 4rem; 
  width: 50%;
  font-size: large;
}
</style>