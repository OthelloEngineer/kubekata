<script lang="ts">
    import { browser } from "$app/environment";
    import DeploymentBox from "$lib/components/DeploymentBox.svelte";
    import ServiceBox from "$lib/components/ServiceBox.svelte";
    import { getDefaultCluster, type Cluster } from "$lib/KubernetesTypes";
    import { setLevel } from "$lib/utils";
    import cluster from "cluster";
    import { onDestroy } from "svelte";
    $: clusterState = getDefaultCluster();
    let polling: NodeJS.Timeout;
    let FORCE_RERENDER = 0;
    const setupPoller = () => {
        if (polling) {
            clearInterval(polling);
        }
        polling = setInterval(doFetch, 3000);
    };

    onDestroy(() => {
        console.log("clearing interval");
        clearInterval(polling);
    });

    const doFetch = async () => {
        if (browser) {
            const url = `/api/cluster?url=clusterState`;
            const res = await fetch(url, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((data) => {
                    const ensureCluster = JSON.stringify(data);
                    console.log("current cluster state: ", ensureCluster);
                    const parsedEnsureCluster: Cluster = JSON.parse(ensureCluster);
                    if (parsedEnsureCluster.deployments === null) {
                        console.log("no deployments");
                        parsedEnsureCluster.deployments = [];
                    };
                    clusterState = getDefaultCluster(); // reset cluster, svelte cannot detect changes in nested objects
                    clusterState = parsedEnsureCluster;
                    clusterState = clusterState;
                    clusterState.deployments = clusterState.deployments;
                    FORCE_RERENDER++;
                    console.log("info state: ", clusterState);
                });
            }
    };
    $: setupPoller();
</script>

<div class="w-full p-8">
    <div
        class="w-full p-6 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 bg-opacity-20 size-fit"
    >
        <h1 class="text-white text-2xl font-semibold">Current Cluster State</h1>
        <br>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- <p class="text-white">This is the current cluster box</p> -->
        {#if Array.isArray(clusterState.deployments) && clusterState.deployments.length > 0}
            {#key FORCE_RERENDER}
                {#each clusterState.deployments as deployment}
                    <DeploymentBox {deployment} />
                {/each}
            {/key}
        {/if}
        {#if Array.isArray(clusterState.services) && clusterState.services.length > 0}
            {#each clusterState.services as service}
                <ServiceBox {service} />
            {/each}
        {/if}
        </div>
    </div>
</div>