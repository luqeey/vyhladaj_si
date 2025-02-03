<template>
    <div>
        <h1>Movie NachoVerse</h1>
        <ul>
            <li v-for="release in releases" :key="release.id">
                <img :src="`https://image.tmdb.org/t/p/w500${release.poster_path}`" alt="Poster" />
                <div>
                    <h2>{{ release.title }}</h2>
                    <p>Type: {{ release.media_type }}</p>
                    <p>Release Date: {{ release.release_date }}</p>
                    <p>Platform: {{ release.source_name }}</p>
                    <p v-if="release.is_original">Original Release</p>
                </div>
            </li>
        </ul>
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
                const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
                    params: {
                        api_key: '27669d5eff252733bade61094dcd4d38'
                    }
                });
                this.releases = response.data.results;
            } catch (error) {
                console.error('Error fetching releases:', error);
            }
        }
    }
};
</script>

<style scoped>
ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}

img {
    width: 100px;
    height: auto;
    margin-right: 1rem;
}

div {
    display: flex;
    flex-direction: column;
}
</style>
