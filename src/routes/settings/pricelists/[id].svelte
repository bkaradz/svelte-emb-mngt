<script lang="ts">
	import { page } from '$app/stores';
	import suite from '$lib/validation/client/signUp.validate';
	import classnames from 'vest/classnames';
	import { onMount } from 'svelte';
	import logger from '$lib/utility/logger';
	import Input from '$lib/components/Input.svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import { svgXSmall } from '$lib/utility/svgLogos';

	let result = suite.get();

	export let tableHeadings = [
		'Embroidery Type',
		'Minimum Price',
		'Maximum Quantity',
		'Price per 1000 stitches',
		'Delete'
	];

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

	$: cn = classnames(result, {
		warning: 'warning',
		invalid: 'error',
		valid: 'success'
	});

	const handleInput = () => {};

	const heandleDelete = () => {};
</script>

{#if pricelist}
	<div class="mb-2 bg-white p-4">
		<h1>Pricelist Details</h1>
	</div>
	<form>
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
							{#each pricelist.pricelists as list (list._id)}
								<tr
									class="whitespace-no-wrap w-full border border-t-0 border-pickled-bluewood-300 font-normal odd:bg-pickled-bluewood-100 odd:text-pickled-bluewood-900 even:text-pickled-bluewood-900"
								>
									<td class="px-2 py-1">
										<input
											class="m-0 w-full border-none bg-transparent p-0 text-sm focus:border-transparent focus:ring-transparent"
											type="text"
											name="embroideryType"
											bind:value={list.embroideryType}
										/>
									</td>
									<td class="px-2 py-1">
										<input
											class="m-0 w-full border-none bg-transparent p-0 text-sm focus:border-transparent focus:ring-transparent"
											type="text"
											name="minimumPrice"
											bind:value={list.minimumPrice.$numberDecimal}
										/>
									</td>
									<td class="px-2 py-1">
										<input
											class="m-0 w-full border-none bg-transparent p-0 text-sm focus:border-transparent focus:ring-transparent"
											type="text"
											name="maximumQuantity"
											bind:value={list.maximumQuantity}
										/>
									</td>
									<td class="px-2 py-1">
										<input
											class="m-0 w-full border-none bg-transparent p-0 text-sm focus:border-transparent focus:ring-transparent"
											type="text"
											name="pricePerThousandStitches"
											bind:value={list.pricePerThousandStitches.$numberDecimal}
										/>
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
		</div>
	</form>
{/if}

<style>
</style>
