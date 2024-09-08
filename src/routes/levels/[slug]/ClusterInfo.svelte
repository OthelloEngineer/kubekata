<script lang="ts">
    import { browser } from "$app/environment";
    import DeploymentBox from "$lib/components/DeploymentBox.svelte";
    import { getDefaultCluster, type Cluster } from "$lib/KubernetesTypes";
    $: clusterState = getDefaultCluster();
    let polling: NodeJS.Timeout;
    const setupPoller = () => {
        if (polling) {
            clearInterval(polling);
        }
        polling = setInterval(doFetch, 3000);
    };

    const doFetch = async () => {
        if (browser) {
            const url = `/api/cluster?url=clusterState`;
            const res = await fetch(url, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((data) => {
                    const ensureCluster = JSON.stringify(data);
                    clusterState = JSON.parse(ensureCluster);
                    console.log(clusterState);
                });
        }
    };
    $: setupPoller();
</script>

<div
    class=" w-full p-6 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 bg-opacity-20 m-8 size-fit"
>
    <h1>Current Cluster State</h1>
    {#each clusterState.deployments as deployment}
        <DeploymentBox {deployment} />
    {/each}
</div>
