import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from "@/components/LandingPage.vue";
import MoviePage from "@/components/movies/MoviePage.vue";
import SeriesPage from "@/components/series/SeriesPage.vue";
import CinemasPage from "@/components/CinemasPage.vue";
import DetailSeries from "@/components/series/DetailSeries.vue";
import DetailMovie from "@/components/movies/DetailMovie.vue";
import ResultPage from "@/components/ResultPage.vue";
import ProfilePage from "@/components/ProfilePage.vue";

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
            path: '/detail-movie/:id',
            name: 'detail movie',
            component: DetailMovie,
        },{
            path: '/detail-tv-series/:id',
            name: 'detail series',
            component: DetailSeries,
        },
        {
            path: '/results',
            name: 'result',
            component: ResultPage,
        },
        {
          path: '/ProfilePage' ,
          name: 'user',
          component: ProfilePage ,
        },
    ],
})

export default router
