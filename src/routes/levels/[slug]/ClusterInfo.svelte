<script lang="ts">
    import { browser } from "$app/environment";
    let clusterState = JSON.parse('{"no":"data"}');
    let polling: NodeJS.Timeout;
    const setupPoller = () => {
        if (polling) {
            clearInterval(polling);
        }
        polling = setInterval(doFetch, 1000);
    };

    const doFetch = async () => {
        if (browser) {
            const url = `/api/cluster?url=clusterState`;
            const res = await fetch(url, {
                method: "GET",
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("data: ", data);
                    clusterState = JSON.stringify(data);
                });
            await new Promise((r) => setTimeout(r, 1000));
        }
    };
    $: setupPoller();
</script>

<div
    class=" w-full p-6 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 bg-opacity-20 m-8"
>
    <h1>Current Cluster State</h1>
    <p>{clusterState}</p>
</div>
