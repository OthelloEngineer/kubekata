<script lang="ts">
    import { page } from "$app/stores";
    import ClusterInfo from "./ClusterInfo.svelte";
    import Guidance from "./Guidance.svelte";
    import Goal from "./Goal.svelte";
    import Info from "./Info.svelte";
    import DesiredCluster from "./DesiredCluster.svelte";
    import levelExample from "../levels-example.json";
    import IntraClusterShell from "./IntraClusterShell.svelte";
    import CutePicture from "./CutePicture.svelte";
    let name = $page.params.slug;
    let levels = levelExample.flatMap((level) => level.levels);
    console.log("levels type: ", typeof levels);
    let level = levels.find((level) => level.title === name);
    let isComplete = level?.isCompleted;
    let description = level?.description;
    if (description === undefined) {
        description = "default description";
    }
    let goal = level?.goal;
    let picture =
        "https://kubernetes.io/images/blog/2024-04-17-kubernetes-1.30-release/k8s-1.30.png";
    if (level?.picture !== undefined) {
        picture = level.picture;
    }
    let hint = level?.hint;
</script>

<nav
    class="
        py-2 px-8 h-20
        flex flex-row justify-between items-center
        text-white
        bg-gradient-to-b
        from-navBar via-navBar via-90% to-opacity
    "
>
    <div class="flex flex-wrap space-x-4 place-content-center justify-center">
        <a
            class="bg-blue-800 hover:bg-blue-400 rounded-md hover:rounded-xl p-2 outline outline-1 outline-white hover:outline-opacity transition-all duration-300 ease-in-out text-white font-bold"
            href="/levels">Back</a
        >
        <button
            class="bg-red-800 hover:bg-red-400 rounded-md hover:rounded-xl p-2 outline outline-1 outline-white hover:outline-opacity transition-all duration-300 ease-in-out text-white font-bold"
            >Reset</button
        >

        <h5
            class="mb-2 text-2xl font-semibold tracking-tight text-white dark:text-white"
        >
            {name}
            
        </h5>
        {#if isComplete}
            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-green-500 dark:text-green-500">
                Completed
            </h5>
        {/if}
    </div>
</nav>
<div class="flex">
    <div class="mx-6">
        <Info levelDescription={description} />
    </div>
    <div>
        <Goal {goal} />
    </div>
    <div
        class="w-2/5 outline outline-1 outline-white mx-6 bg-white bg-opacity-20"
    >
        <CutePicture svgName={picture} />
    </div>
    <div class="flex flex-col ml-auto mx-4">
        <Guidance {hint} />
    </div>
</div>

<ClusterInfo />
<DesiredCluster bind:isCompleted={isComplete} needsQuestion={level?.isQuestion} />
<IntraClusterShell />
