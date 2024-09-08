<script lang="ts">
    import { browser } from "$app/environment";
    import DeploymentBox from "$lib/components/DeploymentBox.svelte";
    import { getDefaultCluster, type Cluster } from "$lib/KubernetesTypes";
    $: desiredState = getDefaultCluster();
    let polling: NodeJS.Timeout;
    const setupPoller = () => {
        if (polling) {
            clearInterval(polling);
        }
        polling = setInterval(doFetch, 5000);
    };

    const doFetch = async () => {
        if (browser) {
            const url = `/api/cluster?url=desired`;
            const res = await fetch(url, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((data) => {
                    const ensureCluster = JSON.stringify(data);
                    desiredState = JSON.parse(ensureCluster);
                    console.log(desiredState);
                });
        }
    };
    $: setupPoller();
</script>

<div
    class=" w-full p-6 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 bg-opacity-20 m-8"
>
    <h1>Desired Cluster State</h1>
    {#each desiredState.deployments as deployment}
        <DeploymentBox {deployment} />
    {/each}
</div>
