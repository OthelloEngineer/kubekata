<script lang="ts">
    import higlightedWords from "./highlighted-words.json";
    export let goal = "default goal";
    let preprocessedGoal = highlightWords(goal);

    function highlightWords(goal: string) {
        const words = goal.split(" ");
        let nextWordIsToken = false;
        const highlights = words.map((word) => {
            const matchedHighlight = higlightedWords.find((highlight) => {
                highlight = highlight.split(" ")[0];
                return highlight === word;
            });
            if (nextWordIsToken) {
                nextWordIsToken = false;
                return `<span class="text-green-500">${word}</span>`;
            }
            if (
                matchedHighlight !== undefined &&
                matchedHighlight.includes("$")
            ) {
                nextWordIsToken = true;
                return `<span class="text-red-500">${word}</span>`;
            }
            if (matchedHighlight) {
                return `<span class="text-yellow-500">${word}</span>`;
            }
            return word;
        });
        return highlights.join(" ");
    }
</script>

<div
    class="max-w-sm p-6 bg-green-500 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 bg-opacity-20"
>
    <h5
        class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
    >
        Goal
    </h5>
    <p class="mb-3 font-normal text-black dark:text-gray-400">
        {@html preprocessedGoal}
    </p>
</div>
