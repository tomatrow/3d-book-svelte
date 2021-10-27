<script lang="ts">
    import { Book, Page } from "$lib"

    let flip: boolean
    let open: boolean
    let aspectH = 1
    let aspectW = 1
    let thickness = 3
    let perspective = 100
    let angle = 160
    let raise = 4
    
    const blackFill = "bg-black flex h-full items-center justify-center"
</script>

<div class="p-4 flex flex-col gap-2 items-start">
    <button type="button" class="px-4 py-2 bg-black text-white" on:click={() => flip = !flip}>Flip</button>
    <button type="button" class="px-4 py-2 bg-black text-white" on:click={() => open = !open}>Open</button>
    <label class="flex flex-col items-start">
        Horizontal Aspect
        <input bind:value={aspectH} type="number" />
    </label>
    <label class="flex flex-col items-start">
        Vertical Aspect
        <input bind:value={aspectW} type="number" />
    </label>
    <label class="flex flex-col items-start">
        perspective (rem)
        <input bind:value={perspective} type="number" />
    </label>
    <label class="flex flex-col items-start">
        angle (deg)
        <input bind:value={angle} type="number" />
    </label>
    <label class="flex flex-col items-start">
        Spine Thickness (rem)
        <input bind:value={thickness} type="number" />
    </label>
    <label class="flex flex-col items-start">
        Raise (rem)
        <input bind:value={raise} type="number" />
    </label>
</div>

<div class="p-16">
    <div class="w-[40%] mx-auto transition duration-425 {open ? 'translate-x-1/2' : ''}">
        <Book class="text-white" bind:flip bind:open --aspect-h={aspectH} --aspect-w={aspectW} --thickness="{thickness}rem" --perspective="{perspective}rem" --angle="{angle}deg" --raise="{raise}rem">
            <div slot="front-cover" class={blackFill}>
                Front Cover
            </div>
            <div slot="front-endpaper" class={blackFill}>
                Front Endpaper
            </div>
            {#each [1,2,3,4,5] as i}
                <Page>
                    <div slot="page-front" class={blackFill}>
                        Front Page {i}
                    </div>
                    <div slot="page-back" class={blackFill}>
                        Back Page {i}
                    </div>
                </Page>
            {/each}
            <div slot="back-endpaper" class={blackFill}>
                Back Endpaper
            </div>
            <div slot="back-cover" class={blackFill}>
                Back Cover
            </div>
        	<div slot="spine" class={blackFill}>
        		Spine
        	</div>
        </Book>
    </div>
    
    <h2>Defaults</h2>
    
    <div class="w-[40%] mx-auto transition duration-425 {open ? 'translate-x-1/2' : ''}">
        <Book class="text-white" bind:flip bind:open>
            <div slot="front-cover" class={blackFill}>
                Front Cover
            </div>
            <div slot="front-endpaper" class={blackFill}>
                Front Endpaper
            </div>
            {#each [1,2,3,4,5] as i}
                <Page>
                    <div slot="page-front" class={blackFill}>
                        Front Page {i}
                    </div>
                    <div slot="page-back" class={blackFill}>
                        Back Page {i}
                    </div>
                </Page>
            {/each}
            <div slot="back-endpaper" class={blackFill}>
                Back Endpaper
            </div>
            <div slot="back-cover" class={blackFill}>
                Back Cover
            </div>
        	<div slot="spine" class={blackFill}>
        		Spine
        	</div>
        </Book>
    </div>    
</div>
