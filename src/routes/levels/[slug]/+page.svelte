<script>
    import { page } from "$app/stores";
    import ClusterInfoBox from "./ClusterInfoBox.svelte";
    import GuidanceBox from "./GuidanceBox.svelte";
    import LevelInfoBox from "./LevelInfoBox.svelte";
    import InfoBox from "./InfoBox.svelte";
    import DesiredCluster from "./DesiredCluster.svelte";
    import devFile from "./what-is-a-pod.json";
    let name = $page.params.slug;
</script>

<button> reset level </button>

<div class="flex">
    <div class="mx-6">
        <InfoBox levelTitle={name} levelDescription={devFile.description} />
    </div>
    <div>
        <LevelInfoBox goal={devFile.goal} />
    </div>
    <ClusterInfoBox />
    <DesiredCluster />
    <GuidanceBox />
</div>
