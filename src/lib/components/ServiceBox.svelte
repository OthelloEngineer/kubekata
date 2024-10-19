<script lang="ts">
    import type { Service, EndPoint } from "$lib/KubernetesTypes";

    export let service: Service;

    // Initialize `service.endpoints` as an empty array if it is undefined or null
    if (!Array.isArray(service.endpoints)) {
        service.endpoints = [];
    }

    // For debugging, log the structure
    console.log("service: ", service);
    console.log("service.endpoints: ", service.endpoints);
    
    if (Array.isArray(service.endpoints)) {
        console.log("service.endpoints is an array");
    } else {
        console.log("service.endpoints is not an array");
    }
</script>

<div class="w-full p-8">
    <div class="w-full p-6 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 bg-opacity-20 size-fit">
        <h1 class="text-white text-xl font-semibold">Current Cluster State</h1>

        <div class="p-4 bg-gray-800 text-white font-mono rounded-lg">
            <p>{service.name}</p>

            {#if Array.isArray(service.endpoints)}
                {#each service.endpoints as endpoint}
                    <div>
                        <p>{endpoint.name}</p>
                        <p>{endpoint.pod.name}</p>
                    </div>
                {/each}
            {:else}
                <p>No endpoints available or still loading...</p>
            {/if}

{#if Array.isArray(service.selector) && service.selector.length > 0}
    {#each service.selector as selector}
        <p>{selector}</p>
    {/each}
{:else}
    <p>No selectors available</p>
{/if}

{#if Array.isArray(service.ports) && service.ports.length > 0}
    {#each service.ports as port}
        <p>{port}</p>
    {/each}
{:else}
    <p>No ports available</p>
{/if}

            <p>{service.namespace}</p>
        </div>
    </div>
</div>
