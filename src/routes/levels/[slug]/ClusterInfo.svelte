<script lang="ts">
    let clusterState = JSON.parse('"no": "data"');

    while (true) {
        async () => {
            const res = await fetch("/api/cluster?url=clusterState", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => res.json());
            clusterState = res;
            await new Promise((r) => setTimeout(r, 1000));
        };
    }
</script>

<div
    class=" w-full p-6 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 bg-opacity-20 m-8"
>
    <h1>Current Cluster State</h1>
    <p>{clusterState}</p>
</div>
