<template>
    <div>
        <div style="height: 10rem" class="h-screen  bg-[#121212] flex justify-center">
            <div class=" mt-12 flex  w-[516px] h-[5rem] justify-between ">
                <input
                    type="text"
                    v-model="searchQuery"
                    placeholder="Search for cinemas..."
                    class=" h-[45px] w-[20rem] mr-3 bg-[#1C1C1C] text-white placeholder-gray-400 rounded-full border border-gray-600 focus:outline-none pl-4 pr-4 py-3"
                />
                <button
                    @click="searchCinemas"
                    class="  h-[45px] bg-gradient-to-r from-[#FACB3D] to-[#F1A601] text-white rounded-full px-4 py-2"

                >
                    Search
                </button>
            </div>
        </div>
        <div v-if="results && results.length" class="bg-[#121212]  " >
            <ul class="flex flex-col" style="align-items: center">
                <li v-for="result in results" :key="result.place_id" class="flex flex-row mb-6 border border-[#A9A9A9] p-3 rounded-md " >
                    <img :src="result.thumbnail" alt="Thumbnail" class="h-[15rem] rounded-md " />
                    <div class=" flex flex-col justify-center ml-10 mr-6 ">
                        <p class="text-2xl text-slate-100	break-words w-[200px]  " >{{ result.title }}</p>
                        <p><a :href="result.links.website" target="_blank">webstranka tu</a></p>
                        <p class="break-words w-[200px]" >{{ result.address }}</p>
                        <p>Rating: {{ result.rating }} ({{ result.reviews }} reviews)</p>
                    </div>

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
