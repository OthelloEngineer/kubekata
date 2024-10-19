<script lang="ts">
    import LevelButton from "./LevelButton.svelte";
    import DownSwoop from "$lib/components/downSwoop.svelte";
    import kubecuddle from "$lib/icons/kubecuddle.png";
    import levelExample from "./levels-example.json";
    import {MasonryGrid} from "@egjs/svelte-grid";

    let height = 20;
    let files: FileList;
    let hasSuccessfullyUploaded = false;
    $: currentMode = "Service Account";

    const gap = 10;
    const defaultDirection = "end";
    const align = "center";
    const column = 0;
    const columnSize = 0;
    const columnSizeRatio = 0;
    levelExample.forEach((superLevel) => {
        superLevel.levels.forEach((level) => {
            console.log("level: ", level);
        });
    });
    function print_file(): void {
        let config = files[0].text().then((text) => {
            let url = "/api"
            console.log("text: ", text.toString())
            fetch(url, {
                method: 'POST',
                body: text.toString(),
                headers: {
                }
            }).then((res) => {
                console.log("res: ", res)
                if (res.status !== 200) {
                    console.log("error: ", res)
                    return
                }
                hasSuccessfullyUploaded = true
            })
            currentMode = "Config"
        })
    }
</script>
<div class="h-screen">
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
    <div class="flex flex-row space-x-4 items-center justify-center bg-gray-200 p-2 rounded-md bg-opacity-50">
        <span> Current Mode: {currentMode} </span>
    </div>
    <div class="flex flex-row-reverse h-full">
        <img class="object-contain" src={kubecuddle} alt="KubeCuddleFish" />
    </div>
    <div> 
    <span> Switch to "config" Mode </span>


    {#if hasSuccessfullyUploaded}
        <span class="text-green-500, font-bold, bg-green-300, p-2, rounded-md, text-center, w-48, h-12, flex, items-center, justify-center"
        > successfully uploaded </span>
    {:else}
        {#if files !== undefined}
            <button on:click={print_file}> confirm upload </button>
        {:else }
            <input bind:files type="file"  />
        {/if}  
    {/if}
    </div>
    <div class="flex flex-row space-x-8 items-center">
        <button> reset progress </button>
        <button> delete all kata resources </button>
    </div>
</nav>
<div class="flex flex-row space-x-4 mx-4 justify-between">
    {#each levelExample as superLevel}
    <div class="bg-green-200 bg-opacity-30 outline-3 outline-dashed outline-offset-2 w-fit outline-white rounded-md p-4 my-4">
            <div class="flex flex-col place-items-center">
                <h1 class="text-xl mb-5">{superLevel.name}</h1>
                {#each superLevel.levels as level, i}
                    <LevelButton name={level.title} isCompleted={level.isCompleted} />
                    {#if i % 2 === 0 && i != superLevel.levels.length - 1}
                        <DownSwoop orientation="right" />
                    {:else if i % 2 === 1 && i != superLevel.levels.length - 1}
                        <DownSwoop orientation="left" />
                    {/if}
                {/each}
            </div>
        </div>
    {/each}
</div>
</div>
