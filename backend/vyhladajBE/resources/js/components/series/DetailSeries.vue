<template>
    <div>
        <h1>Detail Series</h1>
        <div v-if="series">
            <img :src="series.poster" alt="Poster" />
            <div>
                <h2>{{ series.title }}</h2>
                <p>Original Title: {{ series.original_title }}</p>
                <p>Plot Overview: {{ series.plot_overview }}</p>
                <p>Type: {{ series.type }}</p>
                <p>Year: {{ series.year }} - {{ series.end_year }}</p>
                <p>Release Date: {{ series.release_date }}</p>
                <p>IMDB ID: {{ series.imdb_id }}</p>
                <p>TMDB ID: {{ series.tmdb_id }}</p>
                <p>Genres: {{ series.genre_names.join(', ') }}</p>
                <p>User Rating: {{ series.user_rating }}</p>
                <p>Critic Score: {{ series.critic_score }}</p>
                <p>US Rating: {{ series.us_rating }}</p>
                <p>Network: {{ series.network_names.join(', ') }}</p>
                <p>Trailer: <a :href="series.trailer" target="_blank">Watch Trailer</a></p>
                <div>
                    <p>Seasons:</p>
                    <ul>
                        <li v-for="source in paginatedSources" :key="source.source_id">
                            {{ source.name }} ({{ source.seasons }} seasons)
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <p v-else>No series found.</p>
    </div>
</template>

<script>
import axios from 'axios';
import NavBar from "@/components/NavBar.vue";

export default {
    name: 'DetailSeries',
    components: {
        NavBar
    },
    data() {
        return {
            series: null,
            currentPage: 1,
            itemsPerPage: 3
        };
    },
    computed: {
        paginatedSources() {
            if (!this.series || !this.series.sources) return [];
            const uniqueSources = [];
            const uniqueNames = new Set();
            for (const source of this.series.sources) {
                if (uniqueNames.size < 3 && !uniqueNames.has(source.name)) {
                    uniqueSources.push(source);
                    uniqueNames.add(source.name);
                }
            }
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return uniqueSources.slice(start, end);
        },
        totalPages() {
            if (!this.series || !this.series.sources) return 1;
            const uniqueNames = new Set(this.series.sources.map(source => source.name));
            return Math.ceil(uniqueNames.size / this.itemsPerPage);
        }
    },
    mounted() {
        this.fetchSeriesDetails();
    },
    methods: {
        async fetchSeriesDetails() {
            const titleId = '3108093'; // Replace with the actual title ID
            try {
                const response = await axios.get(`https://api.watchmode.com/v1/title/${titleId}/details/`, {
                    params: {
                        apiKey: 'ZL1gWp7kjjVLORk0vBMFak648LnwiTofK4LbN2Ue',
                        append_to_response: 'sources,seasons,episodes,cast-crew'
                    }
                });
                this.series = response.data;
            } catch (error) {
                console.error('Error fetching series details:', error);
                this.series = null;
            }
        },
    }
};
</script>

<style scoped>
ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}

img {
    width: 100px;
    height: auto;
    margin-right: 1rem;
}

div {
    display: flex;
    flex-direction: column;
}
</style>
