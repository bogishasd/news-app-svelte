<script>
  import { onMount } from 'svelte'
  import { request } from './helpers/api'
  import { remapItemCb } from './helpers/itemCreator'
  import Loader from './components/Loader.svelte'

  const ITEMS_PER_ROW = 3

  const KEY_OFFSET_MAP = {
    37: -1, // LEFT
    38: -ITEMS_PER_ROW, // UP
    39: 1, // RIGHT
    40: ITEMS_PER_ROW // DOWN
  }

  let items = []
  let sIndex = 0

  $: currentRow = Math.floor(sIndex / ITEMS_PER_ROW)

  const handleKey = event => {
    event.preventDefault()

    const offset = KEY_OFFSET_MAP[event.keyCode]
    if (!offset) return

    sIndex = Math.min(Math.max(sIndex + offset, 0), items.length - 1)
  }

  window.addEventListener('keydown', handleKey)

  onMount(() => {
    request(
      'GET',
      'https://api.nytimes.com/svc/mostpopular/v2/viewed/30.json?api-key=xLegS4tZufVlTomVdwcstvjJx0iGMDfn'
    )
      .then(e => {
        const response = JSON.parse(e.target.response)

        const remappedItems = response.results.map(remapItemCb)

        items =
          remappedItems
            .concat(remappedItems)
            .concat(remappedItems)
            .concat(remappedItems)
            .concat(remappedItems)
      })
  })

</script>

<div class="container">
  {#if items.length}
    <div
      class="flex-container"
      style="transform: translateY({Math.max(currentRow - 1, 0) * -290}px)"
    >
      {#each items as item, index}
        <div class="flex-item">
          <div
            class="item {index === sIndex ? 'selected' : ''}"
            style="background-image: url('{item.imageUrl}')"
          >
            <div class="item-section">
              { item.section }
            </div>

            <div class="item-textbox">
              <div><strong>{ item.title }</strong></div>
              <div>Date: { item.publishedDate }</div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <Loader />
  {/if}
</div>

<style>
  .container {
    height: 100vh;
    position: relative;
    background-image: linear-gradient(
      to right bottom, rgba(6, 6, 6, 0.8), rgba(12, 12, 12, 0.8)
    );
  }

  .flex-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 40px;
    max-width: 1400px;
    min-width: 1400px;
    margin: auto;
    transition: all .2s ease-in-out;
  }

  .flex-item {
    width: 440px;
    height: 290px;
  }

  .item {
    position: relative;
    width: 90%;
    height: 90%;
  }

  .selected {
    transform: scale(1.1);
    transition: all .2s ease-in-out;
    border: 5px solid rgb(0, 195, 255);
  }

  .item-textbox {
    position: absolute;
    width: 100%;
    height: 30%;
    bottom: 0;
    background-color: rgba(0, 195, 255, 0.7);
  }

  .item-section {
    position: absolute;
    width: 100%;
    height: 10%;
    top: 0;
    background-color: rgba(255, 140, 0, 0.933);
    text-align: right;
  }
</style>