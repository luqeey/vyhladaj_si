<template>
    <div class="bg-[#121212] min-h-screen text-white relative overflow-hidden">
      <!-- Login Center Box -->
      <div class="absolute mt-[300px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-md px-4">
        <div class="bg-[#1C1C1C] border border-gray-700 rounded-xl p-8">
          <h1 class="text-3xl font-semibold text-white text-center mb-6">Login</h1>
          <form @submit.prevent="login" class="space-y-5">
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
            <button
              type="submit"
              class="w-full h-12 bg-gradient-to-r from-[#FACB3D] to-[#F1A601] text-white rounded-full px-6 transition-transform hover:scale-105"
            >
              Login
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
          const response = await axios.post(`${this.baseUrl}/api/login`, this.form);
          const { token, user } = response.data;
  
          localStorage.setItem('auth_token', token);
          this.$router.push({ name: 'ProfilePage', params: { id: user.id } });
        } catch (error) {
          console.error(error);
          if (error.response?.data?.message) {
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