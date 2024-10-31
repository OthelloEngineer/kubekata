<script lang="ts">
    import type { Service, EndPoint } from "$lib/KubernetesTypes";

    export let service: Service;

    if (!Array.isArray(service.endpoints)) {
        service.endpoints = [];
    }

    const Selectors = Array.from(service.selector).map(([key, value]) => `${key}: ${value}`).join(", ")

    console.log("service: ", service);
    console.log("service.endpoints: ", service.endpoints);

    if (Array.isArray(service.endpoints)) {
        console.log("service.endpoints is an array");
    } else {
        console.log("service.endpoints is not an array");
    }
</script>

<div class="max-w-md bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-xl font-bold text-blue-600 mb-4">Cluster Service Overview</h2>

    <div class="bg-blue-50 rounded-lg p-4 mb-4">
        <div class="flex items-center justify-between">
            <span class="text-lg font-semibold text-gray-800">Service: {service.name}</span>
        </div>
        <div class="flex items-center justify-between mt-2">
            <span class="text-gray-700">Type: {service.type}</span>
        </div>
        <div class="flex items-center justify-between mt-2">
            <span class="text-gray-700">Namespace: {service.namespace}</span>
        </div>
        <div class="mt-2">
            {#if Selectors.length >= 1}
                <h4 class="text-gray-800 text-sm font-semibold">Selector:</h4>
                {#each Selectors as selector}
                    <span class="inline-block bg-purple-100 text-purple-600 text-sm font-medium px-3 py-1 rounded-full">
                        {selector}
                    </span>
                {/each}
            {/if}
        </div>
           
    </div>

    <div class="mb-4">
        <h4 class="text-lg font-semibold text-gray-800 mb-2">Ports</h4>
        <div class="flex flex-wrap gap-2">
            {#each service.ports as port}
                <span class="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full">
                    {port}
                </span>
            {/each}
        </div>
    </div>

    <div class="mb-4">
        <h4 class="text-lg font-semibold text-gray-800 mb-2">Endpoints</h4>
        <div class="flex flex-wrap gap-2">
            {#if service.endpoints.length > 0 }
            {#each service.endpoints as endpoint}
                <span class="bg-green-100 text-green-600 text-sm font-medium px-3 py-1 rounded-full">
                    {endpoint.name}
                </span>
            {/each}
            {:else}
                <span class="bg-red-100 text-red-600 text-sm font-medium px-3 py-1 rounded-full">
                    Service Not connected to any pods
                </span>
            {/if}
        </div>
</div>
</div>
