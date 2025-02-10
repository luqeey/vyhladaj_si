<template>
    <div class="h-screen bg-[#121212] text-white">
        <div v-if="results.length">
            <h1 class="text-4xl font-bold mb-4">Search Results</h1>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div v-for="result in filteredResults" :key="result.id" class="result-item">
                    <img v-if="result.poster_path" :src="`https://image.tmdb.org/t/p/w500${result.poster_path}`" alt="Poster Image" class="w-full h-auto rounded-sm object-cover cursor-pointer" @click="goToDetail(result)" @error="handleImageError"/>
                    <div v-if="result.known_for && result.known_for.length">
                        <ul>
                            <li v-for="known in result.known_for" :key="known.id" class="mt-2">
                                <img v-if="known.poster_path" :src="`https://image.tmdb.org/t/p/w500${known.poster_path}`" alt="Known For Image" class="w-full h-auto rounded-sm object-cover cursor-pointer" @click="goToDetail(known)" @error="handleImageError"/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="text-xl text-gray-300 animate-pulse">Loading search results...</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ResultPage',
    data() {
        return {
            results: []
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
/* Your styles for the result page */
</style>
