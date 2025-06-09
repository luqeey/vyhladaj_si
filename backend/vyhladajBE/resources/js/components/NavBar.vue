<template>
    <div class="bg-[#121212] relative navbar">
        <div class="flex items-center h-[70px] justify-between w-full mx-auto">
            <router-link to="/" class="text-[#F8E7F8]">
                <img
                    class="w-52"
                    src="../../assets/nachoverse-logo.png"
                    alt="Logo"
                />
            </router-link>
            <div class="hidden md:flex space-x-8">
                <router-link
                    to="/movies"
                    class="nav-link"
                    :class="{ 'active': $route.path === '/movies' }"
                >
                    Movies
                </router-link>
                <router-link
                    to="/tv-series"
                    class="nav-link"
                    :class="{ 'active': $route.path === '/tv-series' }"
                >
                    Series
                </router-link>
                <router-link
                    to="/cinemas"
                    class="nav-link"
                    :class="{ 'active': $route.path === '/cinemas' }"
                >
                    Cinemas
                </router-link>
            </div>
            <button
                class="block md:hidden text-[#F8E7F8] relative z-50"
                @click="toggleMenu"
            >
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
        <div
            class="md:hidden flex flex-col items-center bg-[#121212] text-[#F8E7F8] space-y-4 py-4 fixed inset-x-0 top-[70px] z-[999] shadow-lg"
            v-show="menuOpen"
        >
            <router-link
                to="/movies"
                class="nav-link"
                :class="{ 'active': $route.path === '/movies' }"
                @click="closeMenu"
            >
                Movies
            </router-link>
            <router-link
                to="/tv-series"
                class="nav-link"
                :class="{ 'active': $route.path === '/tv-series' }"
                @click="closeMenu"
            >
                Series
            </router-link>
            <router-link
                to="/cinemas"
                class="nav-link"
                :class="{ 'active': $route.path === '/cinemas' }"
                @click="closeMenu"
            >
                Cinemas
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const menuOpen = ref(false);
const windowWidth = ref(window.innerWidth);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
  menuOpen.value = false;
};

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value > 900) closeMenu();
};

onMounted(() => {
  window.addEventListener("resize", updateWindowWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateWindowWidth);
});
</script>

<style scoped>
.navbar {
  height: 70px;
  margin-bottom: 0;
  padding-bottom: 0;
}

button, .mobile-menu {
  transition: all 0.3s ease-in-out;
}

.mobile-menu {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  0% {
      opacity: 0;
      transform: translateY(-10px);
  }
  100% {
      opacity: 1;
      transform: translateY(0);
  }
}

.navbar {
  width: 100%;
  padding-left: 8px;
  padding-right: 8px;
}

@media (width >= 30rem) {
  .navbar > .flex {
      padding-left: 80px;
      padding-right: 80px;
  }
}

.nav-link {
  position: relative;
  color: #F8E7F8;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -3px;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, #FACB3D, #F1A601);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease-in-out;
}

.nav-link:hover, .nav-link.active {
  color: transparent;
  background-image: linear-gradient(to right, #FACB3D, #F1A601);
  -webkit-background-clip: text;
  background-clip: text;
}

.nav-link:hover::after, .nav-link.active::after {
  transform: scaleX(1);
}
</style>
