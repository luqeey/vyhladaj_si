import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from "@/views/LandingPage.vue";
import MoviePage from "@/views/movies/MoviePage.vue";
import SeriesPage from "@/views/series/SeriesPage.vue";
import CinemasPage from "@/views/CinemasPage.vue";
import DetailSeries from "@/views/series/DetailSeries.vue";
import DetailMovie from "@/views/movies/DetailMovie.vue";

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
    {
      path: '/detail-movie',
      name: 'detail movie',
      component: DetailMovie,
    },{
      path: '/detail-tv-series',
      name: 'detail series',
      component: DetailSeries,
    },
  ],
})

export default router
