<script lang="ts">    
    import { setContext } from "svelte-typed-context"
    import { writable } from "svelte/store"
    import { key } from "./_common"

    export const length = writable(0)
    export const index = writable(0)

    export function next() { 
        if ($index === $length) {
            open = false
            flip = true
            $index = 0
            return
        }

        $index++
    }

    export function previous() { 
        if ($index === 0) {
            open = false
            return
        }

        $index-- 
    }

    setContext(key, { length, index, next, previous })

    let clazz = ""
    export { clazz as class }
    export let flip = false
    export let open = false

    function handleEndpaperClick() {
        open = false
        flip = true
        $index = 0
    }
</script>

<section class="jacket {clazz}">
    <div class="book" class:flip class:open>
    	<div class="spine">
            <slot name="spine" />
    	</div>
    	<div class="back">
            <div class="back-cover" on:click={() => (flip = false)}>
                <slot name="back-cover" />
            </div>
            <div class="back-endpaper" on:click={handleEndpaperClick}>
                <slot name="back-endpaper" />
            </div>
    	</div>
        {#if $$slots.default}
            <div class="pages" style="--length: {$length}">
                <slot />
            </div>
        {/if}
        <div class="front" style="z-index: {$length}">
            <div class="front-endpaper" on:click={previous}>
                <slot name="front-endpaper" />
            </div>
            <div class="front-cover" on:click={() => (open = true)}>
                <slot name="front-cover" />
            </div>
        </div>
    </div>
</section>

<style lang="postcss">
    .jacket {
        perspective: var(--perspective, 100rem);
        perspective-origin: bottom left;
        
        .book {
            --aspect-h-inner: var(--aspect-h, 1);
            --aspect-w-inner: var(--aspect-w, 1);
            --thickness-inner: var(--thickness, 2.5rem);
            --angle-inner: var(--angle, 160deg);
            --raise-inner: var(--raise, 4rem);

            --aspect-ratio: calc(var(--aspect-h-inner)/var(--aspect-w-inner));
            --half-thickness: calc(var(--thickness-inner) / 2);
    
            @apply relative;

            padding-bottom: calc(var(--aspect-ratio) * 100%);
        	transform-style: preserve-3d;
        	transition: transform .5s;
    
            & > :global(*) {
                @apply absolute inset-0 w-full h-full;
            }

            &.open {
                transform: translate3d(0,0,var(--raise-inner));
                .front {
                	transform: translate3d(0,0,calc(var(--half-thickness) - 1px)) rotate3d(0,1,0,calc(-1*var(--angle-inner) - 1deg));
                }
                .pages :global(.page.turned) {
                    transform: translate3d(0px,0,calc(var(--half-thickness))) rotate3d(0,1,0,calc(-1*var(--angle-inner) + 1deg*(var(--index) + 1)));
                }
            }

            &:not(.open) {
                &:hover {
                	transform: rotate3d(0,1,0,35deg);
                }
                &.flip {
                    transform: translate3d(0,0,0px) rotate3d(0,1,0,var(--angle-inner));
                }
            }

            .pages {
                backface-visibility: hidden;
                pointer-events: none;
                transform-style: preserve-3d;
    
                :global(.page) {
                    @apply absolute inset-0;
    
                	transform-origin: 0% 50%;
                	transition: transform .5s;
                    z-index: calc(var(--length) - var(--index));
                    transform-style: preserve-3d;
    
                    :global(.page-front), :global(.page-back) {
                        @apply absolute inset-0;
                        backface-visibility: hidden;
                        pointer-events: auto;
                    }
                    :global(.page-front) {
                        z-index: -1;
                        transform: translate3d(0,0,calc(var(--half-thickness) - 1px));
                    }
                    :global(.page-back) {
                        z-index: 1;
                        transform: rotate3d(0,1,0,calc(-180deg)) translate3d(0,0,calc(var(--half-thickness) - 1px));
                    }
                }
            }
    
            .front, .back {
                &-cover, &-endpaper {
                    @apply absolute inset-0;
                    backface-visibility: hidden;
                }
            }
    
            .front {
                transform-style: preserve-3d;
            	transform-origin: 0% 50%;
            	transition: transform .5s;
            	transform: translate3d(0,0,var(--half-thickness));
        
                &-endpaper {
                    transform: rotate3d(0,1,0,calc(-180deg)) translate3d(0,0,var(--half-thickness));
                }
            }
    
            .back .back-cover {
                transform: rotate3d(0,1,0,-180deg) translate3d(0,0,var(--half-thickness));
            }
    
            .spine {
                @apply origin-top-left absolute inset-0;
            	transform: rotate3d(0,1,0,-90deg);
                pointer-events: none;
    
                & > :global(*) {
                    @apply absolute inset-0 origin-top-left;
                    width: calc(100% * var(--aspect-ratio));
                    height: var(--thickness-inner);
                    transform: rotate(90deg) translateY(calc(-1*var(--half-thickness)));
                }
            }   
        }
    }
</style>