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
    border: 4px solid #282828;
    overflow: hidden;
    border-radius: 50%;
    box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.1),
    10px 10px 10px rgba(0, 0, 0, 0.4),
    inset -5px -5px 5px rgba(255, 255, 255, 0.2),
    inset 10px 10px 10px rgba(0, 0, 0, 0.4);
}

.loader:before {
    content: "";
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    z-index: 10;
    background: #212121;
    border-radius: 50%;
    border: 2px solid #292929;
    box-shadow: inset -2px -2px 5px rgba(255, 255, 255, 0.2),
    inset 3px 3px 5px rgba(0, 0, 0, 0.5);
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
