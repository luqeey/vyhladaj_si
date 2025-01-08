import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from "@/views/LandingPage.vue";
import MoviePage from "@/views/MoviePage.vue";
import SeriesPage from "@/views/SeriesPage.vue";
import CinemasPage from "@/views/CinemasPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage,
    },
    {
      path: '/movies',
      name: 'movies',
      component: MoviePage,
    },
    {
      path: '/tv-series',
      name: 'series',
      component: SeriesPage,
    },
    {
      path: '/cinemas',
      name: 'cinemas',
      component: CinemasPage,
    },
  ],
})

export default router
