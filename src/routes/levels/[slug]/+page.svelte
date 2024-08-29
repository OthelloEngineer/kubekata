<script lang="ts">
    import { page } from "$app/stores";
    import ClusterInfoBox from "./ClusterInfoBox.svelte";
    import GuidanceBox from "./GuidanceBox.svelte";
    import LevelInfoBox from "./LevelInfoBox.svelte";
    import InfoBox from "./InfoBox.svelte";
    import DesiredCluster from "./DesiredCluster.svelte";
    import levelExample from "../levels-example.json";
    import IntraClusterShell from "./IntraClusterShell.svelte";
    let name = $page.params.slug;
    let levels = levelExample.flatMap((level) => level.levels);
    console.log(levels);
    let level = levels.find((level) => level.title === name);
    let description = level?.description;
    if (description === undefined) {
        description = "default description";
    }
    let goal = level?.goal;
</script>

<div class="flex flex-wrap space-x-4 px-8 py-2">
    <button
        class="bg-blue-800 hover:bg-blue-400 rounded-md hover:rounded-xl p-2 outline outline-1 outline-white hover:outline-opacity transition-all duration-300 ease-in-out text-white font-bold"
        >Back</button
    >
    <button
        class="bg-red-800 hover:bg-red-400 rounded-md hover:rounded-xl p-2 outline outline-1 outline-white hover:outline-opacity transition-all duration-300 ease-in-out text-white font-bold"
        >Reset</button
    >
</div>
<div class="flex flex-wrap">
    <div class="mx-6">
        <InfoBox
            levelTitle={name.replaceAll("-", " ")}
            levelDescription={description}
        />
    </div>
    <div>
        <LevelInfoBox {goal} />
    </div>
    <div class="ml-auto mx-4">
        <GuidanceBox />
    </div>
</div>

<ClusterInfoBox />
<DesiredCluster />
<IntraClusterShell />
