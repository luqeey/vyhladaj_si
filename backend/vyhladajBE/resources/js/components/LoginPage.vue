<template>
    <div class="login-page">
        <h1>Login</h1>
        <form @submit.prevent="login">
            <div>
                <label for="email">Email:</label>
                <input type="email" v-model="form.email" id="email" required placeholder="Enter your email">
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" v-model="form.password" id="password" required placeholder="Enter your password">
            </div>
            <button type="submit">Login</button>
        </form>
        <div v-if="errors.length">
            <ul>
                <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LoginPage',
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            errors: [],
            baseUrl: localStorage.getItem('api_base_url') || "http://127.0.0.1:8000",
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post(`${this.baseUrl}/api/login`, this.form); // Use dynamic base URL
                const { token, user } = response.data;

                localStorage.setItem('auth_token', token);

                this.$router.push({
                    name: 'ProfilePage',
                    params: { id: user.id }
                });
            } catch (error) {
                console.error(error);
                if (error.response && error.response.data && error.response.data.message) {
                    this.errors = [error.response.data.message];
                } else {
                    this.errors.push("An unexpected error occurred.");
                }
            }
        },
        setBaseUrl(url) {
            this.baseUrl = url;
            localStorage.setItem('api_base_url', url);
        }
    }
};
</script>

<style scoped>
.login-page {
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    color: black;
}

.login-page h1 {
    margin-bottom: 1rem;
    color: black;
}

.login-page form div {
    margin-bottom: 1rem;
    color: black;
}

.login-page form label {
    display: block;
    margin-bottom: 0.5rem;
    color: black;
}

.login-page form input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: black;
}

.login-page form button {
    width: 100%;
    padding: 0.75rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.login-page form button:hover {
    background-color: #0056b3;
}

.login-page ul {
    margin-top: 1rem;
    color: red;
}
</style>
