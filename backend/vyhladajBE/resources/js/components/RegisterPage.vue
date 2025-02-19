<template>
    <div class="register-page">
        <h1>Register</h1>
        <form @submit.prevent="register">
            <div>
                <label for="name">Name:</label>
                <input type="text" v-model="form.name" id="name" required placeholder="Enter your name">
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" v-model="form.email" id="email" required placeholder="Enter your email">
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" v-model="form.password" id="password" required placeholder="Enter your password">
            </div>
            <div>
                <label for="password_confirmation">Confirm Password:</label>
                <input type="password" v-model="form.password_confirmation" id="password_confirmation" required placeholder="Confirm your password">
            </div>
            <button type="submit">Register</button>
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
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
            errors: []
        };
    },
    methods: {
        async register() {
            try {
                const response = await axios.post('/register', this.form);
                this.$router.push({
                    name: 'profile',
                    params: {
                        id: response.data.user.id,
                        email: response.data.user.email
                    }
                });
                alert('You have successfully registered!');
            } catch (error) {
                if (error.response && error.response.data.errors) {
                    this.errors = Object.values(error.response.data.errors).flat();
                } else {
                    console.error('An error occurred:', error);
                }
            }
        }
    }
};
</script>

<style scoped>
.register-page {
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    color: black;
}

.register-page h1 {
    margin-bottom: 1rem;
    color: black;
}

.register-page form div {
    margin-bottom: 1rem;
    color: black;
}

.register-page form label {
    display: block;
    margin-bottom: 0.5rem;
    color: black;
}

.register-page form input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: black;
}

.register-page form button {
    width: 100%;
    padding: 0.75rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.register-page form button:hover {
    background-color: #0056b3;
}

.register-page ul {
    margin-top: 1rem;
    color: red;
}
</style>
