<script lang="ts">
    import LevelButton from "./LevelButton.svelte";
    import DownSwoop from "$lib/components/downSwoop.svelte";
    import kubecuddle from "$lib/icons/kubecuddle.png";
    import levelExample from "./levels-example.json";
    let height = 20;
    let files: FileList;
    

    function print_file() {
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
            })
        })
    }
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
    <div> 
    <span> upload your kube "config" file </span>


    {#if files !== undefined}
        <button on:click={print_file}> confirm upload </button>
    {:else }
        <input bind:files type="file"  />
    {/if}
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
                <h1 class="text-2xl">{superLevel.name}</h1>
                {#each superLevel.levels as level, i}
                    <LevelButton name={level.title} isCompleted={false} />
                    {#if i % 2 === 0}
                        <DownSwoop orientation="right" />
                    {:else}
                        <DownSwoop orientation="left" />
                    {/if}
                {/each}
            </div>
        </div>
    {/each}
</main>
