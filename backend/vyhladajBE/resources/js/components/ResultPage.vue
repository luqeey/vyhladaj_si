<template>
    <div class="background-color">
        <div class="background">
            <div class="grid-wrapper">
                <div v-for="result in filteredResults" :key="result.id" @click="goToDetail(result)" class="transform transition-transform duration-300 hover:-translate-y-2 cursor-pointer">
                    <img v-if="result.poster_path" :src="`https://image.tmdb.org/t/p/w500${result.poster_path}`" alt="Poster Image" class="poster-image" @error="handleImageError" />
                    <div v-if="result.known_for && result.known_for.length">
                        <ul>
                            <li v-for="known in result.known_for" :key="known.id" class="mt-2">
                                <img v-if="known.poster_path" :src="`https://image.tmdb.org/t/p/w500${known.poster_path}`" alt="Known For Image" class="poster-image" @click="goToDetail(known)" @error="handleImageError" />
                            </li>
                        </ul>
                    </div>
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
            event.target.style.display = 'none';
        },
        goToDetail(result) {
            if (result.media_type === 'movie') {
                this.$router.push({ name: 'detail movie', params: { id: result.id } }).then(() => {
                    this.setupEasterEggListener(result.title || result.name);
                });
            } else if (result.media_type === 'tv') {
                this.$router.push({ name: 'detail series', params: { id: result.id } }).then(() => {
                    this.setupEasterEggListener(result.title || result.name);
                });
            }
        },
        setupEasterEggListener(query) {
            const sound = this.getEasterEggSound(query);
            if (sound) {
                window.addEventListener('click', () => this.playEasterEggSound(sound), { once: true });
            }
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
        // Pause the audio if the route changes
        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0; // Reset to the start
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
    width: 100%;
    max-width: calc(100% - 160px);
    grid-template-columns: repeat(7, 1fr);
    justify-content: center;
}

.poster-image {
    width: 100%;
    height: auto;
    cursor: pointer;
}
</style>
