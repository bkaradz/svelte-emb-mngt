<script lang="ts">
	import { svgCheck, svgSelector } from '$lib/utility/svgLogos';

	let selectedValue: string = 'Javascript';
	const changeSelection = (e) => {
		console.log('e.target.value', e.target.name);
		selectedValue = e.target.name;
		// selectedValue = selectedValue;
	};
	$: console.log('selectedValue', selectedValue);

	import {
		Listbox,
		ListboxButton,
		ListboxOptions,
		ListboxOption
	} from '@rgossiaux/svelte-headlessui';

	const people = [
		{ id: 1, name: 'Name', value: 'name', unavailable: false },
		{ id: 2, name: 'Organistion', unavailable: false },
		{ id: 3, name: 'Phone', unavailable: false },
		{ id: 4, name: 'Email', unavailable: false },
		{ id: 5, name: 'Vat Number', unavailable: false },
		{ id: 6, name: 'Balance Due', unavailable: false },
		{ id: 7, name: 'State', unavailable: false }
	];

	let selectedPerson = people[0];
	$: console.log('selectedPerson', selectedPerson);
</script>

<div class="min-h-screen bg-pickled-bluewood-100 p-10">
	<div class="mx-auto max-w-md">
		<label for="select" class="block py-2 font-semibold">Select Input:</label>

		<div class="relative">
			<div class="flex h-10 items-center rounded border border-pickled-bluewood-200 bg-white">
				<input
					bind:value={selectedValue}
					name="select"
					id="select"
					class="w-full appearance-none px-4 text-pickled-bluewood-800 outline-none"
					checked
				/>

				<!-- <button
					class="cursor-pointer text-pickled-bluewood-300 outline-none transition-all hover:text-pickled-bluewood-600 focus:outline-none"
				>
					<svg
						class="mx-2 h-4 w-4 fill-current"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</button> -->
				<label
					for="show_more"
					class="cursor-pointer border-l border-pickled-bluewood-200 text-pickled-bluewood-300 outline-none transition-all hover:text-pickled-bluewood-600 focus:outline-none"
				>
					{@html svgSelector}
				</label>
			</div>

			<input type="checkbox" name="show_more" id="show_more" class="peer hidden" checked />
			<div
				class="absolute mt-1 hidden w-full flex-col overflow-hidden rounded border border-pickled-bluewood-200 bg-white shadow peer-checked:flex"
			>
				<div class="group cursor-pointer">
					<!-- svelte-ignore a11y-missing-attribute -->
					<a
						on:click={changeSelection}
						name="Python"
						class="{selectedValue === 'Python'
							? 'border-royal-blue-600'
							: ''} block border-l-4 border-transparent p-2 group-hover:border-royal-blue-600 group-hover:bg-pickled-bluewood-100"
						>Python</a
					>
				</div>
				<div class="group cursor-pointer border-t border-pickled-bluewood-200">
					<!-- svelte-ignore a11y-missing-attribute -->
					<a
						on:click={changeSelection}
						name="Javascript"
						class="{selectedValue === 'Javascript'
							? 'border-royal-blue-600'
							: ''} border-blue-600 block border-l-4 border-transparent p-2 group-hover:border-royal-blue-600 group-hover:bg-pickled-bluewood-100"
						>Javascript</a
					>
				</div>
				<div class="group cursor-pointer border-t border-pickled-bluewood-200">
					<!-- svelte-ignore a11y-missing-attribute -->
					<a
						on:click={changeSelection}
						name="Node"
						class="{selectedValue === 'Node'
							? 'border-royal-blue-600'
							: ''} block border-l-4 border-transparent p-2 group-hover:border-royal-blue-600 group-hover:bg-pickled-bluewood-100"
						>Node</a
					>
				</div>
				<div class="group cursor-pointer border-t border-pickled-bluewood-200">
					<!-- svelte-ignore a11y-missing-attribute -->
					<a
						on:click={changeSelection}
						name="PHP"
						class="{selectedValue === 'PHP'
							? 'border-royal-blue-600'
							: ''} block border-l-4 border-transparent p-2 group-hover:border-royal-blue-600 group-hover:bg-pickled-bluewood-100"
						>PHP</a
					>
				</div>
			</div>
		</div>
	</div>
</div>

<div class=" w-[168px]">
	<Listbox class="" value={selectedPerson} on:change={(e) => (selectedPerson = e.detail)}>
		<ListboxButton
			class="focus-visible:ring-offset-orange-300 relative w-full cursor-default bg-white py-2 pl-3 pr-3 text-left shadow-md focus:outline-none focus-visible:border-royal-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm"
		>
			<span class="pointer-events-none absolute inset-y-0 left-0 flex items-center">
				{@html svgSelector}
			</span>
			<span class="ml-6 block truncate text-right text-xs">
				Search By {selectedPerson.name}
			</span>
		</ListboxButton>
		<ListboxOptions
			class="ring-black absolute mt-1 w-40 overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-opacity-5 focus:outline-none sm:text-sm"
		>
			{#each people as person (person.id)}
				<!-- Use the `active` state to conditionally style the active (focused) option -->
				<!-- Use the `selected` state to conditionally style the selected option -->
				<ListboxOption
					value={person}
					disabled={person.unavailable}
					class={({ active }) =>
						`cursor-default select-none relative py-2 pl-10 pr-4 ${
							active
								? 'text-pickled-bluewood-900 bg-pickled-bluewood-100'
								: 'text-pickled-bluewood-900'
						}`}
					let:selected
					let:active
				>
					<span class="absolute inset-y-0 left-0 flex items-center pl-3 text-pickled-bluewood-600">
						{#if selected}
							{@html svgCheck}
						{/if}
					</span>
					<span>
						{person.name}
					</span>
				</ListboxOption>
			{/each}
		</ListboxOptions>
	</Listbox>
</div>
