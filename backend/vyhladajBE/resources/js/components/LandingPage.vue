<template>
    <section>
      <div class="relative">
        <div class="flex items-center">
          <!-- Search Icon SVG -->
          <span class="absolute inset-y-0 left-4 flex items-center z-20">
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_28_113)">
                <path d="M18.5833 15.0833L22.3333 18.8333" stroke="white" stroke-width="1.38889" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20.6667 9.66666C20.6667 5.52452 17.3089 2.16666 13.1667 2.16666C9.02455 2.16666 5.66669 5.52452 5.66669 9.66666C5.66669 13.8088 9.02455 17.1667 13.1667 17.1667C17.3089 17.1667 20.6667 13.8088 20.6667 9.66666Z" stroke="white" stroke-width="1.38889" stroke-linejoin="round"/>
              </g>
              <defs>
                <filter id="filter0_d_28_113" x="0" y="0.5" width="28" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dy="4"/>
                  <feGaussianBlur stdDeviation="2"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_28_113"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_28_113" result="shape"/>
                </filter>
              </defs>
            </svg>
          </span>
  
          <!-- Search Input -->
          <input
            type="search"
            placeholder="Search for movie or series..."
            class="bg-[#1C1C1C] text-white placeholder-gray-400 rounded-full border border-gray-600 z-30 focus:outline-none pl-12 pr-4 py-3 w-[28rem]"
          />
        </div>
      </div>
  
      <!-- Dark Fade Effect -->
      <div class="fade-effect"></div>
  
      <div class="background">
        <div class="grid-wrapper">
          <!-- Each column of images (Max 8 columns) -->
          <div
            v-for="i in 8"
            :key="i"
            class="scroll-column"
            :style="{
              animationDuration: '100s',  /* Slow speed: 30 seconds per scroll cycle */
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse', /* One scrolls up, other down */
            }"
          >
            <img
              v-for="j in 20"
              :key="j"
              src="./image3.jpg"
              alt="Placeholder Image"
              class="w-full h-auto rounded-sm"
            />
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'LandingPage',
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
    animation: scroll 30s infinite linear;  /* Slow scroll speed */
    animation-timing-function: linear; /* Ensure a smooth continuous scroll */
    animation-iteration-count: infinite; /* Keep it looping */
  }
  
  img {
    object-fit: cover;
  }
  
  /* Keyframe Animation for Scrolling */
  @keyframes scroll {
    0% {
      transform: translateY(0%);
    }
    100% {
      transform: translateY(-100%);
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
  </style>
  