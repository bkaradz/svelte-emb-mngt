<script lang="ts">
	import { page } from '$app/stores';
	import {
		svgArrow,
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
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Loading from '$lib/components/Loading.svelte';
	import dayjs from 'dayjs';
	const endpoint = `/api/contacts/${$page.params.id}.json`;
	let contact = {
		name: 'Loading...',
		balanceDue: 0,
		totalReceipts: 0
	};
	// console.log($page.params);

	onMount(async () => {
		const res = await fetch(endpoint);
		if (res.ok) {
			const results = await res.json();
			contact = { ...contact, ...results.contact };
		}
		console.log('contact inside', contact);
	});

	let noOrdersPerPage = 10;
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
	// $: console.log(paginationCurrentValue);
	const gotoContacts = () => {
		goto(`/contacts`);
	};

	$: contact;
</script>

<div class="flex flex-1 flex-col overflow-hidden">
	<!-- Heading and Buttons -->
	<div class="main-header flex flex-row items-center justify-between">
		<div class="flex">
			<button class="mr-3" on:click={gotoContacts}>
				{@html svgArrow}
			</button>
			<h1 class="text-slate-700 text-2xl font-medium">Contacts</h1>
		</div>

		<button class="btn btn-primary inline-flex items-center justify-center px-3">
			<span>
				{@html svgPlus}
			</span>

			<span class="ml-2">Add Order</span>
		</button>
	</div>

	<div class="mt-4 flex h-full flex-col  xl:flex-row">
		<!-- Contact Card -->
		<div
			class="mr-4 flex w-full basis-1/4 flex-col border-t-4 border-royal-blue-500 bg-white shadow-lg"
		>
			<div class="flex items-center">
				<h4 class="p-4 text-lg font-medium text-pickled-bluewood-600">
					{contact.name}
				</h4>
			</div>
			<div
				class="mx-4 mb-4 flex items-center justify-evenly border border-royal-blue-100 bg-pickled-bluewood-50"
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
			<div
				class="mx-4 mb-4 flex flex-col items-start border border-royal-blue-100 bg-pickled-bluewood-50"
			>
				<div class="p-2">
					<p class="p-2 text-sm font-semibold text-pickled-bluewood-500">Company Details</p>
					<p class="p-2 text-sm text-pickled-bluewood-500">222 New Luveve Bulawayo</p>
				</div>
				<div class="p-2">
					<p class="p-2 text-sm font-semibold text-pickled-bluewood-500">Notes</p>
					<span class="p-2 text-lg font-bold text-pickled-bluewood-500" />
				</div>
			</div>
		</div>
		<!-- End Contact -->
		<div class="flex grow basis-3/4 flex-col">
			<!-- Search and Grid/List Bar -->
			<div class="z-10 flex h-14 w-full flex-row items-center justify-between  bg-white">
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
										bind:value={noOrdersPerPage}
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
			<!-- TODO use this for orders list -->
			<div class="mt-6 flex flex-1 flex-wrap gap-4 overflow-y-auto">
				<!-- Table start -->
				<div class="w-full bg-white py-6 shadow-lg">
					<div class="mx-6 mb-6">
						<button class="btn-outlined btn-tertiary mr-6 h-16 w-32 rounded">
							<span class="mr-[2px]">All</span><span
								class="rounded-full bg-pickled-bluewood-400 px-2 py-0 text-xs text-white">25</span
							>
							<p>$11 200.00</p>
						</button>
						<button class="btn-outlined btn-tertiary mr-6 h-16 w-32 rounded">
							<span class="mr-[2px]">Unpaid</span><span
								class="rounded-full bg-pickled-bluewood-400 px-2 py-0 text-xs text-white">25</span
							>
							<p>$11 200.00</p>
						</button>
						<button class="btn-outlined btn-tertiary mr-6 h-16 w-32 rounded">
							<span class="mr-[2px]">Paid</span><span
								class="rounded-full bg-pickled-bluewood-400 px-2 py-0 text-xs text-white">25</span
							>
							<p>$11 200.00</p>
						</button>
						<button class="btn-outlined btn-tertiary mr-6 h-16 w-32 rounded">
							<span class="mr-[2px]">Cancelled</span><span
								class="rounded-full bg-pickled-bluewood-400 px-2 py-0 text-xs text-white">25</span
							>
							<p>$11 200.00</p>
						</button>
					</div>
					<div class="mx-6 block overflow-y-auto">
						<table class="w-full rounded-lg text-left">
							<thead>
								<tr
									class="border border-b-0 border-pickled-bluewood-700 bg-pickled-bluewood-700 text-white"
								>
									<th class="px-4 py-2">#</th>
									<th class="px-4 py-2">Date</th>
									<th class="px-4 py-2">Order No</th>
									<th class="px-4 py-2">Customer</th>
									<th class="px-4 py-2">Amount</th>
									<th class="px-4 py-2">Outstanding</th>
									<th class="px-4 py-2">Due Date</th>
									<th class="px-4 py-2">State</th>
									<th class="px-4 py-2">View</th>
								</tr>
							</thead>
							<tbody>
								<tr
									class="whitespace-no-wrap w-full border border-b-0 border-pickled-bluewood-300 bg-pickled-bluewood-100 font-light text-pickled-bluewood-500"
								>
									<td class="px-4 py-2">1</td>
									<td class="px-4 py-2">{dayjs('2019-01-25').format('DD/MM/YYYY')}</td>
									<td class="px-4 py-2">000011</td>
									<td class="px-4 py-2">{contact.name}</td>
									<td class="px-4 py-2 text-right">$250.00</td>
									<td class="px-4 py-2 text-right">$10.00</td>

									<td class="px-4 py-2">{dayjs('2019-01-25').format('DD/MM/YYYY')}</td>
									<td class="px-4 py-2">
										<span class="rounded-full bg-success px-3 py-1 text-xs font-bold text-white"
											>Invoiced</span
										>
									</td>
									<td class="py-2 text-center">
										<a href="/"
											><span class="fill-current text-pickled-bluewood-500">{@html svgView}</span
											></a
										>
									</td>
								</tr>
								<tr
									class="whitespace-no-wrap w-full border border-pickled-bluewood-300 font-light text-pickled-bluewood-500"
								>
									<td class="px-4 py-2">2</td>
									<td class="px-4 py-2">{dayjs('2019-01-25').format('DD/MM/YYYY')}</td>
									<td class="px-4 py-2">000012</td>
									<td class="px-4 py-2">{contact.name}</td>
									<td class="px-4 py-2 text-right">$1200.00</td>
									<td class="px-4 py-2 text-right">$120.00</td>

									<td class="px-4 py-2">{dayjs('2019-01-25').format('DD/MM/YYYY')}</td>
									<td class="px-4 py-2">
										<span class="rounded-full bg-warning px-3 py-1 text-xs font-bold text-white"
											>Date Due</span
										>
									</td>
									<td class="py-2 text-center">
										<a href="/"
											><span class=" fill-current text-pickled-bluewood-500">{@html svgView}</span
											></a
										>
									</td>
								</tr>
								<tr
									class="whitespace-no-wrap w-full border border-pickled-bluewood-300 bg-pickled-bluewood-100 font-light text-pickled-bluewood-500"
								>
									<td class="px-4 py-2">3</td>
									<td class="px-4 py-2">{dayjs('2019-01-25').format('DD/MM/YYYY')}</td>
									<td class="px-4 py-2">000013</td>
									<td class="px-4 py-2">{contact.name}</td>
									<td class="px-4 py-2 text-right">$500.00</td>
									<td class="px-4 py-2 text-right">$0.00</td>

									<td class="px-4 py-2">{dayjs('2019-01-25').format('DD/MM/YYYY')}</td>
									<td class="px-4 py-2 ">
										<span class="rounded-full bg-danger px-3 py-1 text-xs font-bold text-white"
											>Paid</span
										>
									</td>
									<td class="py-2 text-center">
										<a href="/"
											><span class=" fill-current text-pickled-bluewood-500">{@html svgView}</span
											></a
										>
									</td>
								</tr>
								<tr
									class="whitespace-no-wrap w-full border border-pickled-bluewood-300 bg-pickled-bluewood-100 font-light text-pickled-bluewood-500"
								>
									<td class="px-4 py-2">3</td>
									<td class="px-4 py-2">{dayjs('2019-01-25').format('DD/MM/YYYY')}</td>
									<td class="px-4 py-2">000013</td>
									<td class="px-4 py-2">{contact.name}</td>
									<td class="px-4 py-2 text-right">$500.00</td>
									<td class="px-4 py-2 text-right">$0.00</td>

									<td class="px-4 py-2">{dayjs('2019-01-25').format('DD/MM/YYYY')}</td>
									<td class="px-4 py-2 ">
										<span class="rounded-full bg-danger px-3 py-1 text-xs font-bold text-white"
											>Overdue</span
										>
									</td>
									<td class="py-2 text-center">
										<a href="/"
											><span class=" fill-current text-pickled-bluewood-500">{@html svgView}</span
											></a
										>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<!-- Table End -->
			</div>
		</div>
	</div>
</div>
