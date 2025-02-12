<template>
    <div class="background-color">
        <div class="background">
            <div class="grid-wrapper">
                <div v-for="result in filteredResults" :key="result.id" @click="goToDetail(result)" class="transform transition-transform duration-300 hover:-translate-y-2 cursor-pointer">
                    <img v-if="result.poster_path" :src="`https://image.tmdb.org/t/p/w500${result.poster_path}`" alt="Poster Image" class="poster-image" @error="handleImageError"/>
                    <div v-if="result.known_for && result.known_for.length">
                        <ul>
                            <li v-for="known in result.known_for" :key="known.id" class="mt-2">
                                <img v-if="known.poster_path" :src="`https://image.tmdb.org/t/p/w500${known.poster_path}`" alt="Known For Image" class="poster-image" @click="goToDetail(known)" @error="handleImageError"/>
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
import avengersSound from '../../assets/Avengers_Sound_Effect.mp3'; // Correct import from the `src/assets/` folder
import duneSound from '../../assets/Dune_Vocals.mp3'; // New sound for Dune Easter egg

export default {
    name: 'ResultPage',
    data() {
        return {
            results: [],
            easterEggPlayed: false
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

                // Easter Egg 1: Play sound if the query is "Avengers"
                if (query.toLowerCase() === 'avengers' && !this.easterEggPlayed) {
                    this.playEasterEggSound(avengersSound);
                    this.easterEggPlayed = true;
                }

                // Easter Egg 2: Play sound if the query is "Dune"
                if (query.toLowerCase() === 'dune' && !this.easterEggPlayed) {
                    this.playEasterEggSound(duneSound);
                    this.easterEggPlayed = true;
                }

            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        },
        playEasterEggSound(sound) {
            const audio = new Audio(sound); // Pass the correct sound
            audio.play().catch(error => {
                console.error('Error playing sound:', error);
            });
        },
        handleImageError(event) {
            event.target.style.display = 'none';
        },
        goToDetail(result) {
            if (result.media_type === 'movie') {
                this.$router.push({ name: 'detail movie', params: { id: result.id } });
            } else if (result.media_type === 'tv') {
                this.$router.push({ name: 'detail series', params: { id: result.id } });
            }
        }
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

.load-more-button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #1C1C1C;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.load-more-button:hover {
    background-color: #333;
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
</style>
