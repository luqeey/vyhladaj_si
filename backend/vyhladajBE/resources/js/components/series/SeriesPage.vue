<template>
    <div class="background-color">
        <div class="background">
            <div class="grid-wrapper">
                <div v-for="release in releases" :key="release.id" class="image-list">
                    <img
                        :src="release.poster_url"
                        alt="Poster Image"
                        class="poster-image"
                        @error="handleImageError"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';

export default {
    name: 'MoviePage',
    components: {
        NavBar
    },
    data() {
        return {
            releases: []
        };
    },
    mounted() {
        this.fetchReleases();
    },
    methods: {
        async fetchReleases() {
            try {
                const response = await axios.get('https://api.watchmode.com/v1/releases/', {
                    params: {
                        apiKey: 'ZL1gWp7kjjVLORk0vBMFak648LnwiTofK4LbN2Ue'
                    }
                });
                this.releases = response.data.releases;
            } catch (error) {
                console.error('Error fetching releases:', error);
            }
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
    min-height: 100vh;
    width: 100%;
}

.background {
    overflow: hidden;
    position: absolute;
    left: 80px;
    width: calc(100% - 160px);
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
}

.grid-wrapper {
    display: grid;
    gap: 1rem;
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}

.image-list {
    display: flex;
    justify-content: center;
    align-items: center;
}

.poster-image {
    width: 100%;
    height: auto;
}

@media (max-width: 900px) {
    .grid-wrapper {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }
}
</style>
