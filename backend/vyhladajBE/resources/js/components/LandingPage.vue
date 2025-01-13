<template>
    <div class="h-full bg-[#121212]">
        <NavBar />
        <div class="relative mt-2">
            <div class="h-full absolute top-0 inset-x-0 flex justify-center items-center z-10">
                <div class="relative w-[28rem]">
              <span class="absolute inset-y-0 left-4 flex items-center">
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.5833 15.0833L18.3333 18.8333" stroke="white" stroke-width="1.38889" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16.6667 9.66666C16.6667 5.52452 13.3089 2.16666 9.16669 2.16666C5.02455 2.16666 1.66669 5.52452 1.66669 9.66666C1.66669 13.8088 5.02455 17.1667 9.16669 17.1667C13.3089 17.1667 16.6667 13.8088 16.6667 9.66666Z" stroke="white" stroke-width="1.38889" stroke-linejoin="round"/>
                </svg>
              </span>
                    <input
                        type="search" placeholder="Search for movie or series..." class="w-full bg-[#1C1C1C] text-white placeholder-gray-400 rounded-full border border-gray-600 focus:outline-none pl-12 pr-4 py-3"/>
                </div>
            </div>
            <div class="flex">
                <div class="ml-20">
                    <img class="w-[9.75rem]" src="@/components/image 3.jpg" alt="">
                    <img class="w-[9.75rem] mt-1" src="@/components/image 3.jpg" alt="">
                    <img class="w-[9.75rem] mt-1" src="@/components/image 3.jpg" alt="">
                </div>
                <div class="ml-1">
                    <img class="w-[9.75rem]" src="@/components/image 3.jpg" alt="">
                    <img class="w-[9.75rem] mt-1" src="@/components/image 3.jpg" alt="">
                    <img class="w-[9.75rem] mt-1" src="@/components/image 3.jpg" alt="">
                </div>
                <div class="ml-1">
                    <img class="w-[9.75rem]" src="@/components/image 3.jpg" alt="">
                    <img class="w-[9.75rem] mt-1" src="@/components/image 3.jpg" alt="">
                    <img class="w-[9.75rem] mt-1" src="@/components/image 3.jpg" alt="">
                </div>
                <div class="ml-1">
                    <img class="w-[9.75rem]" src="@/components/image 3.jpg" alt="">
                    <img class="w-[9.75rem] mt-1" src="@/components/image 3.jpg" alt="">
                    <img class="w-[9.75rem] mt-1" src="@/components/image 3.jpg" alt="">
                </div>
                <div class="ml-1">
                    <img class="w-[9.75rem]" src="@/components/image 3.jpg" alt="">
                    <img class="w-[9.75rem] mt-1" src="@/components/image 3.jpg" alt="">
                    <img class="w-[9.75rem] mt-1" src="@/components/image 3.jpg" alt="">
                </div>
                <div class="ml-1">
                    <img class="w-[9.75rem]" src="@/components/image 3.jpg" alt="">
                    <img class="w-[9.75rem] mt-1" src="@/components/image 3.jpg" alt="">
                    <img class="w-[9.75rem] mt-1" src="@/components/image 3.jpg" alt="">
                </div>
                <div class="ml-1">
                    <img class="w-[9.75rem]" src="@/components/image 3.jpg" alt="">
                    <img class="w-[9.75rem] mt-1" src="@/components/image 3.jpg" alt="">
                    <img class="w-[9.75rem] mt-1" src="@/components/image 3.jpg" alt="">
                </div>
                <div class="ml-1">
                    <img class="w-[9.75rem]" src="@/components/image 3.jpg" alt="">
                    <img class="w-[9.75rem] mt-1" src="@/components/image 3.jpg" alt="">
                    <img class="w-[9.75rem] mt-1" src="@/components/image 3.jpg" alt="">
                </div>
            </div>
            <div
                class="pointer-events-none absolute inset-x-0 top-0 h-full bg-gradient-to-b from-[#121212] via-[#12121288] to-transparent">
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
    name: 'LandingPage',
    components: {
        NavBar
    }
}
</script>
