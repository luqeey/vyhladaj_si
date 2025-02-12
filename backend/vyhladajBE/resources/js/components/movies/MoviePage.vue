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
                        @error="handleImageError"
                    />
                </div>
            </div>
            <button
                @click="loadMore"
                v-if="store.currentPage < store.totalPages"
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
                const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
                    params: { api_key: '27669d5eff252733bade61094dcd4d38', page: store.currentPage }
                });
                store.addReleases(response.data.results);
                store.setTotalPages(response.data.total_pages);
            } catch (error) {
                console.error('Error fetching releases:', error);
            }
        }

        return { store, fetchReleases };
    },
    mounted() {
        if (this.store.releases.length === 0) {
            this.fetchReleases();
        } else {
            this.$nextTick(() => {
                window.scrollTo(0, this.store.scrollPosition);
            });
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
            const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
            return posterPath ? `${imageBaseUrl}${posterPath}` : 'fallback-image.jpg';
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

@media (min-width: 30rem) {
    .grid-wrapper {
        padding-left: 80px;
        padding-right: 80px;
    }
}
</style>
