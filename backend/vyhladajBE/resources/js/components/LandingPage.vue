<template>
  <div class="h-screen bg-[#121212]">
    <div>
      <div>
        <NavBar />
      </div>
      <div class="flex justify-center items-center h-full">
        <h1 class="text-white text-4xl">Welcome to NachoVerse</h1>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar.vue'

  export default {
  name: 'LandingPage',
  components: {
    NavBar
  }
}
</script>