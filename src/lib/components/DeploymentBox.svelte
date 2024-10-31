<script lang="ts">
    import { type Deployment, type Pod } from "$lib/KubernetesTypes";
    export let deployment: Deployment;
    let pods: Pod[] = [];
    if (deployment.pods) {
        pods = deployment.pods;
        console.log("logging pods: ", pods);
    } else {
        console.log("no pods");
        deployment.pods = [];
    }
    let selectors: string[] = ["No selectors"];
    if (deployment.selector) {
        let selectorMap = buildMap(deployment.selector);
        console.log(
            "selectorMap: ",
            selectorMap,
            "vs actual selectors: " + deployment.selector,
        );
        const selectorKeys = Array.from(selectorMap.keys());
        selectors = selectorKeys.map((key) => {
            return key + " ⇔ " + selectorMap.get(key);
        });
    }
    function buildMap(obj: any) {
        let map = new Map();
        Object.keys(obj).forEach((key) => {
            map.set(key, obj[key]);
        });
        return map;
    }
    // console.log("selectors: ", selectors);
</script>


<div class="max-w-md bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-xl font-bold text-blue-600 mb-4">Cluster Deployment Overview</h2>

    <div class="bg-blue-50 rounded-lg p-4 mb-4">
        <div class="flex items-center justify-between">
            <span class="text-lg font-semibold text-gray-800">Deployment: {deployment.name}</span>
            <span class="text-gray-700">Replicas: {deployment.replicas}</span>
        </div>
        <div class="flex items-center justify-between mt-2">
            <span class="text-gray-700">Update Strategy: {deployment.strategyType}</span>
        </div>
        <div class="flex items-center justify-between mt-2">
            <span class="text-gray-700">Namespace: {deployment.namespace}</span>
        </div>
    </div>

    <div class="mb-4">
        {#each selectors as selector}
            <span class="inline-block bg-purple-100 text-purple-600 text-sm font-medium px-3 py-1 rounded-full">
                Selector: {selector}
            </span>
        {/each}
    </div>

    <div class="bg-gray-50 rounded-lg p-4">
        <h3 class="text-lg font-semibold text-gray-800 mb-3">Pods</h3>
        {#each pods as pod}
            {#each pod.containers as container}
                {#if Array.isArray(container.envs) && container.envs.length > 0}
                    <span> envs: {container.envs.reduce((a,b) => {return `${a}, ${b}`})}</span>
                {/if}
                <div class="border border-gray-300 rounded-lg p-3 mb-3 flex justify-between items-center">
                    <div>
                        <span class="block font-semibold text-gray-800">{pod.name}</span>
                        <span class="text-gray-600 text-sm">Image: {container.image}</span>
                    </div>
                </div>
                {#if Array.isArray(pod.envs) && pod.envs.length > 0}
                    <div class="mt-2">
                        <h4 class="text-sm font-semibold text-gray-700">Environment Variables:</h4>
                        <span class="text-gray-700 text-sm">
                            {container.envs.reduce((a,b) => {return `${a}, ${b}`})}
                        </span>
                    </div>
                {/if}
            {/each}
        {/each}
    </div>
</div>
