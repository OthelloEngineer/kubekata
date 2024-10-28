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
            return key + "<-> " + selectorMap.get(key);
        });
    }
    function buildMap(obj: any) {
        let map = new Map();
        Object.keys(obj).forEach((key) => {
            map.set(key, obj[key]);
        });
        return map;
    }
    console.log("selectors: ", selectors);
</script>

<div
    class="flex flex-col space-x-1 space-y-1 rounded-md bg-purple-400 bg-opacity-70 pl-2 outline outline-1 outline-purple-200 size-fit"
>
    <div class="flex space-x-2">
        <span
            class="inline-block rounded-lg bg-purple-200 bg-opacity-40 p-1 text-center text-white"
        >
           deployment: {deployment.name} 
        </span>
        <div class="flex flex-col">
            <div class="flex flex-row space-x-2">
                <span> n={deployment.replicas}</span>
                <span>{deployment.strategyType}</span>
            </div>
            <span>{deployment.namespace}</span>
        </div>
    </div>
    <div class="flex flex-row space-x-1">
        <div
            class="space-x- flex size-fit flex-col space-y-1 rounded-sm bg-purple-200 bg-opacity-40 p-1"
        >
            <span> selectors: </span>
            {#each selectors as selector}
                <span
                    class="rounded-md p-1 outline-dashed outline-1 outline-white"
                >
                    {selector}
                </span>
            {/each}
        </div>
        <div
            class="flex size-fit flex-col space-y-1 rounded-sm bg-purple-200 bg-opacity-40 p-1"
        >
            <span> pods: </span>
            {#each pods as pod}
                <span class="p-1 outline outline-1 outline-white">
                    {pod.name}
                    {#each pod.containers as container}
                    <span> image: {container.image}</span>
                    <span> envs: {container.envs.reduce((a,b) => {return `${a}, ${b}`})}</span>
                    <span></span>
                    {/each}
                </span>
            {/each}
        </div>
    </div>
</div>
