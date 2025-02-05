<template>
    <div class="min-h-screen bg-[#121212] flex flex-col items-center">
        <div
            :class="{
        'mt-32': !results.length,
        'mt-4 transition-all duration-500 ease-in-out': results.length,
      }"
            class="flex w-full max-w-2xl justify-center"
        >
            <div class="flex w-full justify-between items-center">
                <input
                    type="text"
                    v-model="searchQuery"
                    placeholder="Search for cinemas..."
                    class="h-12 w-full mr-3 bg-[#1C1C1C] text-white placeholder-gray-400 rounded-full border border-gray-600 focus:outline-none pl-4"
                />
                <button
                    @click="searchCinemas"
                    class="h-12 bg-gradient-to-r from-[#FACB3D] to-[#F1A601] text-white rounded-full px-6 transition-transform hover:scale-105"
                >
                    Search
                </button>
            </div>
        </div>
        <div v-if="results && results.length" class="mt-6 w-full max-w-3xl mb-16"> ">
            <ul class="flex flex-col items-center space-y-6">
                <li
                    v-for="result in results"
                    :key="result.place_id"
                    class="flex flex-row w-full p-4 bg-[#1C1C1C] border border-gray-700 rounded-md"
                >
                    <img :src="result.thumbnail" alt="Thumbnail" class="h-40 w-40 rounded-md object-cover" />
                    <div class="ml-6 flex flex-col justify-center">
                        <p class="text-2xl text-white">{{ result.title }}</p>
                        <p><a :href="result.links.website" target="_blank" class="text-yellow-400">webstranka tu</a></p>
                        <p class="text-gray-300">{{ result.address }}</p>
                        <p class="text-gray-400">Rating: {{ result.rating }} ({{ result.reviews }} reviews)</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "CinemasPage",
    data() {
        return {
            searchQuery: "",
            results: []
        };
    },
    methods: {
        async searchCinemas() {
            if (this.searchQuery.length > 2) {
                try {
                    const response = await axios.get("/api/search-cinemas", {
                        params: {
                            location: this.searchQuery
                        }
                    });
                    this.results = response.data.local_results?.places || [];
                } catch (error) {
                    console.error(error);
                }
            }
        }
    }
};
</script>
