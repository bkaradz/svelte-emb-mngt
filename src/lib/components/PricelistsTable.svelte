<script lang="ts">
	import type { PricelistsDocument } from '$lib/models/pricelists.model';
	import { toasts } from '$lib/stores/toasts.store';
	import logger from '$lib/utility/logger';
	import { svgView, svgXSmall } from '$lib/utility/svgLogos';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let tableHeadings = ['name', 'Active', 'Default', 'Edit', 'Delete'];

	export let optionsList = [
		{
			_id: '6284f6caf696648109d7438c',
			userID: '62742949262c74d4ae15e567',
			name: 'pricelist1',
			isActive: true,
			isDefault: true,
			pricelists: [
				{
					minimumPrice: {
						$numberDecimal: '1.0000'
					},
					pricePerThousandStitches: {
						$numberDecimal: '0.2000'
					},
					maximumQuantity: 3,
					embroideryType: 'flat',
					_id: '6284f6caf696648109d7438d'
				},
				{
					minimumPrice: {
						$numberDecimal: '0.7500'
					},
					pricePerThousandStitches: {
						$numberDecimal: '0.1600'
					},
					maximumQuantity: 30,
					embroideryType: 'flat',
					_id: '6284f6caf696648109d7438e'
				},
				{
					minimumPrice: {
						$numberDecimal: '0.6750'
					},
					pricePerThousandStitches: {
						$numberDecimal: '0.1500'
					},
					maximumQuantity: 50,
					embroideryType: 'flat',
					_id: '6284f6caf696648109d7438f'
				},
				{
					minimumPrice: {
						$numberDecimal: '0.6000'
					},
					pricePerThousandStitches: {
						$numberDecimal: '0.1400'
					},
					maximumQuantity: 100000,
					embroideryType: 'flat',
					_id: '6284f6caf696648109d74390'
				},
				{
					minimumPrice: {
						$numberDecimal: '1.5000'
					},
					pricePerThousandStitches: {
						$numberDecimal: '0.2000'
					},
					maximumQuantity: 50,
					embroideryType: 'cap',
					_id: '6284f6caf696648109d74391'
				},
				{
					minimumPrice: {
						$numberDecimal: '1.0000'
					},
					pricePerThousandStitches: {
						$numberDecimal: '0.1750'
					},
					maximumQuantity: 100000,
					embroideryType: 'cap',
					_id: '6284f6caf696648109d74392'
				},
				{
					minimumPrice: {
						$numberDecimal: '1.2500'
					},
					pricePerThousandStitches: {
						$numberDecimal: '0.2000'
					},
					maximumQuantity: 50,
					embroideryType: 'applique',
					_id: '6284f6caf696648109d74393'
				},
				{
					minimumPrice: {
						$numberDecimal: '1.0000'
					},
					pricePerThousandStitches: {
						$numberDecimal: '0.1750'
					},
					maximumQuantity: 100000,
					embroideryType: 'applique',
					_id: '6284f6caf696648109d74394'
				}
			],
			createdAt: '2022-05-18T13:38:18.175Z',
			updatedAt: '2022-05-18T13:38:18.175Z',
			__v: 0,
			id: '6284f6caf696648109d7438c'
		}
	];

	const heandleDelete = (id: any) => {};

	const getPricelists = async () => {
		try {
			const res = await fetch('/api/pricelists.json?');
			const pricelists = await res.json();
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
				{#each optionsList as list (list._id)}
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
<style>
</style>
