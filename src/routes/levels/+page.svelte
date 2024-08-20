<script lang="ts">
    import { IconSolid } from "flowbite-svelte-icons";
    import LevelButton from "./LevelButton.svelte";
    import DownSwoopRight from "$lib/components/downSwoopRight.svelte";
    let levels = ["Beginner", "Intermediate", "Advanced"];
</script>

<div class="flex flex-col">
    {#each levels as level, i}
        <LevelButton name={level} isCompleted={true} />
        {#if i % 2 === 0}
            <DownSwoopRight orientation="right" />
        {:else}
            <DownSwoopRight orientation="left" />
        {/if}
    {/each}
</div>

<style>
</style>
