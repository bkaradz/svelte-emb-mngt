<script lang="ts">
	import { svgCheck, svgSelector } from '$lib/utility/svgLogos';
	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption
	} from '@rgossiaux/svelte-headlessui';

	const searchValues = [
		{ id: 1, name: 'Name', value: 'name', unavailable: false },
		{ id: 2, name: 'Organistion', unavailable: false },
		{ id: 3, name: 'Phone', unavailable: false },
		{ id: 4, name: 'Email', unavailable: false },
		{ id: 5, name: 'Vat Number', unavailable: false },
		{ id: 6, name: 'Balance Due', unavailable: false },
		{ id: 7, name: 'State', unavailable: false }
	];

	let selectedSearchValue = searchValues[0];
</script>

<div class="z-10 mt-4 flex h-14 w-full flex-row items-center justify-between bg-white">
	<div class=" w-[160px]">
		<Listbox
			value={selectedSearchValue}
			on:change={(e) => {
				selectedSearchValue = e.detail;
			}}
		>
			<ListboxButton
				class="focus-visible:ring-offset-orange-300 relative w-full cursor-default bg-white py-1 text-left shadow-md focus:outline-none focus-visible:border-royal-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm"
			>
				<span class="pointer-events-none absolute inset-y-0 left-0 flex items-center">
					{@html svgSelector}
				</span>
				<span class="ml-6 block truncate text-right text-xs">
					Search By {selectedSearchValue.name}
				</span>
			</ListboxButton>
			<ListboxOptions
				class="ring-black absolute mt-1 w-40 overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-opacity-5 focus:outline-none sm:text-sm"
			>
				{#each searchValues as searchValue (searchValue.id)}
					<!-- Use the `active` state to conditionally style the active (focused) option -->
					<!-- Use the `selected` state to conditionally style the selected option -->
					<ListboxOption
						value={searchValue}
						disabled={searchValue.unavailable}
						class={({ active }) =>
							`cursor-default select-none relative py-2 pl-10 pr-4 ${
								active
									? 'text-pickled-bluewood-900 bg-pickled-bluewood-100'
									: 'text-pickled-bluewood-900'
							}`}
						let:selected
						let:active
					>
						<span
							class="absolute inset-y-0 left-0 flex items-center pl-3 text-pickled-bluewood-600"
						>
							{#if selected}
								{@html svgCheck}
							{/if}
						</span>
						<span class=" text-sm">
							{searchValue.name}
						</span>
					</ListboxOption>
				{/each}
			</ListboxOptions>
		</Listbox>
	</div>
</div>
