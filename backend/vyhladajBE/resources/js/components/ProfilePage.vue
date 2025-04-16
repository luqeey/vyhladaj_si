<template>
    <div class="profile-page min-h-screen bg-black text-white px-6 py-10">
        <!-- Profile Header -->
        <div class="flex items-center gap-6">
            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Profile Picture" class="w-24 h-24 rounded-full object-cover" />
            <div>
                <h1 class="text-3xl font-bold">{{ name }}</h1>
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

        <div class="mt-10">
            <h2 class="text-xl font-semibold mb-4">Favorite Movies</h2>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div v-for="movie in favoriteMovies" :key="movie.title">
                    <img :src="movie.image" :alt="movie.title" class="rounded-lg mb-1" />
                    <p class="text-center text-sm text-gray-300">{{ movie.title }}</p>
                </div>
            </div>
        </div>

        <div class="mt-8">
            <p><strong>Email:</strong> {{ email }}</p>
            <button @click="logout" class="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">
                Logout
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { authState } from '@/authState';

export default {
    name: 'ProfilePage',
    data() {
        return {
            name: '',
            email: '',
            favoriteShows: [
                { title: 'Peaky Blinders', image: 'https://picsum.photos/500/700' },
                { title: 'The Office', image: 'https://picsum.photos/500/700' },
                { title: 'Breaking Bad', image: 'https://picsum.photos/500/700' },
                { title: 'Fleabag', image: 'https://picsum.photos/500/700' }
            ],
            favoriteMovies: [
                { title: 'Inception', image: 'https://picsum.photos/500/700' },
                { title: 'Interstellar', image: 'https://picsum.photos/500/700' },
                { title: 'The Dark Knight', image: 'https://picsum.photos/500/700' },
                { title: 'The Matrix', image: 'https://picsum.photos/500/700' }
            ]
        };
    },
    async created() {
        try {
            const token = localStorage.getItem('auth_token');
            const response = await axios.get("http://127.0.0.1:8000/api/user", {
                headers: { Authorization: `Bearer ${token}` }
            });

            this.name = response.data.name;
            this.email = response.data.email;
        } catch (error) {
            console.error('An error occurred:', error);
        }
    },
    methods: {
        async logout() {
            try {
                const token = localStorage.getItem('auth_token');
                await axios.post("http://127.0.0.1:8000/api/logout", {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.warn('Logout failed:', error);
            }

            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            authState.clear();
            this.$router.push('/login');
        }
    }
};
</script>
