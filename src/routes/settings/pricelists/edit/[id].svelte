<script lang="ts">
	import { page } from '$app/stores';
	import suite from '$lib/validation/client/signUp.validate';
	import classnames from 'vest/classnames';
	import { onMount } from 'svelte';
	import logger from '$lib/utility/logger';
	import Input from '$lib/components/Input.svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import { svgDocumentAdd, svgPencil, svgPlus, svgXSmall } from '$lib/utility/svgLogos';
	import { v4 as uuidv4 } from 'uuid';
	import { toasts } from '$lib/stores/toasts.store';
	import type { PricelistsDocument, PricelistsSubDocument } from '$lib/models/pricelists.model';
	import { convertPricelist } from '$lib/utility/pricelists.utils';

	let result = suite.get();

	export let tableHeadings = [
		'Embroidery Type',
		'Minimum Quantity',
		'Minimum Price',
		'Price per 1000 stitches',
		'Edit/Update',
		'Delete/Add Row'
	];

	const endpoint = `/api/pricelists/${$page.params.id}.json`;

	let pricelist: Partial<PricelistsDocument>;

	let selectedGroup = 'all';

	let groupList = new Set(['all']);

	$: groupList;

	let isEditableID = null;

	$: if (pricelist?.pricelists?.length) {
		groupList = new Set(['all']);
		pricelist.pricelists.forEach((list) => {
			groupList.add(list.embroideryType);
		});
		groupList = groupList;
	}

	const getPricelist = async () => {
		try {
			const res = await fetch(endpoint);
			if (res.ok) {
				const tempPricelist = await res.json();
				pricelist = tempPricelist ? convertPricelist(tempPricelist) : null;
			}
		} catch (err) {
			logger.error(err.message);
		}
	};

	onMount(async () => {
		getPricelist();
	});

	$: cn = classnames(result, {
		warning: 'warning',
		invalid: 'error',
		valid: 'success'
	});

	const heandleEditable = async (list: PricelistsSubDocument) => {
		if (isEditableID === null) {
			isEditableID = list._id;
			pricelist.pricelists = pricelist.pricelists.map((plist) => {
				if (plist._id === list._id) {
					return {
						...plist,
						minimumPrice: parseFloat(list.minimumPrice.replace('USD $', '')),
						pricePerThousandStitches: parseFloat(list.pricePerThousandStitches.replace('USD $', ''))
					};
				}
				return plist;
			});
		} else {
			isEditableID = null;
			pricelist.pricelists = pricelist.pricelists.map((plist) => {
				if (plist._id === list._id) {
					return {
						...plist,
						minimumPrice: `USD $${plist.minimumPrice.toFixed(3)}`,
						pricePerThousandStitches: `USD $${plist.pricePerThousandStitches.toFixed(3)}`
					};
				}
				return plist;
			});
		}
	};

	const handleInput = () => {};

	const heandleDelete = (finalData: PricelistsSubDocument) => {
		idToRemove = idToRemove.filter((list) => list !== finalData._id);
		pricelist.pricelists = pricelist.pricelists.filter((list) => list._id !== finalData._id);
		// deleteOption(finalData);
	};

	let idToRemove = [];

	$: heandleAddRow = () => {
		const id = uuidv4();

		isEditableID = id;
		idToRemove.push(id);
		pricelist.pricelists = [
			...pricelist.pricelists,
			{
				_id: id,
				embroideryType: selectedGroup,
				minimumPrice: 0.0,
				minimumQuantity: 0,
				pricePerThousandStitches: 0.0
			}
		];
	};

	const headleSubmit = async () => {
		try {
			pricelist.pricelists = pricelist.pricelists.map((pList) => {
				if (idToRemove.includes(pList._id)) {
					delete pList._id;
					idToRemove = idToRemove.filter((list) => list !== pList._id);
				}
				return {
					...pList,
					minimumPrice: parseFloat(pList.minimumPrice.replace('USD $', '')),
					pricePerThousandStitches: parseFloat(pList.pricePerThousandStitches.replace('USD $', ''))
				};
			});

			const res = await fetch('/api/pricelists.json', {
				method: 'PUT',
				body: JSON.stringify(pricelist),
				headers: { 'Content-Type': 'application/json' }
			});

			if (res.ok) {
				getPricelist();
				const newPricelist = await res.json();
				toasts.add({ message: `${newPricelist.name} was updated`, type: 'success' });
			}
		} catch (err) {
			logger.error(err.messages);
			toasts.add({
				message: 'An error has occured while updating',
				type: 'error'
			});
		}
	};
</script>

