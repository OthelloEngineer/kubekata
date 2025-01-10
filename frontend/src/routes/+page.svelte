<script lang="ts">

    import levels from "$lib/icons/levels.png";
    import docker from "$lib/icons/docker-mark-white.png";
    import kubernetes from "$lib/icons/kubernetes.png";
    import kubecuddle from "$lib/icons/kubecuddle.png";
    import { Hr, P, Button } from "flowbite-svelte";
    import { ArrowRightOutline } from "flowbite-svelte-icons";
    import CuddleBubble from "$lib/components/CuddleBubble.svelte";
    import { printEnvs } from "$lib/utils";
    printEnvs()
</script>

<div class="flex flex-col justify-center items-center space-y-10 h-screen flex-wrap">
    <div />
    <div class="flex flex-row animate-bounce w-max space-x-4">
        <img src={kubecuddle} alt="KubeCuddle" class="w-32" />
        <CuddleBubble message="Let's learn kubernetes together!!!" />
    </div>
    <P class="text-6xl font-bold text-slate-300 ">Kube Kata</P>
    <Hr classHr="w-48 h-1 mx-auto my-4 rounded md:my-10" />
    <P class="text-3xl font-bold text-description">
        Your level-based on-boarding guide to Kubernetes
    </P>
    <div class="flex flex-row basis-20 justify-center items-center space-x-10">
        <img src={docker} alt="Docker" class="w-24" />
        <img src={levels} alt="Levels" class="w-32" />
        <img src={kubernetes} alt="Kubernetes" class="w-24" />
    </div>
    <Button
        href="/levels"
        pill={true}
        outline={true}
        class="flex flex-row outline rounded-md p-1.5 bg-blue-600 text-white text-lg font-bold hover:bg-blue-800 transition duration-300 ease-in-out "
    >
        Get Started! <ArrowRightOutline class="w-5 h-5 ms-2" />
    </Button>
</div>

<style lang="postcss">
</style>
