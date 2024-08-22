<script lang="ts">
    import { get } from "svelte/store";

    export let strokeSize = 20;
    export let orientation = "right";
    let orientation_map = new Map();
    orientation_map.set("right", "M136.5 136.5Q612.5 279.5 663.5 663.5");
    orientation_map.set("left", "M136.5 136.5Q279.5 612.5 663.5 663.5");
</script>

<svg
    class="w-20 h-20 text-white"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 800 800"
    ><g
        stroke-width="10"
        stroke="#ffffff"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        transform="matrix(0.70,0.70,-0.70,0.70,380,-180)"
        ><path
            d={orientation_map.get(orientation)}
            marker-end="url(#SvgjsMarker3507)"
        ></path></g
    ><defs
        ><marker
            markerWidth="8"
            markerHeight="8"
            refX="4"
            refY="4"
            viewBox="0 0 8 8"
            orient="auto"
            id="SvgjsMarker3507"
            ><polygon points="0,8 2.5,4 0,0 8,5" fill="#ffffff"
            ></polygon></marker
        ></defs
    ></svg
>
