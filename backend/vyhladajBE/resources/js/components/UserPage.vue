<template>
    <div class="min-h-screen bg-black text-white px-6 py-10">
        <!-- Profile Header -->
        <div class="flex items-center gap-6">
            <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="Profile Picture"
                class="w-24 h-24 rounded-full object-cover"
            />
            <div>
                <h1 class="text-3xl font-bold">John Doe</h1>
                <p class="text-gray-400">
                    Member since: 2022<br />
                    Watchlist: 42 Items | Reviews: 17
                </p>
            </div>
        </div>

        <!-- Favorite Shows -->
        <div class="mt-10">
            <h2 class="text-xl font-semibold mb-4">Favorite Shows</h2>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div v-for="show in favoriteShows" :key="show.title">
                    <img :src="show.image" :alt="show.title" class="rounded-lg mb-1" />
                    <p class="text-center text-sm text-gray-300">{{ show.title }}</p>
                </div>
            </div>
        </div>

        <!-- Favorite Movies -->
        <div class="mt-10">
            <h2 class="text-xl font-semibold mb-4">Favorite Movies</h2>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div v-for="movie in favoriteMovies" :key="movie.title">
                    <img :src="movie.image" :alt="movie.title" class="rounded-lg mb-1" />
                    <p class="text-center text-sm text-gray-300">{{ movie.title }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const favoriteShows = [
    {
        title: 'Peaky Blinders',
        image: 'https://picsum.photos/500/700',
    },
    {
        title: 'The Office',
        image: 'https://picsum.photos/500/700',
    },
    {
        title: 'Breaking Bad',
        image: 'https://picsum.photos/500/700',
    },
    {
        title: 'Fleabag',
        image: 'https://picsum.photos/500/700',
    },
]

const favoriteMovies = [
    {
        title: 'Inception',
        image: 'https://picsum.photos/500/700',
    },
    {
        title: 'Interstellar',
        image: 'https://picsum.photos/500/700',
    },
    {
        title: 'The Dark Knight',
        image: 'https://picsum.photos/500/700',
    },
    {
        title: 'The Matrix',
        image: 'https://picsum.photos/500/700',
    },
]
</script>
