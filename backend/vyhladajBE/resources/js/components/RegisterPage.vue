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
    name: 'RegisterPage',
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
    mounted() {
        document.title = 'Register';
    },
    methods: {
        register()
        {
            axios.post(`${this.baseUrl}/api/register`, this.form).then(
                ({ data }) => {
                    console.log(data);
                    try
                    {
                        alert("Registration successful! Please check your email for verification.");
                    }
                    catch (error)
                    {
                        console.error("Error during registration:", error);
                        this.errors.push("An error occurred during registration. Please try again.");
                    }
                }
            )
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
