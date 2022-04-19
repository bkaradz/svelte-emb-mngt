<script lang ts>
</script>

<li class="group cursor-pointer border-t border-pickled-bluewood-200 first:border-t-0">
	<!-- svelte-ignore a11y-missing-attribute -->
	<a
		on:click|preventDefault={(e) => {
			corporateSearch = result;
			showList = false;
		}}
		class="{index === highlightIndex
			? 'border-royal-blue-600 bg-pickled-bluewood-100'
			: ''} block border-l-4 border-transparent p-2 text-sm text-pickled-bluewood-600 group-hover:border-royal-blue-600 group-hover:bg-pickled-bluewood-100"
		>{result.name}</a
	>
</li>

<style>
</style>
