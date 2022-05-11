<script lang="ts">
	import type { OptionsDocument } from '$lib/models/options.models';
	import { svgLockClosed, svgPencil, svgPlus, svgXSmall } from '$lib/utility/svgLogos';
	import { v4 as uuidv4 } from 'uuid';

	export let tableHeadings = [
		'Group',
		'name',
		'value',
		'Active',
		'Default',
		'Edit/Save',
		'Delete & Add Row'
	];

	interface optionListInterface extends OptionsDocument {
		editable: boolean;
	}
	export let optionsList: Array<Partial<optionListInterface>> = [
		{
			userID: '6273d47f151da98833523d0a',
			group: 'embroideryPosition',
			isActive: true,
			isDefault: false,
			name: 'frontLeft',
			value: 'Front Left',
			_id: '6274ef3ccb27bd312215e3c8',
			createdAt: '2022-05-06T09:49:48.544Z',
			updatedAt: '2022-05-06T09:49:48.544Z',
			__v: 0
		},
		{
			userID: '6273d47f151da98833523d0b',
			group: 'embroideryPosition',
			isActive: true,
			isDefault: false,
			name: 'frontRight',
			value: 'Front Right',
			_id: '6274ef3ccb27bd312215e3c9',
			createdAt: '2022-05-06T09:49:48.544Z',
			updatedAt: '2022-05-06T09:49:48.544Z',
			__v: 0
		}
	];

	$: console.log('🚀 ~ file: OptionsTable.svelte ~ line 45 ~ optionsList', optionsList);

	let groupList;

	$: if (optionsList.length) {
		groupList = new Set(optionsList.map((list) => list.group));
		console.log('🚀 ~ file: OptionsTable.svelte ~ line 52 ~ groupList', groupList);
	}

	const heandleEditable = (id: any, editable: boolean) => {
		// console.log('Event', e.currentTarget);
		optionsList.forEach((list) => {
			if (list._id === id && editable === false) {
				list.editable = true;
			} else {
				list.editable = false;
			}
		});
		optionsList = optionsList;
	};

	$: heandleAddRow = () => {
		const id = uuidv4();
		optionsList = [
			...optionsList,
			{
				_id: id,
				group: 'Edit...',
				name: 'Edit...',
				value: 'Edit...',
				isActive: true,
				isDefault: false,
				editable: true
			}
		];
	};

	const heandleDelete = (id: any) => {
		optionsList = optionsList.filter((list) => list._id !== id);
	};

	const heandleInput = (e: any, id: any) => {
		console.log('id', id);
		console.log('input', e.target.innerText);
		console.log('name', e.target.id);
		optionsList = optionsList.map((list) =>
			list._id === id ? { ...list, [e.target.id]: e.target.innerText } : list
		);
	};
</script>

<!-- Table start -->
<div class="w-full bg-white p-2 shadow-lg">
	<div>
		{#each [...groupList] as list, index (index)}
			<button class="btn btn-tertiary mx-1 mb-3 mt-2 rounded-full px-3 py-1">{list}</button>
		{/each}
	</div>
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
				{#each optionsList as { _id, group, name, value, isActive, isDefault, editable = false } (_id)}
					<tr
						class="whitespace-no-wrap w-full border border-t-0 border-pickled-bluewood-300 font-normal odd:bg-pickled-bluewood-100 odd:text-pickled-bluewood-900 even:text-pickled-bluewood-900"
						on:dblclick={(e) => console.log(e.currentTarget)}
					>
						<!-- <td use:editableAction class="px-2 py-1" bind:innerHTML={group} /> -->
						<td
							id="group"
							contenteditable={editable}
							on:input={(e) => heandleInput(e, _id)}
							class="px-2 py-1"
						>
							{group}
						</td>
						<td
							id="name"
							contenteditable={editable}
							on:input={(e) => heandleInput(e, _id)}
							class="px-2 py-1"
						>
							{name}
						</td>
						<td
							id="value"
							contenteditable={editable}
							on:input={(e) => heandleInput(e, _id)}
							class="px-2 py-1">{value}</td
						>
						<td
							id="isActive"
							contenteditable={editable}
							on:input={(e) => heandleInput(e, _id)}
							class="px-2 py-1"
						>
							<input disabled type="checkbox" name="isActive" on:change={(e) => console.log(e)} />
						</td>
						<td
							id="isDefault"
							contenteditable={editable}
							on:input={(e) => heandleInput(e, _id)}
							class="px-2 py-1"
						>
							<input type="checkbox" name="isActive" bind:checked={isDefault} />
						</td>
						<td class="p-1 text-center ">
							<button class=" m-0 p-0" on:click={() => heandleEditable(_id, editable)}>
								<span class="fill-current text-pickled-bluewood-500">
									{@html editable ? svgLockClosed : svgPencil}
								</span>
							</button>
						</td>
						<td class="p-1 text-center ">
							<button class=" m-0 p-0" on:click={() => heandleDelete(_id)}>
								<span class="fill-current text-pickled-bluewood-500">{@html svgXSmall}</span>
							</button>
						</td>
					</tr>
				{/each}

				<tr
					class="whitespace-no-wrap w-full border border-t-0 border-pickled-bluewood-300 font-normal odd:bg-pickled-bluewood-100 odd:text-pickled-bluewood-900 even:text-pickled-bluewood-900"
				>
					<td class="px-2 py-1">Group</td>
					<td class="px-2 py-1">Name</td>
					<td class="px-2 py-1">value</td>
					<td class="px-2 py-1">
						<input type="checkbox" name="isActive" checked={true} />
					</td>
					<td class="px-2 py-1">
						<input type="checkbox" name="isActive" checked={true} />
					</td>
					<td class="px-2 py-1" />
					<td class="p-1 text-center ">
						<button class=" m-0 p-0" on:click={heandleAddRow()}
							><span class="fill-current text-pickled-bluewood-500">{@html svgPlus}</span></button
						>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<!-- Table End -->
<style>
</style>
