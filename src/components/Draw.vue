<template>

</template>

<script>
import { useStore } from "@/store"

export default {
  props: {
  },
  data(){
    return {
      store: useStore(),
    }
  }
}

</script>