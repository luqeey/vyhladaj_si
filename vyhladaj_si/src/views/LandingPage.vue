<template>
  <div>
    <div class="h-screen bg-[#121212]">
      <div>
        <NavBar />
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