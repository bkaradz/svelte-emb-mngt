<script lang="ts">
	import Select from '$lib/components/Select.svelte';
	import { onMount } from 'svelte';
	import logger from '$lib/utility/logger';

	let options;
	let selected;
	$: console.log('🚀 ~ file: index.svelte ~ line 8 ~ selected', selected);

	onMount(() => {
		getOptions();
	});

	const filterOptionsGroup = (group: string) => {
		return options.filter((option: { group: string }) => option.group === group);
	};

	const getOptions = async () => {
		try {
			const res = await fetch('/api/options.json');
			options = await res.json();
		} catch (err) {
			logger.error(err.message);
		}
	};
</script>

{#if options?.length}
	<div>
		<Select {selected} list={filterOptionsGroup('productCategories')} />
	</div>
{/if}

<style>
</style>
