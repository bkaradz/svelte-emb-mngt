<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load = async ({ fetch }) => {
		let paramsObj = {
			limit: 15,
			page: 1
		};
		let searchParams = new URLSearchParams(paramsObj);
		const res = await fetch('/api/contacts.json?' + searchParams.toString());
		if (res.ok) {
			const contacts = await res.json();
			console.log('contacts line 13', { ...contacts });
			return {
				props: { ...contacts }
			};
		}
		const { message } = await res.json();
		return {
			props: { error: new Error(message) }
		};
	};
</script>

<script lang="ts">
	import {
		svgChevronLeft,
		svgChevronRight,
		svgGrid,
		svgList,
		svgPlus,
		svgSearch,
		svgSelector,
		svgSort
	} from '$lib/utility/svgLogos';
	import { contactsList } from '$lib/stores/contactsTempList';
	import { goto } from '$app/navigation';
	export let results;

	// $: console.log('contacts front', results);

	let noContactsPerPage = 10;
	let paginationCurrentValue = 2;
	const PAGINATION_LAST_VALUE = 20; // To be replace by the value from the database
	$: disableLeft = paginationCurrentValue <= 2 ? true : false;
	$: disableRight = paginationCurrentValue >= PAGINATION_LAST_VALUE ? true : false;

	$: minusPagination = () => {
		if (paginationCurrentValue > 2) {
			paginationCurrentValue -= 1;
		}
	};
	$: plusPagination = () => {
		if (paginationCurrentValue < PAGINATION_LAST_VALUE) {
			paginationCurrentValue += 1;
		}
	};
	const viewContact = (id: string) => {
		goto(`/contacts/${id}`);
	};

	const gotoAddContact = () => {
		goto(`/contacts/add`);
	};
</script>

<svelte:head>
	<title>Contacts</title>
</svelte:head>

