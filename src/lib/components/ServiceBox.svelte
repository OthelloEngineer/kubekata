<script lang="ts">
    import type { Service, EndPoint } from "$lib/KubernetesTypes";

    export let service: Service;
    let endpoints: EndPoint[] = service.endpoints;   
    service.endpoints = endpoints;
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
        <h1 class="text-white
            text-xl font-semibold">Current Cluster State</h1>
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
    <p>SvelteKit sometimes requires several iterations to see an array as an array</p>
{/if}

    {#each service.selector as selector}
        <p>{selector}</p>
    {/each}

    {#each service.ports as port}
        <p>{port}</p>
    {/each}

    <p>{service.namespace}</p>
</div>

    </div>
</div>


