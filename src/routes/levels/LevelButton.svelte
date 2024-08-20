<script lang="ts">
    export let name: string;
    export let isCompleted: boolean = false;
    function getButtonColor() {
        return isCompleted ? "bg-green-500" : "bg-blue-500";
    }
</script>

<button
    class="{getButtonColor()} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out max-w-min"
>
    <p class="text-justify">{name}</p>
</button>