<div class="flex flex-1  flex-col overflow-hidden">
	<div>
		<!-- Heading and Buttons Bar -->
		<div class="main-header flex flex-row items-center justify-between">
			<h1 class="text-slate-700 text-2xl font-medium">Contacts</h1>

			<button
				on:click={gotoAddContact}
				class="btn btn-primary inline-flex items-center justify-center px-3"
			>
				<span>
					{@html svgPlus}
				</span>

				<span class="ml-2">Add New</span>
			</button>
		</div>

		<!-- Search and View Bar -->
		<div class="z-10 mt-4 flex h-14 w-full flex-row items-center justify-between bg-white">
			<div>
				<div class="relative flex flex-row items-center text-left">
					<div>
						<button
							class="btn focus:ring-royal-royal-royal-blue-500 inline-flex w-full items-center justify-center px-2 py-2 text-sm text-pickled-bluewood-500 hover:bg-pickled-bluewood-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-pickled-bluewood-100"
							id="menu-button"
							aria-expanded="true"
							aria-haspopup="true"
						>
							<span>
								{@html svgSort}
							</span>

							Sort by Name
							<span>
								{@html svgSelector}
							</span>
						</button>

						<div
							class="ring-black absolute left-0 top-9 z-10 mt-2 hidden w-56 origin-top-right divide-y divide-pickled-bluewood-100 rounded-md bg-white shadow-lg ring-1 ring-opacity-5 focus:outline-none"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="menu-button"
							tabindex="-1"
						>
							<div class="py-1" role="none">
								<a
									href="/"
									class="block px-4 py-2 text-sm text-pickled-bluewood-700"
									role="menuitem"
									tabindex="-1"
									id="menu-item-0">Edit</a
								>
								<a
									href="/"
									class="block px-4 py-2 text-sm text-pickled-bluewood-700"
									role="menuitem"
									tabindex="-1"
									id="menu-item-1">Duplicate</a
								>
							</div>
							<div class="py-1" role="none">
								<a
									href="/"
									class="block px-4 py-2 text-sm text-pickled-bluewood-700"
									role="menuitem"
									tabindex="-1"
									id="menu-item-2">Archive</a
								>
								<a
									href="/"
									class="block px-4 py-2 text-sm text-pickled-bluewood-700"
									role="menuitem"
									tabindex="-1"
									id="menu-item-3">Move</a
								>
							</div>
							<div class="py-1" role="none">
								<a
									href="/"
									class="block px-4 py-2 text-sm text-pickled-bluewood-700"
									role="menuitem"
									tabindex="-1"
									id="menu-item-4">Share</a
								>
								<a
									href="/"
									class="block px-4 py-2 text-sm text-pickled-bluewood-700"
									role="menuitem"
									tabindex="-1"
									id="menu-item-5">Add to favorites</a
								>
							</div>
							<div class="py-1" role="none">
								<a
									href="/"
									class="block px-4 py-2 text-sm text-pickled-bluewood-700"
									role="menuitem"
									tabindex="-1"
									id="menu-item-6">Delete</a
								>
							</div>
						</div>
					</div>

					<div class="relative text-pickled-bluewood-100">
						<input
							class="input focus:shadow-outline h-10 w-full pl-8 pr-3 text-base placeholder-pickled-bluewood-400"
							type="text"
							placeholder="Search..."
						/>
						<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2">
							{@html svgSearch}
						</div>
					</div>
				</div>
				<div />
			</div>
			<!-- Veiw list Buttons -->
			<div class="flex flex-row items-center ">
				<div class="container mx-auto mr-4 flex justify-center">
					<ul class="flex">
						<li>
							<div class="inline-flex items-center">
								<label class="mr-4 text-sm  text-pickled-bluewood-500" for="noContactsPerPage"
									>No of Contacts</label
								>
								<input
									class="input w-16 border-r-0"
									type="number"
									name="noContactsPerPage"
									id="noContactsPerPage"
									bind:value={noContactsPerPage}
								/>
							</div>
						</li>
						<li>
							<button
								disabled={disableLeft}
								on:click={minusPagination}
								class="btn border border-r-0 border-pickled-bluewood-300 bg-white px-4 text-pickled-bluewood-500 hover:bg-pickled-bluewood-200 disabled:bg-pickled-bluewood-200"
								>{@html svgChevronLeft}</button
							>
						</li>
						<li>
							<button
								disabled={disableLeft}
								on:click={minusPagination}
								class="btn border border-r-0 border-pickled-bluewood-300 bg-white px-4 text-pickled-bluewood-500 hover:bg-pickled-bluewood-200 disabled:bg-pickled-bluewood-200"
								>{paginationCurrentValue - 1}</button
							>
						</li>
						<li>
							<button
								class="btn border border-pickled-bluewood-600  bg-pickled-bluewood-600 px-4 text-pickled-bluewood-100 hover:bg-pickled-bluewood-200 hover:text-pickled-bluewood-600 disabled:bg-pickled-bluewood-200"
								>{paginationCurrentValue}</button
							>
						</li>
						<li>
							<button
								disabled={disableRight}
								on:click={plusPagination}
								class="btn border border-l-0 border-pickled-bluewood-300 bg-white px-4 text-pickled-bluewood-500 hover:bg-pickled-bluewood-200 disabled:bg-pickled-bluewood-200"
								>{paginationCurrentValue + 1}</button
							>
						</li>
						<li>
							<button
								disabled={disableRight}
								on:click={plusPagination}
								class="btn border border-l-0 border-pickled-bluewood-300 bg-white px-4 text-pickled-bluewood-500 hover:bg-pickled-bluewood-200 disabled:bg-pickled-bluewood-200"
								>{@html svgChevronRight}</button
							>
						</li>
					</ul>
				</div>
				<button class="btn btn-primary btn-md mr-4 p-0">
					{@html svgGrid}
				</button>
				<button class="btn btn-primary btn-md mr-6 p-0">
					{@html svgList}
				</button>
			</div>
		</div>
	</div>
	<!-- List of Contacts -->
	<div class="mt-6 flex flex-1 flex-wrap gap-4 overflow-y-auto">
		{#each results as contact (contact._id)}
			<div
				on:click={viewContact(contact._id)}
				class=" flex h-44 w-full max-w-xs grow flex-col border-t-4 border-royal-blue-500 bg-white shadow-lg hover:cursor-pointer hover:bg-royal-blue-200 lg:w-1/6"
			>
				<div class="flex h-full items-center">
					<h4 class="p-4 text-lg font-medium text-pickled-bluewood-600">{contact.name}</h4>
				</div>
				<div
					class="mx-4 mb-4 flex h-full items-center justify-evenly border  border-royal-blue-100"
				>
					<div class="p-2">
						<p class="p-2 text-xs font-semibold text-pickled-bluewood-500">BALANCE DUE</p>
						<span class="p-2 text-lg font-bold text-pickled-bluewood-500">
							${contact.balanceDue}
						</span>
					</div>
					<div class="p-2">
						<p class="p-2 text-xs font-semibold text-pickled-bluewood-500 ">TOTAL INVOICED</p>
						<span class="p-2 text-lg font-bold text-pickled-bluewood-500">
							${contact.totalReceipts}
						</span>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
