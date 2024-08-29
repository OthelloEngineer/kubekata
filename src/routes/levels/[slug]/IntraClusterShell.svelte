<script lang="ts">
    import CommandSpinner from "$lib/components/CommandSpinner.svelte";

    interface Command {
        command: string;
        output: string;
    }

    async function executeCommand(command: string) {
        // sleep for 1 second to simulate a long-running command
        if (command === "clear") {
            previousCommands = [];
            return "";
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return "output of the command";
    }

    let isLoading = false;
    let previousCommands: Command[] = [];
    let lastCommand: string = "";
    let currentCommand: string = "";
</script>

<div class="w-full p-9">
    <div
        class="coding inverse-toggle px-5 pt-4 shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased
              bg-gray-800 pb-6 pt-4 rounded-lg leading-normal overflow-hidden"
    >
        <div class="top mb-2 flex border-b-2 border-gray-500 bg-opacity-10">
            <div class="h-3 w-3 bg-red-500 rounded-full"></div>
            <div class="ml-2 h-3 w-3 bg-orange-300 rounded-full"></div>
            <div class="ml-2 h-3 w-3 bg-green-500 rounded-full"></div>
            <span class="tracking-widest px-5 justify-center text-green-400">
                IntraClusterShell</span
            >
        </div>
        {#each previousCommands as command}
            <div class="flex flex-row">
                <span class="text-green-400"> > </span>
                <span class="text-gray-100">{command.command}</span>
            </div>
            <div class="flex flex-row">
                <span class="text-gray-100">{command.output}</span>
            </div>
        {/each}

        <div class="mt-4 flex">
            <span class="text-green-400">computer:~$</span>
            {#if isLoading}
                <CommandSpinner />
            {:else}
                <input
                    bind:value={currentCommand}
                    class="flex-1 typing items-center pl-2 bg-transparent focus:outline-none text-gray-100"
                    placeholder="execute commands inside the cluster here"
                    on:keydown={async (e) => {
                        if (e.key === "Enter") {
                            console.log("executing command");
                            isLoading = true;

                            let output = await executeCommand(currentCommand);

                            isLoading = false;
                            previousCommands = [
                                ...previousCommands,
                                {
                                    command: currentCommand,
                                    output,
                                },
                            ];

                            currentCommand = ""; // Optionally, clear the input after execution
                        }
                    }}
                />
            {/if}
        </div>
    </div>
</div>
