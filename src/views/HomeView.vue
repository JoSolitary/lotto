<template>
  <div class="container">
    <div class="row"> 
      <router-link :to="'/lotto'" class="col border rounded-3 m-3 p-3">
      +
      </router-link>
      <router-link v-for="(lotto, key) in store.lottos" :to="`lotto/${key}`" class="col border rounded-3 m-3 p-3">
        {{ lotto.date }}
        {{ lotto.place }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { useStore } from '@/store'

export default{
  data(){
    return {
      store: useStore()
    }
  },
}
</script>