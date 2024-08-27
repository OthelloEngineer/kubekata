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

<nav
    class="
        py-2 px-8 h-{height}
        flex flex-row justify-between items-center
        text-white
        bg-gradient-to-b
        from-navBar via-navBar via-90% to-opacity
    "
>
    <h1 class="text-4xl">Levels</h1>
    <div class="flex flex-row-reverse h-full">
        <img class="object-contain" src={kubecuddle} alt="KubeCuddleFish" />
    </div>
    <div class="flex flex-row space-x-8 items-center">
        <button> reset progress </button>
        <button> delete all kata resources </button>
    </div>
</nav>
<main class="flex flex-row p-9 space-x-5">
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
</main>
