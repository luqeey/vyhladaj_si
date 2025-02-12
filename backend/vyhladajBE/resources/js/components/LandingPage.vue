<template>
    <section>
        <div class="relative">
            <div class="flex items-center">
                <input
                    type="search"
                    placeholder="Search for movie or series..."
                    class="bg-[#1C1C1C]/60 backdrop-blur-md text-white placeholder-gray-400 rounded-full border border-gray-600 z-30 focus:outline-none px-4 py-3 sm:w-[400px] w-[300px]"
                    @keyup.enter="search"
                    v-model="searchQuery"
                />
            </div>
        </div>
        <div class="fade-effect"></div>
        <div class="background">
            <div class="grid-wrapper">
                <div
                    v-for="(column, i) in imageColumns"
                    :key="i"
                    class="scroll-column"
                    :style="{
                        animationDuration: '90s',
                        animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
                    }"
                >
                    <div class="image-list">
                        <img
                            v-for="(image, j) in column"
                            :key="`first-${i}-${j}`"
                            :src="image.poster_url"
                            alt="Poster Image"
                            class="w-full h-auto rounded-sm object-cover"
                            @error="handleImageError"
                        />
                        <img
                            v-for="(image, j) in column"
                            :key="`second-${i}-${j}`"
                            :src="image.poster_url"
                            alt="Poster Image"
                            class="w-full h-auto rounded-sm object-cover"
                            @error="handleImageError"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    name: "LandingPage",
    data() {
        return {
            imageColumns: Array.from({ length: 8 }, () => []),
            searchQuery: ''
        };
    },
    mounted() {
        this.fetchImages();
    },
    methods: {
        async fetchImages() {
            try {
                const response = await axios.get('https://api.watchmode.com/v1/releases/', {
                    params: {
                        apiKey: 'ZL1gWp7kjjVLORk0vBMFak648LnwiTofK4LbN2Ue'
                    }
                });

                const releases = response.data.releases;
                const columns = 8;
                const imagesPerColumn = Math.ceil(releases.length / columns);

                this.imageColumns = Array.from({ length: columns }, () => []);

                releases.forEach((release, index) => {
                    this.imageColumns[index % columns].push(release);
                });

            } catch (error) {
                console.error('Error fetching images:', error);
            }
        },
        handleImageError(event) {
            event.target.style.display = 'none';
        },
        search() {
            if (this.searchQuery.trim()) {
                this.$router.push({ name: 'result', query: { q: this.searchQuery } });
            }
        }
    }
};
</script>

<style scoped>
section {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 70px);
    background: transparent;
    z-index: 50;
    position: relative;
}

.background {
    overflow: hidden;
    position: absolute;
    top: 0;
    height: calc(100vh - 70px);
    width: 100%;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
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

.scroll-column {
    display: flex;
    flex-direction: column;
    gap: 0px;
    animation: scroll 90s infinite linear;
}

.image-list img {
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
}

.image-list {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
}

@keyframes scroll {
    0% {
        transform: translateY(0%);
    }
    100% {
        transform: translateY(-50%);
    }
}

@media (max-width: 1200px) {
    .grid-wrapper {
        grid-template-columns: repeat(6, 1fr);
    }
}

@media (max-width: 900px) {
    .grid-wrapper {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (max-width: 600px) {
    .grid-wrapper {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 400px) {
    .grid-wrapper {
        grid-template-columns: 1fr;
    }
}

@media (min-width: 30rem) {
    .grid-wrapper {
        padding-left: 80px;
        padding-right: 80px;
    }
}

.fade-effect {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 20;
    background: linear-gradient(to bottom, rgba(18, 18, 18, 1), transparent);
    pointer-events: none;
}

input[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none;
    appearance: none;
    display: none;
}
</style>
