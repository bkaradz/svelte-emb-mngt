<script lang="ts">
	import type { PricelistsDocument } from '$lib/models/pricelists.model';
	import { toasts } from '$lib/stores/toasts.store';
	import logger from '$lib/utility/logger';
	import { svgView, svgXSmall } from '$lib/utility/svgLogos';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let tableHeadings = ['Name', 'isActive', 'isDefault', 'Edit', 'Delete'];

	let pricelists = [];
	$: console.log('🚀 ~ file: PricelistsTable.svelte ~ line 12 ~ pricelists', pricelists.length);

	const heandleDelete = (id: any) => {};

	const getPricelists = async () => {
		try {
			const res = await fetch('/api/pricelists.json?');
			pricelists = await res.json();
			console.log(
				'🚀 ~ file: PricelistsTable.svelte ~ line 19 ~ getPricelists ~ pricelists',
				pricelists
			);
		} catch (err) {
			logger.error(err.message);
		}
	};

	onMount(() => {
		getPricelists();
	});

	const viewPricelist = async (id) => {
		await goto(`/settings/pricelists/${id}`);
	};
</script>

{#if pricelists.length}
	<div class="mb-2 bg-white p-4">
		<h1>Pricelists</h1>
	</div>
	<!-- Table start -->
	<div class="w-full bg-white p-2 shadow-lg">
		<div class=" block ">
			<table class="relative w-full rounded-lg text-left text-sm">
				<thead>
					<tr
						class=" sticky border border-b-0 border-pickled-bluewood-700 bg-pickled-bluewood-700 text-white"
					>
						{#each tableHeadings as header (header)}
							<th on:click={() => console.log(header)} class="px-2 py-2">{header}</th>
						{/each}
					</tr>
				</thead>
				<tbody class="overflow-y-auto">
					{#each pricelists as list (list._id)}
						<tr
							class="whitespace-no-wrap w-full border border-t-0 border-pickled-bluewood-300 font-normal odd:bg-pickled-bluewood-100 odd:text-pickled-bluewood-900 even:text-pickled-bluewood-900"
						>
							<td class="px-2 py-1">
								<input
									class="m-0 w-full border-none bg-transparent p-0 text-sm focus:border-transparent focus:ring-transparent"
									type="text"
									name="name"
									bind:value={list.name}
								/>
							</td>

							<td class="px-2 py-1">
								<input bind:checked={list.isActive} type="checkbox" name="isActive" />
							</td>
							<td class="px-2 py-1">
								<input bind:checked={list.isDefault} type="checkbox" name="isDefault" />
							</td>
							<td class="p-1 text-center ">
								<button class=" m-0 p-0" on:click={() => viewPricelist(list._id)}>
									<span class="fill-current text-pickled-bluewood-500">
										{@html svgView}
									</span>
								</button>
							</td>
							<td class="p-1 text-center ">
								<button class=" m-0 p-0" on:click={() => heandleDelete(list._id)}>
									<span class="fill-current text-pickled-bluewood-500">{@html svgXSmall}</span>
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<pre class="text-xs text-royal-blue-900" />
	</div>
	<!-- Table End -->
{/if}

<style>
</style>
