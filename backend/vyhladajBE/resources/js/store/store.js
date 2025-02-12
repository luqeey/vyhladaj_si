import { defineStore } from 'pinia';

export const useMovieStore = defineStore('store', {
    state: () => ({
        releases: [],
        currentPage: 1,
        totalPages: 1,
        scrollPosition: 0
    }),
    actions: {
        setReleases(movies) {
            this.releases = movies;
        },
        addReleases(movies) {
            this.releases = [...this.releases, ...movies];
        },
        setCurrentPage(page) {
            this.currentPage = page;
        },
        setTotalPages(pages) {
            this.totalPages = pages;
        },
        setScrollPosition(position) {
            this.scrollPosition = position;
        }
    }
});
