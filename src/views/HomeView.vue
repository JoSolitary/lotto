<template>
  <div class="container">
    <div class="row"> 
      <div class="col">
        <router-link :to="'/lotto'" class="btn btn-primary"> + </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from '@/store'

export default{
  setup(){
    const store = useStore();
    console.log(store);
  },
}
</script>