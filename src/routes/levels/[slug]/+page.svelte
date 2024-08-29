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

<button> reset level </button>

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
    <GuidanceBox />
    <ClusterInfoBox />
    <DesiredCluster />
    <IntraClusterShell />
</div>
