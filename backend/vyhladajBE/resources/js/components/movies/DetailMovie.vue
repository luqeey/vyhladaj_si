<template>
    <div class="min-h-screen bg-[#121212] text-white relative px-6 md:px-10 lg:px-20">
        <!-- Blurred Background -->
        <div
            v-if="movie"
            class="absolute inset-0 z-0 bg-cover bg-center blur-xl opacity-25"
            :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})` }"
        ></div>

        <!-- Main Content -->
        <div v-if="movie" class="relative z-10 flex items-center justify-center min-h-screen pt-4">
            <div class="max-w-6xl mx-auto flex flex-col lg:flex-row items-center space-y-6 lg:space-x-10">
                <!-- Movie Poster -->
                <img
                    :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
                    alt="Poster Image"
                    class="w-56 lg:w-72 rounded-lg shadow-lg"
                />

                <!-- Movie Details -->
                <div class="flex flex-col space-y-4 text-center lg:text-left">
                    <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold">{{ movie.title }}</h1>
                    <div class="flex flex-wrap justify-center lg:justify-start space-x-4 text-xs md:text-sm text-gray-400">
                        <span>Release Date: {{ movie.release_date }}</span>
                        <span>Runtime: {{ movie.runtime }} min</span>
                        <span>{{ movie.vote_average }}/10</span>
                    </div>
                    <p class="text-gray-300 leading-relaxed px-2 md:px-0">{{ movie.overview }}</p>
                    <div class="text-xs md:text-sm text-gray-400 space-y-1 pb-8">
                        <p><strong>Genres:</strong> {{ movie.genres.map(g => g.name).join(', ') }}</p>
                        <p><strong>Production:</strong> {{ movie.production_companies.map(c => c.name).join(', ') }}</p>
                        <p><strong>Budget:</strong> ${{ movie.budget.toLocaleString() }}</p>
                        <p><strong>Revenue:</strong> ${{ movie.revenue.toLocaleString() }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Loading Spinner -->
        <div v-else class="flex items-center justify-center h-screen">
            <p class="text-xl text-gray-300 animate-pulse">Loading movie details...</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'DetailMovie',
    data() {
        return { movie: null };
    },
    mounted() {
        this.fetchMovieDetail();
    },
    methods: {
        async fetchMovieDetail() {
            try {
                const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}`, {
                    params: { api_key: '27669d5eff252733bade61094dcd4d38' }
                });
                this.movie = data;
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        }
    }
};
</script>
