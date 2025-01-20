<template>
    <div>
        <div class="h-screen bg-[#121212]">
            <NavBar />
            <div class="p-4">
                <input
                    type="text"
                    v-model="searchQuery"
                    placeholder="Search for cinemas..."
                    class="w-full bg-[#1C1C1C] text-white placeholder-gray-400 rounded-full border border-gray-600 focus:outline-none pl-4 pr-4 py-3"
                />
                <button
                    @click="searchCinemas"
                    class="mt-2 bg-blue-500 text-white rounded-full px-4 py-2"
                >
                    Search
                </button>
            </div>
        </div>
        <h1>Cinemas</h1>
        <div v-if="results && results.length">
            <ul>
                <li v-for="result in results" :key="result.place_id">
                    <p>{{ result.title }}</p>
                    <p><a :href="result.links.website" target="_blank">{{ result.links.website }}</a></p>
                    <p>{{ result.address }}</p>
                    <p>Rating: {{ result.rating }} ({{ result.reviews }} reviews)</p>
                    <img :src="result.thumbnail" alt="Thumbnail"/>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import axios from "axios";

export default {
    name: 'CinemasPage',
    components: {
        NavBar
    },
    data() {
        return {
            searchQuery: '',
            results: []
        };
    },
    methods: {
        async searchCinemas() {
            if (this.searchQuery.length > 2) {
                try {
                    const response = await axios.get('/api/search-cinemas', {
                        params: {
                            location: this.searchQuery // Use the searchQuery value as the location
                        }
                    });
                    this.results = response.data.local_results?.places || [];
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }
}
</script>
