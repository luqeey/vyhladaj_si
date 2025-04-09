<template>
    <div class="min-h-screen bg-[#121212] text-white relative px-6 md:px-10 lg:px-20">
        <!-- Blurred Background -->
        <div
            v-if="series"
            class="absolute inset-0 z-0 bg-cover bg-center blur-xl opacity-25"
            :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/original${series.poster_path})` }"
        ></div>

        <!-- Main Content -->
        <div v-if="series" class="relative z-10 flex items-center justify-center min-h-screen pt-4">
            <div class="max-w-6xl mx-auto flex flex-col lg:flex-row items-center space-y-6 lg:space-x-10">
                <!-- Series Poster -->
                <img
                    :src="`https://image.tmdb.org/t/p/w500${series.poster_path}`"
                    alt="Poster Image"
                    class="w-56 lg:w-72 rounded-lg shadow-lg"
                />

                <!-- Series Details -->
                <div class="flex flex-col space-y-4 text-center lg:text-left">
                    <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold">{{ series.name }}</h1>
                    <div class="flex flex-wrap justify-center lg:justify-start space-x-4 text-xs md:text-sm text-gray-400">
                        <span>First Air: {{ series.first_air_date }}</span>
                        <span>Seasons: {{ series.number_of_seasons }}</span>
                        <span>{{ series.vote_average }}/10</span>
                    </div>
                    <p class="text-gray-300 leading-relaxed px-2 md:px-0">{{ series.overview }}</p>
                    <div class="text-xs md:text-sm text-gray-400 space-y-1 pb-8">
                        <p><strong>Genres:</strong> {{ series.genres.map(g => g.name).join(', ') }}</p>
                        <p><strong>Production:</strong> {{ series.production_companies.map(c => c.name).join(', ') }}</p>
                        <p><strong>Status:</strong> {{ series.status }}</p>
                        <p><strong>Type:</strong> {{ series.type }}</p>
                        <p><strong>Popularity:</strong> {{ series.popularity }}</p>
                        <p><strong>Tagline:</strong> {{ series.tagline || 'N/A' }}</p>
                        <p><strong>Where to watch:</strong></p>
                        <div v-if="filteredNetworks.length" class="rectangle">
                            <span v-for="network in filteredNetworks" :key="network.id" class="network-logo">
                                <img :src="network.logo" :alt="network.name" class="w-full h-full object-contain"/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Loading Spinner -->
        <div v-else class="flex items-center justify-center h-screen">
            <p class="text-xl text-gray-300 animate-pulse">Loading series details...</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'DetailSeries',
    data() {
        return {
            series: null,
            networks: []
        };
    },
    mounted() {
        this.fetchSeriesDetail();
    },
    computed: {
        filteredNetworks() {
            return this.networks.filter(network => network.logo);
        }
    },
    methods: {
        async fetchSeriesDetail() {
            try {
                const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${this.$route.params.id}`, {
                    params: { api_key: '27669d5eff252733bade61094dcd4d38' }
                });
                this.series = data;
                this.fetchNetworkImages();
            } catch (error) {
                console.error('Error fetching series details:', error);
            }
        },
        async fetchNetworkImages() {
            try {
                const networkPromises = this.series.networks.map(async (network) => {
                    const { data } = await axios.get(`https://api.themoviedb.org/3/network/${network.id}/images`, {
                        params: { api_key: '27669d5eff252733bade61094dcd4d38' }
                    });
                    return {
                        id: network.id,
                        name: network.name,
                        logo: data.logos.length ? `https://image.tmdb.org/t/p/w500${data.logos[0].file_path}` : null
                    };
                });
                this.networks = await Promise.all(networkPromises);
            } catch (error) {
                console.error('Error fetching network images:', error);
            }
        },
    }
};
</script>

<style scoped>
.hidden-network-logos-container {
    visibility: hidden; /* Hides the container while keeping its space */
    position: absolute; /* Keeps it out of the normal flow */
    left: -9999px; /* Moves it off-screen */
}

.network-logo {
    display: flex;
    align-items: center;
    height: clamp(30px, 5vw, 50px);
}

.network-logo img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    filter: brightness(0) invert(1); /* Makes logos white */
}
</style>







