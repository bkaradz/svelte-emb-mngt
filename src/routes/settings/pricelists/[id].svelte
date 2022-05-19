<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import logger from '$lib/utility/logger';

	const endpoint = `/api/pricelists/${$page.params.id}.json`;
	$: console.log('🚀 ~ file: [id].svelte ~ line 4 ~ endpoint', endpoint);

	let pricelist;
	$: console.log('🚀 ~ file: [id].svelte ~ line 10 ~ pricelist', pricelist);

	onMount(async () => {
		try {
			const res = await fetch(endpoint);
			if (res.ok) {
				pricelist = await res.json();
				console.log('🚀 ~ file: [id].svelte ~ line 17 ~ onMount ~ pricelist', pricelist);
			}
		} catch (err) {
			logger.error(err.message);
		}
	});
</script>

<h1>Deatails</h1>

<style>
</style>
