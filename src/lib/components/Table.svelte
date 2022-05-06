<script lang="ts">
	export let itemList: Array<T> = [];
	let headerList: string[];

	if (itemList.length > 0) {
		headerList = Object.keys(itemList[0]);
	}
	// [
	// 	{
	// 		userID: '6273d47f151da98833523d0a',
	// 		group: 'embroideryPosition',
	// 		isActive: true,
	// 		isDefault: true,
	// 		name: 'frontLeft',
	// 		value: 'Front Left',
	// 		_id: '6274ef3ccb27bd312215e3c8',
	// 		createdAt: '2022-05-06T09:49:48.544Z',
	// 		updatedAt: '2022-05-06T09:49:48.544Z',
	// 		__v: 0
	// 	}
	// ];
</script>

<!-- Table start -->
<div class="w-full bg-white py-6 shadow-lg">
	<div class="mx-6 block ">
		<table class="relative w-full rounded-lg text-left text-sm">
			<thead>
				<tr
					class=" sticky border border-b-0 border-pickled-bluewood-700 bg-pickled-bluewood-700 text-white"
				>
					{#each headerList as header (header.id)}
						<th on:click={(e) => console.log(header)} class="px-2 py-2">{header.name}</th>
					{/each}
				</tr>
			</thead>
			<tbody class="overflow-y-auto">
				{#each itemList as list (list._id)}
					<tr
						class="whitespace-no-wrap w-full border border-t-0 border-pickled-bluewood-300 font-normal odd:bg-pickled-bluewood-100 odd:text-pickled-bluewood-900 even:text-pickled-bluewood-900"
					>
						<td class="px-2 py-1">{list.name}</td>
						<td class="px-2 py-1"
							>{list?.organizationID[0]?.name ? list?.organizationID[0]?.name : '...'}</td
						>
						<td class="px-2 py-1">{list.phone}</td>
						<td class="px-2 py-1">{!list.email ? '...' : list.email}</td>

						<td class="px-2 py-1">
							<input disabled type="checkbox" name="" id="" bind:checked={list.isCorporate} />
						</td>
						<td class="px-2 py-1">
							{!list.vatOrBpNo ? '...' : list.vatOrBpNo}
						</td>
						<td class="px-2 py-1 text-right">${list.balanceDue}</td>
						<td class="px-2 py-1 text-right">${list.totalReceipts}</td>
						<td class="flex items-center justify-end px-2 py-1">
							<span class="rounded-full bg-success px-3 py-1 text-xs font-bold text-white"
								>Invoiced</span
							>
						</td>
						<td class="p-1 text-center ">
							<button class=" m-0 p-0" on:click={async (e) => await goto(`/contacts/${list._id}`)}
								><span class="fill-current text-pickled-bluewood-500">{@html svgView}</span></button
							>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<!-- Table End -->
<style>
</style>
