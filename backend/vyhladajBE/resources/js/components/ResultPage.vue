<template>
    <div class="background-color">
        <div class="background">
            <div class="grid-wrapper">
                <div v-for="result in filteredResults" :key="result.id" @click="goToDetail(result)" class="poster-container transform transition-transform duration-300 hover:-translate-y-2 cursor-pointer">
                    <img v-if="result.poster_path" :src="getProxiedImageUrl(result.poster_path)" alt="Poster Image" class="poster-image" @error="handleImageError"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import avengersSound from '../../assets/Avengers_Sound_Effect.mp3';
import duneSound from '../../assets/Dune_Vocals.mp3';
import modernFamilySound from '../../assets/modern_family.mp3';

export default {
    name: 'ResultPage',
    data() {
        return {
            results: [],
            easterEggPlayed: false,
            audio: null,
        };
    },
    mounted() {
        this.fetchSearchResults();
    },
    computed: {
        filteredResults() {
            return this.results.filter(result => {
                if (result.media_type === 'person' && result.known_for) {
                    result.known_for = result.known_for.filter(known => known.poster_path);
                    return result.known_for.length > 0;
                }
                return result.poster_path;
            });
        }
    },
    methods: {
        async fetchSearchResults() {
            const query = this.$route.query.q;
            try {
                const response = await axios.get('https://api.themoviedb.org/3/search/multi', {
                    params: {
                        api_key: '27669d5eff252733bade61094dcd4d38',
                        query: query
                    }
                });
                this.results = response.data.results;

                if (query.toLowerCase() === 'avengers' && !this.easterEggPlayed) {
                    this.playEasterEggSound(avengersSound);
                    this.easterEggPlayed = true;
                }

                if (query.toLowerCase() === 'dune' && !this.easterEggPlayed) {
                    this.playEasterEggSound(duneSound);
                    this.easterEggPlayed = true;
                }

            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        },
        playEasterEggSound(sound) {
            if (this.easterEggPlayed) return;
            this.audio = new Audio(sound);
            this.audio.play().catch(error => console.error('Error playing sound:', error));
            this.easterEggPlayed = true;
        },
        handleImageError(event) {
            event.target.src = 'https://via.placeholder.com/200x300?text=No+Image';
        },
        async goToDetail(result) {
            if (result.media_type === 'movie') {
                this.$router.push({ name: 'detail movie', params: { id: result.id } }).then(() => {
                    this.setupEasterEggListener(result.title || result.name);
                });
            } else if (result.media_type === 'tv') {
                await this.fetchNetworkImages(result.id);
                this.$router.push({ name: 'detail series', params: { id: result.id } }).then(() => {
                    this.setupEasterEggListener(result.title || result.name);
                });
            }
        },
        async fetchNetworkImages(seriesId) {
            try {
                const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${seriesId}`, {
                    params: { api_key: '27669d5eff252733bade61094dcd4d38' }
                });
                const networkPromises = data.networks.map(async (network) => {
                    const { data } = await axios.get(`https://api.themoviedb.org/3/network/${network.id}/images`, {
                        params: { api_key: '27669d5eff252733bade61094dcd4d38' }
                    });
                    return {
                        id: network.id,
                        name: network.name,
                        logo: `https://image.tmdb.org/t/p/w500${data.logos[0].file_path}`
                    };
                });
                const networks = await Promise.all(networkPromises);
                this.$store.commit('setNetworks', networks);
            } catch (error) {
                console.error('Error fetching network images:', error);
            }
        },
        setupEasterEggListener(query) {
            const sound = this.getEasterEggSound(query);
            if (sound) {
                window.addEventListener('click', () => this.playEasterEggSound(sound), { once: true });
            }
        },
        getProxiedImageUrl(posterPath) {
            const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
            return posterPath ? `${imageBaseUrl}${posterPath}` : 'https://via.placeholder.com/200x300?text=No+Image';
        },
        getEasterEggSound(query) {
            query = query.toLowerCase();
            if (query.includes('avengers')) return avengersSound;
            if (query.includes('dune')) return duneSound;
            if (query.includes('modern family')) return modernFamilySound;
            return null;
        }
    },
    beforeRouteLeave(to, from, next) {
        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
        }
        next();
    }
};
</script>

<style scoped>
.background-color {
    background-color: rgba(28, 28, 28, 0.6);
    position: absolute;
    width: 100%;
    min-height: 100%;
}

.background {
    position: relative;
    z-index: 10;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
}

html, body {
    background: rgba(28, 28, 28, 0.6);
    min-height: 100vh;
}

.grid-wrapper {
    display: grid;
    gap: 1rem;
    height: 100%;
    width: 100%;
    overflow: hidden;
    grid-template-columns: repeat(8, 1fr);
    padding-left: 8px;
    padding-right: 8px;
}

.poster-image {
    width: 100%;
    height: auto;
    cursor: pointer;
}

@media (max-width: 1200px) {
    .grid-wrapper {
        grid-template-columns: repeat(6, 1fr);
    }
}

@media (max-width: 1024px) {
    .grid-wrapper {
        grid-template-columns: repeat(5, 1fr);
    }
}

@media (max-width: 860px) {
    .grid-wrapper {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (max-width: 680px) {
    .grid-wrapper {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 500px) {
    .grid-wrapper {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 320px) {
    .grid-wrapper {
        grid-template-columns: repeat(1, 1fr);
    }
}

@media (min-width: 30rem) {
    .grid-wrapper {
        padding-left: 80px;
        padding-right: 80px;
    }
}
</style>
