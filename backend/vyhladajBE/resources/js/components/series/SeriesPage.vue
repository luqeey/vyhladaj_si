<template>
    <div class="background-color">
        <div class="background">
            <div class="grid-wrapper">
                <div v-for="release in releases" :key="release.id" @click="goToSeriesDetail(release.id)">
                    <img :src="`https://image.tmdb.org/t/p/w500${release.poster_path}`" alt="Poster Image" class="poster-image" @error="handleImageError"/>
                </div>
            </div>
            <button @click="loadMore" v-if="currentPage < totalPages" class="mt-4 mb-4 h-[45px] bg-gradient-to-r from-[#FACB3D] to-[#F1A601] text-white rounded-full px-4 py-2">Load More</button>
        </div>
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
            releases: [],
            currentPage: 1,
            totalPages: 1
        };
    },
    mounted() {
        this.fetchReleases();
    },
    methods: {
        async fetchReleases() {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/tv/popular', {
                    params: {
                        api_key: '27669d5eff252733bade61094dcd4d38',
                        page: this.currentPage
                    }
                });
                const newReleases = response.data.results;
                this.releases = [...this.releases, ...newReleases];
                this.totalPages = response.data.total_pages;
            } catch (error) {
                console.error('Error fetching releases:', error);
            }
        },
        async loadMore() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                await this.fetchReleases();
            }
        },
        handleImageError(event) {
            event.target.src = 'https://via.placeholder.com/200x300?text=No+Image';
        },
        goToSeriesDetail(seriesId) {
            this.$router.push({ name: 'detail series', params: { id: seriesId } });
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