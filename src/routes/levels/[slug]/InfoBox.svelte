<script>
    import { Card, Button } from "flowbite-svelte";
    import { ArrowRightOutline } from "flowbite-svelte-icons";
    export let levelTitle = "default level";
    export let levelDescription = "default description";
</script>

<div
    class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 bg-opacity-40"
>
    <h5
        class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
    >
        {levelTitle}
    </h5>
    <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
        {levelDescription}
    </p>
</div>

<style lang="postcss">
</style>
