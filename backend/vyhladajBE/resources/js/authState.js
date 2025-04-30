import { reactive } from 'vue';

export const authState = reactive({
    isAuthenticated: false,
    userId: null,
    setUser(user) {
        this.isAuthenticated = true;
        this.userId = user.id;
    },
    clear() {
        this.isAuthenticated = false;
        this.userId = null;
    },
    get user() {
        return this.isAuthenticated ? { id: this.userId } : null;
    }
});
