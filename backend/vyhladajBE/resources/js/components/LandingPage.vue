<template>
  <section>
    <div class="relative">
      <div class="flex items-center">
        <input
          type="search"
          placeholder="Search for movie or series..."
          class="bg-[#1C1C1C]/60 backdrop-blur-md text-white placeholder-gray-400 rounded-full border border-gray-600 z-30 focus:outline-none pl-4 pr-4 py-3 w-full sm:w-[24rem] md:w-[28rem] lg:w-[32rem]"
        />
      </div>
    </div>

    <!-- Dark Fade Effect -->
    <div class="fade-effect"></div>
    <div class="background">
      <div class="grid-wrapper">
        <!-- Each column of images -->
        <div
  v-for="(column, i) in imageColumns"
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
          v-for="(image, j) in column"
          :key="`first-${i}-${j}`"
          :src="image.poster_url"
          alt="Poster Image"
          class="w-full h-auto rounded-sm object-cover"
          @error="handleImageError"
      />

      <img
          v-for="(image, j) in column"
          :key="`second-${i}-${j}`"
          :src="image.poster_url"
          alt="Poster Image"
          class="w-full h-auto rounded-sm object-cover"
          @error="handleImageError"
      />
  </div>
</div>

      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
    name: "LandingPage",
    data() {
        return {
            imageColumns: Array.from({ length: 8 }, () => []) // Ensure 8 columns
        };
    },
    mounted() {
        this.fetchImages();
    },
    methods: {
        async fetchImages() {
            try {
                const response = await axios.get('https://api.watchmode.com/v1/releases/', {
                    params: {
                        apiKey: 'ZL1gWp7kjjVLORk0vBMFak648LnwiTofK4LbN2Ue'
                    }
                });

                const releases = response.data.releases;
                const columns = 8;
                const imagesPerColumn = Math.ceil(releases.length / columns);

                // Make sure all columns exist
                this.imageColumns = Array.from({ length: columns }, () => []);

                // Distribute images evenly across 8 columns
                releases.forEach((release, index) => {
                    this.imageColumns[index % columns].push(release);
                });

            } catch (error) {
                console.error('Error fetching images:', error);
            }
        },
        handleImageError(event) {
            event.target.src = 'https://via.placeholder.com/200x300?text=No+Image';
        }
    }
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
    gap: 0px; /* Remove spacing between images */
    animation: scroll 90s infinite linear;
}

.image-list img {
    width: 100%; /* Ensures images take full width */
    height: auto; /* Maintain original aspect ratio */
    object-fit: cover;
    display: block;
}

.image-list {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
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
