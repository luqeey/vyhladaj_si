<template>
    <div class="profile-page">
        <h1>Profile</h1>
        <div>
            <label>Name:</label>
            <p>{{ name }}</p>
        </div>
        <div>
            <label>Email:</label>
            <p>{{ email }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            name: '',
            email: ''
        };
    },
    async created() {
        try {
            const response = await axios.get(`/api/user/${this.$route.params.id}`);
            this.name = response.data.name;
            this.email = response.data.email;
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
};
</script>

<style scoped>
.profile-page {
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    color: black;
}

.profile-page h1 {
    margin-bottom: 1rem;
    color: black;
}

.profile-page div {
    margin-bottom: 1rem;
    color: black;
}

.profile-page label {
    display: block;
    margin-bottom: 0.5rem;
    color: black;
}

.profile-page p {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    color: black;
}
</style>
