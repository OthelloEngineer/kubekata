<script>
    import "../../app.css";
</script>

    <slot></slot>

<style lang="postcss">
    :root {
        --edge-stroke-default: #ff6347; /* Changing edge stroke color to tomato red */
    }
    .animated-background {
        @apply bg-gradient-to-b from-blue-800 via-blue-500 to-blue-800;
        background-size: 120% 120%;
        height: 100%;
        width: 100%;
        animation: animation 3s ease-in-out infinite;
    }

    @keyframes animation {
        0%,
        100% {
            background-position: 50% 0%;
        }

        50% {
            background-position: 50% 100%;
        }
    }
</style>
