<template>
    <div class="h-screen bg-[#121212] text-white relative">
        <div v-if="series">
            <h1>{{ series.name }}</h1>
            <img :src="`https://image.tmdb.org/t/p/w500${series.poster_path}`" alt="Poster Image" />
            <p>{{ series.overview }}</p>
            <p>First Air Date: {{ series.first_air_date }}</p>
            <p>Last Air Date: {{ series.last_air_date }}</p>
            <p>Number of Seasons: {{ series.number_of_seasons }}</p>
            <p>Number of Episodes: {{ series.number_of_episodes }}</p>
            <p>Rating: {{ series.vote_average }}</p>
            <p>Genres: {{ series.genres.map(genre => genre.name).join(', ') }}</p>
            <p>Production Companies: {{ series.production_companies.map(company => company.name).join(', ') }}</p>
            <p>Production Countries: {{ series.production_countries.map(country => country.name).join(', ') }}</p>
            <p>Spoken Languages: {{ series.spoken_languages.map(language => language.english_name).join(', ') }}</p>
            <p>Homepage: <a :href="series.homepage" target="_blank">{{ series.homepage }}</a></p>
            <p>Status: {{ series.status }}</p>
            <p>Type: {{ series.type }}</p>
            <p>Created By: {{ series.created_by.map(creator => creator.name).join(', ') }}</p>
            <p>Networks: {{ series.networks.map(network => network.name).join(', ') }}</p>
            <p>Episode Run Time: {{ series.episode_run_time.join(', ') }} minutes</p>
            <p>In Production: {{ series.in_production ? 'Yes' : 'No' }}</p>
            <p>Tagline: {{ series.tagline }}</p>
            <p>Popularity: {{ series.popularity }}</p>
            <p>Last Episode to Air: {{ series.last_episode_to_air.name }} (Season {{ series.last_episode_to_air.season_number }}, Episode {{ series.last_episode_to_air.episode_number }})</p>
            <p>Next Episode to Air: {{ series.next_episode_to_air ? series.next_episode_to_air.name : 'N/A' }}</p>
            <p>Seasons:</p>
            <ul>
                <li v-for="season in series.seasons" :key="season.id">
                    {{ season.name }} - {{ season.episode_count }} episodes (Air Date: {{ season.air_date }})
                </li>
            </ul>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'DetailSeries',
    data() {
        return {
            series: null
        };
    },
    mounted() {
        this.fetchSeriesDetail();
    },
    methods: {
        async fetchSeriesDetail() {
            const seriesId = this.$route.params.id;
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${seriesId}`, {
                    params: {
                        api_key: '27669d5eff252733bade61094dcd4d38'
                    }
                });
                this.series = response.data;
            } catch (error) {
                console.error('Error fetching series details:', error);
            }
        }
    }
};
</script>
