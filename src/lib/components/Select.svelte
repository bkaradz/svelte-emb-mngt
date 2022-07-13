<script lang='ts'>

  export let selected = ''
  export let items = []
  export let selectChange = () => {}
   
</script>

<select bind:value={selected} on:change|preventDefault={selectChange}>
  {#each items as item}
    <option value={item}>
      {item.name}
    </option>
  {/each}
</select>

<style>

</style>