<script lang="ts">
    import { browser } from "$app/environment";
    import DeploymentBox from "$lib/components/DeploymentBox.svelte";
    import { getDefaultCluster, type Cluster } from "$lib/KubernetesTypes";
    import cluster from "cluster";
    $: clusterState = getDefaultCluster();
    let polling: NodeJS.Timeout;
    let FORCE_RERENDER = 0;
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
                    console.log("ensureCluster: ", ensureCluster);
                    const parsedEnsureCluster: Cluster = JSON.parse(ensureCluster);
                    if (parsedEnsureCluster.deployments === null) {
                        parsedEnsureCluster.deployments = [];
                    };
                    clusterState = getDefaultCluster();
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
        <!-- <p class="text-white">This is the current cluster box</p> -->
        {#key FORCE_RERENDER}
            {#each clusterState.deployments as deployment}
                <DeploymentBox {deployment} />
            {/each}
        {/key}
    </div>
</div>