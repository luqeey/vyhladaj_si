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
        },
        resetStore() {
            this.releases = [];
            this.currentPage = 1;
            this.totalPages = 1;
            this.scrollPosition = 0;
        }
    }
});


export const useSeriesStore = defineStore('seriesStore', {
    state: () => ({
        releases: [],
        currentPage: 1,
        totalPages: 1,
        scrollPosition: 0
    }),
    actions: {
        setReleases(series) {
            this.releases = series;
        },
        addReleases(series) {
            this.releases = [...this.releases, ...series];
        },
        setCurrentPage(page) {
            this.currentPage = page;
        },
        setTotalPages(pages) {
            this.totalPages = pages;
        },
        setScrollPosition(position) {
            this.scrollPosition = position;
        },
        resetStore() {
            this.releases = [];
            this.currentPage = 1;
            this.totalPages = 1;
            this.scrollPosition = 0;
        }
    }
});
