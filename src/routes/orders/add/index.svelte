<script lang="ts">
	import { goto } from '$app/navigation';
	import Combobox from '$lib/components/Combobox.svelte';
	import Input from '$lib/components/Input.svelte';
	import AddOrder from '$lib/components/orders/addOrder.svelte';
	import { svgArrow, svgDocumentAdd, svgPencil, svgPlus, svgXSmall } from '$lib/utility/svgLogos';

	let isEditableID;

	export let tableHeadings = [
		'Name',
		'ProductID',
		'Stitches',
		'Quantity',
		'Category',
		'Emb Type',
		'Emb Position',
		'Edit/Save',
		'Delete & Add Row'
	];

	let itemList = [];

	const gotoOrders = async () => {
		await goto(`/orders`);
	};
</script>

<AddOrder>
	<div slot="header">
		<div class="flex justify-between items-center">
			<div class="flex items-center">
				<button class="mr-3" on:click={gotoOrders}>
					{@html svgArrow}
				</button>
				<h1 class="text-slate-700 text-2xl font-medium">New Quotation</h1>
			</div>
			<div>
				<button class="bg-royal-blue-500  px-5 py-2 rounded text-white mr-4">Cancel</button>
				<button class="bg-royal-blue-500  px-5 py-2 rounded text-white" type="submit">Done</button>
			</div>
		</div>
	</div>
	<div class="flex flex-col m-4 bg-white" slot="page">
		<div class="grow-0 m-4">
			<div class="flex flex-row space-x-10">
				<div class="grow">
					<Combobox label="Customer" />
					<div class="flex p-4">
						<article class=" mr-24">
							<h4>Customer Details</h4>
							<p>
								Ap #121-8985 Phasellus Av. <br />
								P.O. Box 856, 6546 Eu Avenue <br />
								Ap #901-9426 At, St. <br />
								706-5115 Ultricies Street <br />
								P.O. Box 411, 2950 Nisi. Av.
							</p>
						</article>
						<article>
							<h4>Customer Address</h4>
							<p>
								Ap #121-8985 Phasellus Av. <br />
								P.O. Box 856, 6546 Eu Avenue <br />
								Ap #901-9426 At, St. <br />
								706-5115 Ultricies Street <br />
								P.O. Box 411, 2950 Nisi. Av.
							</p>
						</article>
					</div>
				</div>
				<div class="grow-0">
					<Combobox label="Quotation #" />
					<Input label="Date" />
					<Input label="Due Date" />
					<Combobox label="PriceList" />
				</div>
			</div>
		</div>
		<div class=" bg-active grow m-4">
			<table class="w-full rounded-lg text-left text-sm">
				<thead>
					<tr
						class="sticky border border-b-0 border-pickled-bluewood-700 bg-pickled-bluewood-700 text-white"
					>
						{#each tableHeadings as header (header)}
							<th class="px-2 py-2">{header}</th>
						{/each}
					</tr>
				</thead>
				<tbody class="vertical-scroll-wrapper">
					{#if itemList.length}
						{#each itemList as list (list._id)}
							<tr
								class="whitespace-no-wrap w-full border border-t-0 border-pickled-bluewood-300 font-normal odd:bg-pickled-bluewood-100 odd:text-pickled-bluewood-900 even:text-pickled-bluewood-900"
							>
								<td class="px-2 py-1">
									<input
										class="m-0 w-full border-none bg-transparent p-0 text-sm focus:border-transparent focus:ring-transparent"
										type="text"
										name="group"
										disabled={true}
										bind:value={list.group}
									/>
								</td>
								<td class="px-2 py-1">
									<input
										class="m-0 w-full border-none bg-transparent p-0 text-sm focus:border-transparent focus:ring-transparent"
										type="text"
										name="name"
										disabled={true}
										bind:value={list.name}
									/>
								</td>
								<td class="px-2 py-1">
									<input
										class="m-0 w-full border-none bg-transparent p-0 text-sm focus:border-transparent focus:ring-transparent"
										type="text"
										name="value"
										disabled={true}
										bind:value={list.value}
									/>
								</td>
								<td class="px-2 py-1">
									<input
										bind:checked={list.isActive}
										disabled={true}
										type="checkbox"
										name="isActive"
									/>
								</td>
								<td class="px-2 py-1">
									<input
										bind:checked={list.isDefault}
										disabled={true}
										type="checkbox"
										name="isDefault"
									/>
								</td>
								<td class="p-1 text-center ">
									<button class=" m-0 p-0" on:click|preventDefault={() => console.log('hi')}>
										<span class="fill-current text-pickled-bluewood-500">
											{@html isEditableID === list._id ? svgDocumentAdd : svgPencil}
										</span>
									</button>
								</td>
								<td class="p-1 text-center ">
									<button class=" m-0 p-0" on:click|preventDefault={() => console.log('hi')}>
										<span class="fill-current text-pickled-bluewood-500">{@html svgXSmall}</span>
									</button>
								</td>
							</tr>
						{/each}
					{/if}
					<tr
						class="whitespace-no-wrap w-full border border-t-0 border-pickled-bluewood-300 bg-royal-blue-300 font-normal text-white"
					>
						<td class="px-2 py-1">Group</td>
						<td class="px-2 py-1">Name</td>
						<td class="px-2 py-1">value</td>
						<td class="px-2 py-1">
							<input disabled type="checkbox" name="isActive" checked={false} />
						</td>
						<td class="px-2 py-1">
							<input disabled type="checkbox" name="isActive" checked={true} />
						</td>
						<td class="px-2 py-1" />
						<td class="p-1 text-center">
							<button class=" m-0 p-0" on:click|preventDefault={() => console.log('hi')}
								><span class="flex fill-current text-white">{@html svgPlus} Add Row</span></button
							>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</AddOrder>

<style lang="postcss">
</style>
