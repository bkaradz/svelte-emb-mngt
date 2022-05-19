<script lang="ts">
	import type { OptionsDocument } from '$lib/models/options.models';
	import { toasts } from '$lib/stores/toasts.store';
	import logger from '$lib/utility/logger';
	import { svgLockClosed, svgPencil, svgPlus, svgXSmall } from '$lib/utility/svgLogos';
	import { onMount } from 'svelte';
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
	let optionsList: Array<Partial<optionListInterface>> = [];
	console.log('🚀 ~ file: OptionsTable.svelte ~ line 23 ~ optionsList', optionsList);

	let groupList;

	$: groupList;

	$: if (optionsList.length) {
		groupList = new Set(optionsList.map((list) => list.group));
	} else {
		groupList = [];
	}

	const handleSubmit = async (option) => {
		try {
			const res = await fetch('/api/options.json', {
				method: 'POST',
				body: JSON.stringify(option),
				headers: { 'Content-Type': 'application/json' }
			});

			if (res.ok) {
				// const data = await res.json();
				toasts.add({ message: 'The Option was added', type: 'success' });
			}
		} catch (err) {
			logger.error(err.messages);
			toasts.add({ message: 'An error has occured while adding the contact', type: 'error' });
		}
	};

	const heandleEditable = (id: any, editable: boolean) => {
		optionsList.forEach((list) => {
			if (list._id === id && editable === true) {
				/**
				 * TODO: Add fetch POST logic
				 */
			}
			if (list._id === id && editable === false) {
				list.editable = true;
			} else {
				list.editable = false;
			}
		});
		optionsList = optionsList;
	};

	let idToRemove = [];

	$: heandleAddRow = () => {
		const id = uuidv4();
		idToRemove.push(id);
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
		idToRemove = idToRemove.filter((list) => list !== id);
		/**
		 * TODO: Add fetch DELETE logic
		 */
	};

	const getOptions = async () => {
		try {
			// let searchParams = new URLSearchParams(paramsObj);
			const res = await fetch('/api/options.json?');
			optionsList = await res.json();
		} catch (err) {
			logger.error(err.message);
			// error = err.message;
		}
	};

	onMount(() => {
		getOptions();
	});
</script>

{#if optionsList.length}
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
					{#each optionsList as list (list._id)}
						<tr
							class="whitespace-no-wrap w-full border border-t-0 border-pickled-bluewood-300 font-normal odd:bg-pickled-bluewood-100 odd:text-pickled-bluewood-900 even:text-pickled-bluewood-900"
						>
							<td class="px-2 py-1">
								<input
									class="m-0 w-full border-none bg-transparent p-0 text-sm focus:border-transparent focus:ring-transparent"
									type="text"
									name="group"
									disabled={!list.editable}
									bind:value={list.group}
								/>
							</td>
							<td class="px-2 py-1">
								<input
									class="m-0 w-full border-none bg-transparent p-0 text-sm focus:border-transparent focus:ring-transparent"
									type="text"
									name="name"
									disabled={!list.editable}
									bind:value={list.name}
								/>
							</td>
							<td class="px-2 py-1">
								<input
									class="m-0 w-full border-none bg-transparent p-0 text-sm focus:border-transparent focus:ring-transparent"
									type="text"
									name="value"
									disabled={!list.editable}
									bind:value={list.value}
								/>
							</td>
							<td class="px-2 py-1">
								<input
									bind:checked={list.isActive}
									disabled={!list.editable}
									type="checkbox"
									name="isActive"
								/>
							</td>
							<td class="px-2 py-1">
								<input
									bind:checked={list.isDefault}
									disabled={!list.editable}
									type="checkbox"
									name="isDefault"
								/>
							</td>
							<td class="p-1 text-center ">
								<button class=" m-0 p-0" on:click={() => heandleEditable(list._id, list.editable)}>
									<span class="fill-current text-pickled-bluewood-500">
										{@html list.editable ? svgLockClosed : svgPencil}
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

					<tr
						class="whitespace-no-wrap w-full border border-t-0 border-pickled-bluewood-300 font-normal odd:bg-pickled-bluewood-100 odd:text-pickled-bluewood-900 even:text-pickled-bluewood-900"
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
						<td class="p-1 text-center ">
							<button class=" m-0 p-0" on:click={heandleAddRow()}
								><span class="fill-current text-pickled-bluewood-500">{@html svgPlus}</span></button
							>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<pre class="text-xs text-royal-blue-900">
{JSON.stringify(optionsList, null, 1)}
</pre>
	</div>

	<!-- Table End -->
{/if}

<style>
</style>
