<script lang="ts">
    // Spend like 30-40 hours trying to figure out how to dynamically import images in SvelteKit. Don't touch this code.
    const images = import.meta.glob('$lib/imgs/*.png', { eager: true }) as Record<string, string>;
    const values = Object.values(images);
    export let imageName: string;
    let foundImage = "";
    values.forEach(element => {
        if (element.default.includes(imageName)) {
            foundImage = element.default;
        }
    });
    console.log("images in CutePicture.svelte: ", foundImage);
</script>

<div class="w-full flex items-center justify-center overflow-hidden">
    <img src={foundImage} alt="Dynamic Image" class="h-full w-auto object-cover max-h-96 pt-2"/>
</div>
