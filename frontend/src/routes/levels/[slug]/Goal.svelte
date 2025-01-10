<script lang="ts">
    import higlightedWords from "./highlighted-words.json";
    export let goal = "default goal";
    let preprocessedGoal = highlightWords(goal);

    function isCodeBlock(element: string) {
        const startToken = element.substring(0, 5);

        if (startToken === "code|") {
            return element.substring(5);
        }
        return undefined;
    }

    function highlightWords(goal: string) {
        const words = goal.split(" ");
        let nextWordIsToken = false;
        const highlights = words.map((word) => {

            const matchedHighlight = higlightedWords.find((highlight) => {
                highlight = highlight.split(" ")[0];
                return highlight === word;
            });

            // Hashtags are used to combine highlighted words.
            // Therefore, they are removed so the user won't see them.
            word = word.replaceAll("#", " ")

            if (nextWordIsToken) {
                nextWordIsToken = false;
                return `<span class="font-mono bg-gray-800 px-1 rounded">${word}</span>`;
            }
            if (
                matchedHighlight !== undefined &&
                matchedHighlight.includes("$")
            ) {
                nextWordIsToken = true;
            }
            if (matchedHighlight) {
                var codeBlockWord = isCodeBlock(word);

                if (codeBlockWord !== undefined) {
                    // The word is a code block:
                    return `<pre class="bg-gray-800 text-white font-mono p-4 rounded-lg overflow-auto"><code>${codeBlockWord}</code></pre>`;
                }

                // The word is only highlighted:
                return `<span class="font-mono bg-gray-700 px-1 rounded">${word}</span>`;
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
        class="mb-2 text-white text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
    >
        Goal
    </h5>
    <p class="mb-3 font-normal text-gray text-slate-200 dark:text-gray-400">
        {@html preprocessedGoal}
    </p>
</div>
