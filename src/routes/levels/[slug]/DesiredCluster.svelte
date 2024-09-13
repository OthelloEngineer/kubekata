<script lang="ts">
    import { browser } from "$app/environment";
    import DeploymentBox from "$lib/components/DeploymentBox.svelte";
    import { getDefaultCluster, type Cluster } from "$lib/KubernetesTypes";
    $: desiredState = getDefaultCluster();
    let polling: NodeJS.Timeout;
    let input: string = "";
    let inputElement: HTMLInputElement;
    let hint = "No state changes yet";
    export let needsQuestion: boolean = false;
    export let isCompleted: boolean;
    const setupPoller = () => {
        if (polling) {
            clearInterval(polling);
        }
        polling = setInterval(doFetch, 5000);
    };
    const doFetch = async () => {
        if (browser) {
            console.log("fetching; input: ", input);
            const url = `/api/cluster?url=desired&msg=${input}`;
            const res = await fetch(url, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((data) => {
                    const ensureCluster = JSON.stringify(data);
                    desiredState = getDefaultCluster();
                    desiredState = JSON.parse(ensureCluster);
                    console.log(desiredState);
                });
            const checkUrl = `/api/cluster?url=status`;
            await fetch(checkUrl, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("desired: ", data);
                    if (data.status === "success") {
                        clearInterval(polling);
                    }
                    hint = data;
                    if (hint === "success") {
                        isCompleted = true;
                    }
                });
        }
    };
    doFetch();
    $: setupPoller();
</script>
<div class="p-8 w-full">
<div
    class="flex flex-col w-full space-y-1 p-6 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 bg-opacity-20"
>
    <div class="flex flex-row space-x-2"> 
    <h1>Desired Cluster State</h1>
    {#if needsQuestion}
    <input bind:this={inputElement} bind:value={input} type="text" placeholder="Enter level answer here" class="w-1/5 h-7 pl-1 rounded-md outline outline-slate-700 outline-1 bg-opacity-45" /> 
    <button class="bg-blue-500 hover:bg-blue-700 w-20 text-white font-bold rounded h-7  align-top" on:click={() => {
        doFetch(); 
        inputElement.value = "";
        }}>Submit</button>
    {/if}
    <span class="dark:border-gray-700 bg-opacity-40 text-red-500">Hint: {hint}</span>
    {#if isCompleted}
        <span class="dark:border-gray-700 bg-opacity-40 text-green-500">Level Completed!</span>
    {/if}
</div>
    {#each desiredState.deployments as deployment}
        <DeploymentBox {deployment} />
    {/each}
</div>
</div>