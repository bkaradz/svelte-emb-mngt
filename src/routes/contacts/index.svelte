<script lang="ts">
	import {
		svgChevronLeft,
		svgChevronRight,
		svgGrid,
		svgList,
		svgPlus,
		svgSearch,
		svgSelector,
		svgSort,
		svgView
	} from '$lib/utility/svgLogos';
	import { contactsList } from '$lib/stores/contactsTempList';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import dayjs from 'dayjs';

	interface ContentIterface {
		results: [
			{
				name: string;
				isCorporate: boolean;
				notes: string;
				vatOrBpNo: string;
				email: string;
				phone: string;
				address: string;
				balanceDue: number;
				totalReceipts: number;
				isActive: boolean;
			}
		];
		totalRecords: number;
		totalPages: number;
		limit: number;
		previous: { page: number; limit: number };
		current: { page: number; limit: number };
		next: { page: number; limit: number };
	}

	let contacts: ContentIterface;
	let error: any;
	let limit = 20;

	const checkValue = () => {
		if (limit < 1) {
			limit = 1;
		}
	};

	const getContacts = async (values?: object) => {
		try {
			let paramsObj = {
				limit,
				page: 1,
				sort: 'name',
				...values
			};
			let searchParams = new URLSearchParams(paramsObj);
			const res = await fetch('/api/contacts.json?' + searchParams.toString());
			contacts = await res.json();
		} catch (err) {
			error = error.message;
		}
	};

	onMount(() => {
		getContacts();
	});

	const viewContact = (id: string) => {
		goto(`/contacts/${id}`);
	};

	const gotoAddContact = () => {
		goto(`/contacts/add`);
	};

	let gridView = false;
	$: console.log('gridView', gridView);
</script>

<svelte:head>
	<title>Contacts</title>
</svelte:head>

