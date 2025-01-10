<script lang="ts">
    import { slugify } from "$lib/utils";

    export let name: string;
    export let isCompleted: boolean;
    export let isApproved: boolean;
    function getButtonColor() {
        if (!isApproved) {
            return "bg-grey-500 pointer-events-none";
        }
        return isCompleted ? "bg-green-500" : "bg-blue-500";
    }
    console.log("level name: ", name, "isCompleted: ", isCompleted);

    // console.log("level name: ", name);
    export let goal = "default goal";
    export let description = "default description";

    
</script>

<a
    class="{getButtonColor()} text-nowrap hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out max-w-min outline outline-2 outline-white"
    href="/levels/{slugify(name)}"
>
    <p class="text-justify">{name}</p>
</a>
