<script lang="ts">
    import { getContext } from "svelte-typed-context"
    import { key } from "./_common"
    import { onMount } from "svelte"

    const { length, index, next, previous } = getContext(key)

    let pageIndex: number 

    onMount(() => {
        pageIndex = $length
        $length++
        return () => $length--
    })
</script>

<div class="page" style="--index: {pageIndex}" class:turned={$index > pageIndex}>
    <div class="page-front" on:click={next}>
        <slot name="page-front" />
    </div>
    <div class="page-back" on:click={previous}>
        <slot name="page-back" />
    </div>    
</div>