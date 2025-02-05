<template>
    <div class="h-screen bg-[#121212]">
        <div v-if="movie">
            <h1>{{ movie.title }}</h1>
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Poster Image" />
            <p>{{ movie.overview }}</p>
            <p>Release Date: {{ movie.release_date }}</p>
            <p>Rating: {{ movie.vote_average }}</p>
            <p>Tagline: {{ movie.tagline }}</p>
            <p>Budget: ${{ movie.budget.toLocaleString() }}</p>
            <p>Revenue: ${{ movie.revenue.toLocaleString() }}</p>
            <p>Runtime: {{ movie.runtime }} minutes</p>
            <p>Genres: {{ movie.genres.map(genre => genre.name).join(', ') }}</p>
            <p>Production Companies: {{ movie.production_companies.map(company => company.name).join(', ') }}</p>
            <p>Production Countries: {{ movie.production_countries.map(country => country.name).join(', ') }}</p>
            <p>Spoken Languages: {{ movie.spoken_languages.map(language => language.english_name).join(', ') }}</p>
            <p>Homepage: <a :href="movie.homepage" target="_blank">{{ movie.homepage }}</a></p>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';

export default {
    name: 'DetailMovie',
    components: {
        NavBar
    },
    data() {
        return {
            movie: null
        };
    },
    mounted() {
        this.fetchMovieDetail();
    },
    methods: {
        async fetchMovieDetail() {
            const movieId = this.$route.params.id;
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                    params: {
                        api_key: '27669d5eff252733bade61094dcd4d38'
                    }
                });
                this.movie = response.data;
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        }
    }
};
</script>
