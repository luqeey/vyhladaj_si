<template>
  <div>
    <div class="h-screen bg-[#121212]">
      <NavBar />
    </div>
    <h1>Movie NachoVerse</h1>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'MoviePage',
  components: {
    NavBar
  }
}
</script>