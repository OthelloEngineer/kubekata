<script lang="ts">
    import { IconSolid } from "flowbite-svelte-icons";
    import LevelButton from "./LevelButton.svelte";
    import DownSwoopRight from "$lib/components/downSwoopRight.svelte";
    import kubecuddle from "$lib/icons/kubecuddle.png";
    import levelExample from "./levels-example.json";
    import Levels from "../../levels.svelte";
    let levels = ["what-is-a-pod", "Intermediate", "Advanced"];
    console.log(levelExample);
    let height = 20;
</script>

<div
    class="flex flex-row h-{height} bg-gradient-to-b from-navBar via-90% via-navBar to-opacity"
>
    <div
        class=" flex flex-row w-1/6 h-{height} space-x-8 justify-center items-center"
    >
        <button class="h-max text-white outline-1"> reset progress </button>

        <button class="text-white"> delete all kata resources </button>
    </div>
    <div class="w-2/3 flex flex-row justify-center items-center">
        <h1 class="text-4xl text-white">Levels</h1>
    </div>
    <div class="w-1/6 flex flex-row-reverse">
        <img src={kubecuddle} alt="KubeCuddleFish" />
    </div>
</div>
<div class="flex flex-row p-9 space-x-5">
    {#each levelExample as superLevel}
        <div
            class="bg-green-200 bg-opacity-30 outline-3 outline-dashed outline-offset-2 outline-white w-fit rounded-md"
        >
            <div class="flex flex-col place-items-center">
                <h1 class="text-2xl">{superLevel.superLevel}</h1>
                {#each superLevel.levels as level, i}
                    <LevelButton name={level.title} isCompleted={true} />
                    {#if i % 2 === 0}
                        <DownSwoopRight orientation="right" />
                    {:else}
                        <DownSwoopRight orientation="left" />
                    {/if}
                {/each}
            </div>
        </div>
    {/each}
</div>

<style>
</style>
