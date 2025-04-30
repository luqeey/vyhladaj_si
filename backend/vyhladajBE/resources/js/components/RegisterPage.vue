<template>
    <div class="bg-[#121212] min-h-screen text-white relative overflow-hidden">
        <!-- Register Center Box -->
        <div class="absolute mt-[350px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-md px-4">
            <div class="bg-[#1C1C1C] border border-gray-700 rounded-xl p-8">
                <h1 class="text-3xl font-semibold text-white text-center mb-6">Register</h1>
                <form @submit.prevent="register" class="space-y-5">
                    <div>
                        <label for="name" class="block text-white mb-2">Name</label>
                        <input
                            type="text"
                            v-model="form.name"
                            id="name"
                            required
                            placeholder="Enter your name"
                            class="w-full h-12 px-4 bg-[#121212] text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label for="email" class="block text-white mb-2">Email</label>
                        <input
                            type="email"
                            v-model="form.email"
                            id="email"
                            required
                            placeholder="Enter your email"
                            class="w-full h-12 px-4 bg-[#121212] text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label for="password" class="block text-white mb-2">Password</label>
                        <input
                            type="password"
                            v-model="form.password"
                            id="password"
                            required
                            placeholder="Enter your password"
                            class="w-full h-12 px-4 bg-[#121212] text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label for="password_confirmation" class="block text-white mb-2">Confirm Password</label>
                        <input
                            type="password"
                            v-model="form.password_confirmation"
                            id="password_confirmation"
                            required
                            placeholder="Confirm your password"
                            class="w-full h-12 px-4 bg-[#121212] text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        class="w-full h-12 bg-gradient-to-r from-[#FACB3D] to-[#F1A601] text-white rounded-full px-6 transition-transform hover:scale-105"
                    >
                        Register
                    </button>
                </form>
                <div v-if="errors.length" class="mt-4">
                    <ul class="text-red-400 text-sm list-disc pl-5">
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </div>
            </div>
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
            errors: [],
            baseUrl: localStorage.getItem('api_base_url') || "http://127.0.0.1:8000",
        };
    },
    mounted() {
        document.title = 'Register';
    },
    methods: {
        register() {
            axios.post(`${this.baseUrl}/api/register`, this.form).then(
                ({ data }) => {
                    console.log(data);
                    try {
                        alert("Registration successful! Please check your email for verification.");
                    } catch (error) {
                        console.error("Error during registration:", error);
                        this.errors.push("An error occurred during registration. Please try again.");
                    }
                }
            );
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
