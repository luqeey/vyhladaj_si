<!-- Navbar.vue -->
<template>
  <div class="bg-[#121212] relative navbar">
    <!-- Navbar -->
    <div class="flex items-center h-[70px] justify-between w-full  mx-auto px-[80px]">
      <router-link to="/" class="text-[#F8E7F8]">
        <img class="w-52" src="@/components/nachoverse-logo.png" alt="Logo">
      </router-link>
      <!-- Desktop Links -->
      <div class="hidden md:flex space-x-8">
        <router-link to="/movies" class="text-[#F8E7F8]">Movies</router-link>
        <router-link to="/tv-series" class="text-[#F8E7F8]">Series</router-link>
        <router-link to="/cinemas" class="text-[#F8E7F8]">Cinemas</router-link>
      </div>
      <!-- Hamburger Icon for Mobile -->
      <button 
        class="block md:hidden text-[#F8E7F8] relative z-50" 
        @click="toggleMenu"
      >
        <!-- Hamburger Icon -->
        <svg 
          v-if="!menuOpen" 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-6 w-6 transition-transform transform duration-300 ease-in-out"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
        
        <!-- Close "X" Icon -->
        <svg 
          v-if="menuOpen" 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-6 w-6 transition-transform transform duration-300 ease-in-out"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div 
      class="md:hidden flex flex-col items-center bg-[#121212] text-[#F8E7F8] space-y-4 py-4 fixed inset-x-0 top-[70px] z-[999] shadow-lg"
      v-show="menuOpen"
    >
      <router-link to="/movies" @click="closeMenu">Movies</router-link>
      <router-link to="/tv-series" @click="closeMenu">Series</router-link>
      <router-link to="/cinemas" @click="closeMenu">Cinemas</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

// State for controlling menu visibility
const menuOpen = ref(false);
const windowWidth = ref(window.innerWidth);

// Function to toggle the hamburger menu
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// Function to close the menu when clicking a link or resizing the window
const closeMenu = () => {
  menuOpen.value = false;
};

// Update windowWidth on resize
const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value > 900) closeMenu(); // Close the menu on larger screens
};

// Add event listener for window resize
onMounted(() => {
  window.addEventListener("resize", updateWindowWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateWindowWidth);
});
</script>

<style scoped>
/* Ensure navbar has no extra space below */
.navbar {
  height: 70px; /* Fixed height */
  margin-bottom: 0;
  padding-bottom: 0;
}

/* Transition animations */
button, .mobile-menu {
  transition: all 0.3s ease-in-out;
}

.mobile-menu {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Additional styling for navbar */
.navbar {
  width: 100%;
}

.navbar > .flex {
  padding-left: 80px; /* Padding from left */
  padding-right: 80px; /* Padding from right */
}

@media (width: 100%) {
  .navbar > .flex {
    padding-left: 80px; /* Ensure 80px padding on smaller screens */
    padding-right: 80px; /* Ensure 80px padding on smaller screens */
  }
}
</style>
