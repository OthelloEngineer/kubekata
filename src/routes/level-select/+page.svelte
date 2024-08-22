<script lang="ts">
    import { IconSolid } from "flowbite-svelte-icons";
    import LevelButton from "./LevelButton.svelte";
    import DownSwoopRight from "$lib/components/downSwoopRight.svelte";
    let levels = ["what-is-a-pod", "Intermediate", "Advanced"];
</script>

<div>
    <button> reset progress </button>
    |
    <button> delete all kata resources </button>
</div>
<div class="flex flex-col p-9">
    {#each levels as level, i}
        <LevelButton name={level} />
        {#if i % 2 === 0}
            <DownSwoopRight orientation="right" />
        {:else}
            <DownSwoopRight orientation="left" />
        {/if}
    {/each}
</div>

<style>
</style>
