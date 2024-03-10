<template>
    <div class="container">
        <div calss="row">
            <div class="col">
                {{ `${lotto.place} - ${lotto.date}` }}
            </div>
        </div>
        <div v-for="(player, playerId) in lotto.players" class="row">
            <div class="col">
                <p> {{ player.name }} </p>
                <button @click="addGrid(playerId)" class="btn btn-primary"> Ajouter une grille </button>
                <div class="container m-3">
                    <div v-for="(grid, gridId) in player.grids" class="row">
                        <div class="col">
                            <table class="table table-bordered border-dark">
                                <tbody>
                                    <tr v-for="row in grid.numbers">
                                        <td v-for="col in row">
                                            {{ col ?? "0" }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-3">
                            <button class="btn btn-warning"> Modifier </button>
                            <button @click="deleteGrid(playerId, gridId)" class="btn btn-danger"> Supprimer </button>

                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from '@/store'
import { v4 } from 'uuid'
export default {
    data(){
        return {
            id: this.$route.params.id,
            store: useStore(),
            lotto: {}
        }
    },
    created(){
        if (! this.store.lottos.hasOwnProperty(this.id)) this.$router.push('/404')

        this.lotto = this.store.lottos[this.id]
    },
    methods: {
        addGrid(id){
            var numbers = []
            for(let i=0; i<3; i++){
                numbers[i] = []
                for(let j=0; j<9; j++){
                    numbers[i][j] = null
                }
            }

            const grid = { numbers: numbers }
            this.lotto.players[id].grids[v4()] = grid
        },
        deleteGrid(playerId, gridId){
            delete(this.lotto.players[playerId].grids[gridId])
        }
    }
}
</script>

<style scoped>
</style>