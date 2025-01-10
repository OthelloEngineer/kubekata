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
    <h2 class="text-2xl font-bold text-blue-700 mb-4">Cluster Deployment Overview</h2>

    <div class="bg-blue-100 rounded-lg p-4 mb-4">
        <div class="flex items-center justify-between">
            <span class="text-lg font-semibold text-gray-800">Deployment: {deployment.name}</span>
            <span class="text-gray-700">Replicas: {deployment.replicas}</span>
        </div>
        <div class="mt-2">
            <span class="block text-gray-700">Update Strategy: <span class="font-medium">{deployment.strategyType}</span></span>
            <span class="block text-gray-700">Namespace: <span class="font-medium">{deployment.namespace}</span></span>
        </div>
    </div>

    <div class="mb-4 flex flex-wrap gap-2">
        {#each selectors as selector}
            <span class="inline-block bg-purple-200 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                {selector}
            </span>
        {/each}
    </div>

    <div class="bg-gray-50 rounded-lg p-4">
        <h3 class="text-xl font-semibold text-gray-800 mb-3">Pods</h3>
        {#each pods as pod}
            {#each pod.containers as container}
                <div class="border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-sm">
                    <div class="flex justify-between items-center mb-3">
                        <div>
                            <h4 class="text-lg font-bold text-gray-800">{pod.name}</h4>
                            <p class="text-sm text-gray-600">Image: <span class="text-gray-700 font-medium">{container.image}</span></p>
                        </div>
                    </div>
                    {#if Array.isArray(container.ports) && container.ports.length > 0}
                        <div class="mt-2">
                            <h5 class="text-sm font-semibold text-gray-700">Ports:</h5>
                            <p class="text-gray-700 text-sm">{container.ports.map(port => port).join(', ')}</p>
                        </div>
                    {/if}
                    {#if container.limits}
                        <div class="mt-2">
                            <h5 class="text-sm font-semibold text-gray-700">Limits:</h5>
                            <p class="text-gray-700 text-sm">
                                CPU: <span class="font-medium">{container.limits.cpu}</span> / Mem: <span class="font-medium">{container.limits.memory}</span>
                            </p>
                        </div>
                    {/if}
                    {#if container.requests}
                        <div class="mt-2">
                            <h5 class="text-sm font-semibold text-gray-700">Requests:</h5>
                            <p class="text-gray-700 text-sm">
                                CPU: <span class="font-medium">{container.requests.cpu}</span> / Mem: <span class="font-medium">{container.requests.memory}</span>
                            </p>
                        </div>
                    {/if}
                    {#if Array.isArray(container.envs) && container.envs.length > 0}
                        <div class="mt-2">
                            <h5 class="text-sm font-semibold text-gray-700">Environment Variables:</h5>
                            <ul class="list-disc list-inside text-gray-700 text-sm space-y-1">
                                {#each container.envs as env}
                                    <li>{env}</li>
                                {/each}
                            </ul>
                        </div>
                    {/if}
                    {#if Array.isArray(container.mounts) && container.mounts.length > 0}
                        <div class="mt-2">
                            <h5 class="text-sm font-semibold text-gray-700">Mounts:</h5>
                            <ul class="list-disc list-inside text-gray-700 text-sm space-y-1">
                                {#each container.mounts as mount}
                                    <li>{mount}</li>
                                {/each}
                            </ul>
                        </div>
                    {/if}
                </div>
            {/each}
        {/each}
    </div>
</div>

