<script>
    import { Card, Button } from "flowbite-svelte";
    import { ArrowRightOutline } from "flowbite-svelte-icons";
    export let levelTitle = "default level";
    export let levelDescription = "default description";
</script>

<div
    class="max-w-sm p-6 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 bg-opacity-20"
>
    <h5
        class="mb-2 text-2xl font-semibold tracking-tight text-black dark:text-white"
    >
        {levelTitle}
    </h5>
    <p class="mb-3 font-normal text-white dark:text-gray-400">
        {levelDescription}
    </p>
</div>

<style lang="postcss">
</style>
