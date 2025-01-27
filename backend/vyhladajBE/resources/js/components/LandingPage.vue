<template>
  <section>
    <div class="relative">
      <div class="flex items-center">
        <input
          type="search"
          placeholder="Search for movie or series..."
          class="bg-[#1C1C1C]/60 backdrop-blur-md text-white placeholder-gray-400 rounded-full border border-gray-600 z-30 focus:outline-none pl-12 pr-4 py-3 w-[28rem]"
        />
      </div>
    </div>

    <!-- Dark Fade Effect -->
    <div class="fade-effect"></div>
    <div class="background">
      <div class="grid-wrapper">
        <!-- Each column of images -->
        <div
  v-for="i in 8"
  :key="i"
  class="scroll-column"
  :style="{
    animationDuration: '90s', /* Slow speed: 90 seconds per scroll cycle */
    animationDirection: i % 2 === 0 ? 'normal' : 'reverse', /* One scrolls up, the other down */
  }"
>
  <div class="image-list">
    <!-- First Set of Images -->
    <img
      v-for="j in 20"
      :key="`first-${i}-${j}`"
      src="./image3.jpg"
      alt="Placeholder Image"
      class="w-full h-auto rounded-sm"
    />
    <!-- Duplicated Set of Images -->
    <img
      v-for="j in 20"
      :key="`second-${i}-${j}`"
      src="./image3.jpg"
      alt="Placeholder Image"
      class="w-full h-auto rounded-sm"
    />
  </div>
</div>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "LandingPage",
};
</script>

<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 70px);
  background: transparent;
  z-index: 50;
  position: relative;
}

.background {
  overflow: hidden;
  position: absolute;
  left: 80px;
  top: 0;
  height: calc(100vh - 70px);
  width: calc(100% - 160px);
  z-index: 10; /* Ensure the background is behind the input */
  display: flex;
  justify-content: center;
  align-items: center;
}

.grid-wrapper {
  display: grid;
  gap: 1rem;
  height: 100%;
  width: 100%;
  overflow: hidden;
  grid-template-columns: repeat(8, 1fr); /* Default 8 columns */
}

.scroll-column {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  animation: scroll 90s infinite linear; /* Ensure smooth infinite scroll */
}

.image-list {
  display: flex;
  flex-direction: column;
}

/* Keyframe Animation for Infinite Scrolling */
@keyframes scroll {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-50%); /* Scroll by half to show the duplicated set */
  }
}

/* Responsive Grid: Change the number of columns based on screen size */
@media (max-width: 1200px) {
  .grid-wrapper {
    grid-template-columns: repeat(6, 1fr); /* 6 columns for large screens */
  }
}

@media (max-width: 900px) {
  .grid-wrapper {
    grid-template-columns: repeat(4, 1fr); /* 4 columns for medium screens */
  }
}

@media (max-width: 600px) {
  .grid-wrapper {
    grid-template-columns: repeat(2, 1fr); /* 2 columns for small screens */
  }
}

@media (max-width: 400px) {
  .grid-wrapper {
    grid-template-columns: 1fr; /* 1 column for very small screens */
  }
}

/* Fade Effect Below Navbar */
.fade-effect {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  background: linear-gradient(to bottom, rgba(18, 18, 18, 1), transparent);
  pointer-events: none;
}

/* Ensure the SVG has proper visibility */
span {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 30; /* Above background images */
}

svg {
  fill: none;
  stroke: white; /* Ensure it's visible against dark background */
}

input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
  display: none;
}
</style>