{#if error}
	<h2>Error while loading the data</h2>
{:else if contacts}
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

					<span class="ml-2">Add Contact</span>
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
									<span class="mr-2 text-xs text-pickled-bluewood-500"
										>Page {contacts.current.page} of {contacts.totalPages}({contacts.totalRecords} items)</span
									>
									<label class="mr-2 text-xs  text-pickled-bluewood-500" for="limit">Display</label>
									<input
										class="input w-16 border"
										type="number"
										name="limit"
										id="limit"
										bind:value={limit}
										on:change={getContacts({ ...contacts.current, limit })}
										on:input={checkValue}
									/>

									<label class="mx-2 text-xs text-pickled-bluewood-500" for="limit">per page</label>
								</div>
							</li>
							<li>
								<button
									disabled={!contacts.previous}
									on:click|preventDefault={(e) => getContacts(contacts.previous)}
									class="{!contacts.previous
										? 'hidden'
										: ''} btn border border-r-0 border-pickled-bluewood-300 bg-white px-4 text-pickled-bluewood-500 hover:bg-pickled-bluewood-200 disabled:bg-pickled-bluewood-200"
									>{@html svgChevronLeft}</button
								>
							</li>
							<li>
								<button
									disabled={!contacts.previous}
									on:click|preventDefault={(e) => getContacts(contacts.previous)}
									class="{!contacts.previous
										? 'hidden'
										: ''} btn border border-r-0 border-pickled-bluewood-300 bg-white px-4 text-pickled-bluewood-500 hover:bg-pickled-bluewood-200 disabled:bg-pickled-bluewood-200"
									>{!contacts.previous ? '' : contacts.previous.page}</button
								>
							</li>
							<li>
								<button
									disabled
									class="btn border border-pickled-bluewood-600  bg-pickled-bluewood-600 px-4 text-pickled-bluewood-100  disabled:bg-pickled-bluewood-600"
									>{contacts.current.page}</button
								>
							</li>
							<li>
								<button
									disabled={!contacts.next}
									on:click|preventDefault={(e) => getContacts(contacts.next)}
									class="{!contacts.next
										? 'hidden'
										: ''} btn border border-l-0 border-pickled-bluewood-300 bg-white px-4 text-pickled-bluewood-500 hover:bg-pickled-bluewood-200 disabled:bg-pickled-bluewood-200"
									>{!contacts.next ? '' : contacts.next.page}</button
								>
							</li>
							<li>
								<button
									disabled={!contacts.next}
									on:click|preventDefault={(e) => getContacts(contacts.next)}
									class=" {!contacts.next
										? 'hidden'
										: ''} btn border border-l-0 border-pickled-bluewood-300 bg-white px-4 text-pickled-bluewood-500 hover:bg-pickled-bluewood-200 disabled:bg-pickled-bluewood-200"
									>{@html svgChevronRight}</button
								>
							</li>
						</ul>
					</div>
					<!-- List and Grid Buttons -->
					<button
						on:click={(e) => (gridView = true)}
						class="{gridView ? 'btn-primary' : 'bg-pickled-bluewood-600'} btn btn-md mr-4 p-0"
					>
						{@html svgGrid}
					</button>
					<button
						on:click={(e) => (gridView = false)}
						class="{!gridView ? 'btn-primary' : 'bg-pickled-bluewood-600'} btn btn-md mr-6 p-0"
					>
						{@html svgList}
					</button>
				</div>
			</div>
		</div>
		<!-- List of Contacts -->
		<!-- TODO: fix overflow in list View so that the header is not hidden -->
		<div class="mt-6 flex flex-1 flex-wrap gap-4 overflow-y-auto">
			{#if gridView}
				{#each contacts.results as contact (contact._id)}
					<div
						on:click|preventDefault={(e) => viewContact(contact._id)}
						class=" flex h-44 w-full max-w-xs grow flex-col border-t-4 border-royal-blue-500 bg-white shadow-lg hover:cursor-pointer hover:bg-pickled-bluewood-100 lg:w-1/6"
					>
						<div class="flex h-full items-center">
							<h4 class="p-4 text-base font-medium text-pickled-bluewood-600 truncate">
								{contact.name}
							</h4>
						</div>
						<div
							class="mx-4 mb-4 flex h-full items-center justify-evenly border  border-royal-blue-100 bg-pickled-bluewood-50"
						>
							<div class="p-1">
								<p class="p-1 text-xs font-semibold text-pickled-bluewood-500">BALANCE DUE</p>
								<span class="p-1 text-base font-bold text-pickled-bluewood-500">
									${contact.balanceDue}
								</span>
							</div>
							<div class="p-1">
								<p class="p-1 text-xs font-semibold text-pickled-bluewood-500">TOTAL INVOICED</p>
								<span class="p-1 text-base font-bold text-pickled-bluewood-500">
									${contact.totalReceipts}
								</span>
							</div>
						</div>
					</div>
				{/each}
			{:else}
				<!-- TODO: use this for orders list -->
				<div class=" flex flex-1 flex-wrap gap-4">
					<!-- Table start -->
					<div class="w-full bg-white py-6 shadow-lg">
						<div class="mx-6 block ">
							<table class="relative w-full rounded-lg text-left">
								<thead>
									<tr
										class=" sticky border border-b-0 border-pickled-bluewood-700 bg-pickled-bluewood-700 text-white"
									>
										<th class="px-4 py-2">Customer</th>
										<th class="px-4 py-2">Organization</th>
										<th class="px-4 py-2">Phone</th>
										<th class="px-4 py-2">Email</th>
										<th class="px-4 py-2">Corparate</th>
										<th class="px-4 py-2">VatNo</th>
										<th class="px-4 py-2">Balance Due</th>
										<th class="px-4 py-2">Total Receipts</th>
										<th class="px-4 py-2">State</th>
										<th class="px-4 py-2">View</th>
									</tr>
								</thead>
								<tbody class="overflow-y-auto">
									{#each contacts.results as contact (contact._id)}
										<tr
											class="whitespace-no-wrap w-full border border-t-0 border-pickled-bluewood-300 odd:bg-pickled-bluewood-100 even:text-pickled-bluewood-500 font-light odd:text-pickled-bluewood-500"
										>
											<td class="px-4 py-2">{contact.name}</td>
											<td class="px-4 py-2">Organization</td>
											<td class="px-4 py-2">{contact.phone}</td>
											<td class="px-4 py-2">{!contact.email ? '...' : contact.email}</td>

											<td class="px-4 py-2">{contact.isCorporate}</td>
											<td class="px-4 py-2">
												{!contact.vatOrBpNo ? '...' : contact.vatOrBpNo}
											</td>
											<td class="px-4 py-2 text-right">${contact.balanceDue}</td>
											<td class="px-4 py-2 text-right">${contact.totalReceipts}</td>
											<td class="px-4 py-2">
												<span class="rounded-full bg-success px-3 py-1 text-xs font-bold text-white"
													>Invoiced</span
												>
											</td>
											<td class="py-2 text-center">
												<button on:click={(e) => goto(`/contacts/${contact._id}`)}
													><span class="fill-current text-pickled-bluewood-500"
														>{@html svgView}</span
													></button
												>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
					<!-- Table End -->
				</div>
			{/if}
		</div>
	</div>
{:else}
	<h2>Loading....</h2>
{/if}
