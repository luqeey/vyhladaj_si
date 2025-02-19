<template>
    <div class="background-color">
        <div class="background">
            <div class="grid-wrapper">
                <div 
                    v-for="release in store.releases" 
                    :key="release.id" 
                    @click="goToMovieDetail(release.id)" 
                    class="transform transition-transform duration-300 hover:-translate-y-2 cursor-pointer">
                    <img 
                        :src="getProxiedImageUrl(release.poster_path)" 
                        alt="Poster Image" 
                        class="poster-image" 
                        @error="handleImageError" />
                </div>
            </div>
            <button 
                v-if="store.currentPage < store.totalPages" 
                @click="loadMore" 
                class="mt-4 mb-4 h-[45px] bg-gradient-to-r from-[#FACB3D] to-[#F1A601] text-white rounded-full px-4 py-2">
                Load More
            </button>
        </div>
    </div>
</template>

<script>
import { useMovieStore } from '@/store/store.js';
import axios from 'axios';

export default {
    setup() {
        const store = useMovieStore();

        async function fetchReleases() {
            try {
                const { data } = await axios.get('https://api.themoviedb.org/3/movie/popular', {
                    params: { api_key: '27669d5eff252733bade61094dcd4d38', page: store.currentPage }
                });
                store.addReleases(data.results);
                store.setTotalPages(data.total_pages);
            } catch (error) {
                console.error('Error fetching releases:', error);
            }
        }

        return { store, fetchReleases };
    },
    mounted() {
        if (!this.store.releases.length) {
            this.fetchReleases();
        } else {
            this.$nextTick(() => window.scrollTo(0, this.store.scrollPosition));
        }
    },
    methods: {
        async loadMore() {
            if (this.store.currentPage < this.store.totalPages) {
                this.store.setCurrentPage(this.store.currentPage + 1);
                await this.fetchReleases();
            }
        },
        goToMovieDetail(movieId) {
            this.store.setScrollPosition(window.scrollY);
            this.$router.push({ name: 'detail movie', params: { id: movieId } });
        },
        getProxiedImageUrl(posterPath) {
            return posterPath 
                ? `https://image.tmdb.org/t/p/w500${posterPath}` 
                : 'https://via.placeholder.com/200x300?text=No+Image';
        },
        handleImageError(event) {
            event.target.src = 'https://via.placeholder.com/200x300?text=No+Image';
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
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    width: 100%;
}

.grid-wrapper {
    display: grid;
    gap: 1rem;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    padding: 0 8px;
}

.poster-image {
    width: 100%;
    height: auto;
    cursor: pointer;
}

@media (min-width: 30rem) {
    .grid-wrapper {
        padding: 0 80px;
    }
}
</style>