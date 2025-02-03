<template>
    <div>
        <h1>Series NachoVerse</h1>
        <ul v-if="seriesList.length">
            <li v-for="series in seriesList" :key="series.id">
                <h2>{{ series.title }}</h2>
                <p>Year: {{ series.year }}</p>
                <p>Type: {{ series.type }}</p>
                <p>IMDB ID: {{ series.imdb_id }}</p>
                <p>TMDB ID: {{ series.tmdb_id }}</p>
            </li>
        </ul>
        <p v-else>No series found.</p>
    </div>
</template>

<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';

export default {
    name: 'SeriesPage',
    components: {
        NavBar
    },
    data() {
        return {
            seriesList: []
        };
    },
    mounted() {
        this.fetchSeries();
    },
    methods: {
        async fetchSeries() {
            try {
                const response = await axios.get('https://api.watchmode.com/v1/list-titles/', {
                    params: {
                        apiKey: 'ZL1gWp7kjjVLORk0vBMFak648LnwiTofK4LbN2Ue'
                    }
                });
                this.seriesList = response.data.titles;
            } catch (error) {
                console.error('Error fetching series:', error);
                this.seriesList = [];
            }
        }
    }
};
</script>

<style scoped>
ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 1rem;
}

h2 {
    margin: 0;
}

p {
    margin: 0.5rem 0;
}
</style>
