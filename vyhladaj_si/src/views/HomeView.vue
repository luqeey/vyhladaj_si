<script>
import TheWelcome from '../components/TheWelcome.vue'
import { csfd } from 'node-csfd-api'

export default {
  name: 'HomeView',
  components: {
    TheWelcome
  },
  data() {
    return {
      movies: []
    }
  },

  async mounted() {

    csfd.search('bart').then((search) => console.log(search));
  }
}

</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>