<template>
    <div class="loader" v-if="visible">
        <span></span>
    </div>
</template>

<script>
export default {
    name: "Loader",
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
    },
};
</script>

<style scoped>
.loader {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    overflow: hidden;
    border-radius: 50%;
}

.loader:before {
    content: "";
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    z-index: 10;
    background: #121212;
    border-radius: 50%;
}

.loader span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: conic-gradient(#ff7402, #ffe700, #fff55e, #ff7402);
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>