{#if pricelist}
	<div class="mb-2 bg-white p-4">
		<h1>Pricelist Details Edit</h1>
	</div>
	<form on:submit|preventDefault={headleSubmit}>
		<div class="space-y-4 bg-white p-2 shadow-lg">
			<div class="flex items-end justify-between">
				<div class="flex items-end space-x-6 ">
					<Input
						name="name"
						label="Name"
						bind:value={pricelist.name}
						onInput={handleInput}
						messages={result.getErrors('name')}
						validityClass={cn('name')}
					/>
					<Checkbox
						name="isActive"
						label="isActive"
						validityClass={cn('isActive')}
						bind:checked={pricelist.isActive}
					/>
					<Checkbox
						name="isDefault"
						label="isDefault"
						validityClass={cn('isDefault')}
						bind:checked={pricelist.isDefault}
					/>
				</div>
				<div>
					<input class="btn btn-primary" type="submit" value="Submit" />
				</div>
			</div>
			<!-- Table start -->
			<div class="w-full  ">
				<div>
					{#each [...groupList] as list, index (index)}
						<button
							on:click|preventDefault={() => (selectedGroup = list)}
							class="mx-1 mb-3 mt-2 justify-center rounded-full border border-transparent px-3 py-1 text-sm font-medium text-white {selectedGroup ===
							list
								? `btn-primary`
								: `btn-tertiary`}">{list}</button
						>
					{/each}
				</div>
				<div class=" block ">
					<table class="relative w-full rounded-lg text-left text-sm">
						<thead>
							<tr
								class=" sticky border border-b-0 border-pickled-bluewood-700 bg-pickled-bluewood-700 text-white"
							>
								{#each tableHeadings as header (header)}
									<th class="px-2 py-2">{header}</th>
								{/each}
							</tr>
						</thead>
						<tbody class="overflow-y-auto">
							{#each pricelist.pricelists as list (list._id)}
								{#if selectedGroup === list.embroideryType || selectedGroup === 'all'}
									<tr
										class="whitespace-no-wrap w-full border border-t-0 border-pickled-bluewood-300 font-normal odd:bg-pickled-bluewood-100 odd:text-pickled-bluewood-900 even:text-pickled-bluewood-900"
									>
										<td class="px-2 py-1">
											<input
												class="m-0 w-full border-none bg-transparent p-0 text-sm focus:border-transparent focus:ring-transparent"
												type="text"
												name="embroideryType"
												disabled={!(isEditableID === list._id)}
												bind:value={list.embroideryType}
											/>
										</td>
										<td class="px-2 py-1">
											<input
												class="m-0 w-full border-none bg-transparent p-0 text-sm focus:border-transparent focus:ring-transparent"
												type="text"
												name="minimumQuantity"
												disabled={!(isEditableID === list._id)}
												bind:value={list.minimumQuantity}
											/>
										</td>
										<td class="px-2 py-1">
											<input
												class="m-0 w-full border-none bg-transparent p-0 text-sm focus:border-transparent focus:ring-transparent"
												type="text"
												name="minimumPrice"
												disabled={!(isEditableID === list._id)}
												bind:value={list.minimumPrice}
											/>
										</td>
										<td class="px-2 py-1">
											<input
												class="m-0 w-full border-none bg-transparent p-0 text-sm focus:border-transparent focus:ring-transparent"
												type="text"
												name="pricePerThousandStitches"
												disabled={!(isEditableID === list._id)}
												bind:value={list.pricePerThousandStitches}
											/>
										</td>
										<td class="p-1 text-center ">
											<button
												class=" m-0 p-0"
												on:click|preventDefault={() => heandleEditable(list)}
											>
												<span class="fill-current text-pickled-bluewood-500">
													{@html isEditableID === list._id ? svgDocumentAdd : svgPencil}
												</span>
											</button>
										</td>

										<td class="p-1 text-center ">
											<button class=" m-0 p-0" on:click|preventDefault={() => heandleDelete(list)}>
												<span class="fill-current text-pickled-bluewood-500">{@html svgXSmall}</span
												>
											</button>
										</td>
									</tr>
								{/if}
							{/each}
							<tr
								class="whitespace-no-wrap w-full border border-t-0 border-pickled-bluewood-300 bg-royal-blue-300 font-normal text-white"
							>
								<td class="px-2 py-1">embroideryType</td>
								<td class="px-2 py-1">minimumPrice</td>
								<td class="px-2 py-1">minimumQuantity</td>
								<td class="px-2 py-1">pricePerThousandStitches</td>

								<td class="px-2 py-1" />
								<td class="p-1 text-center">
									<button class=" m-0 p-0" on:click|preventDefault={() => heandleAddRow()}
										><span class="flex fill-current text-white">{@html svgPlus} Add Row</span
										></button
									>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<pre class="text-xs text-royal-blue-900" />
			</div>
			<!-- Table End -->
		</div>
	</form>
{/if}

<style>
</style>
