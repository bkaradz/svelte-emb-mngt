<script lang="ts">
	import { onMount } from 'svelte';
	import { clickOutside } from '$lib/utility/clickOutside';
	import suite from '$lib/validation/client/signUp.validate';
	import logger from '$lib/utility/logger';
	import {
		svgAddUser,
		svgArrow,
		svgPlus,
		svgSelector,
		svgUpload,
		svgX,
		svgXSmall
	} from '$lib/utility/svgLogos';
	import classnames from 'vest/classnames';
	import { goto } from '$app/navigation';
	import Loading from '$lib/components/Loading.svelte';
	import { toasts } from '$lib/stores/toasts.store';
	import type { ContactsDocument } from '$lib/models/contacts.model';
	import type { metaDataInterface } from '$lib/services/aggregateQuery.services';

	let result = suite.get();

	let error: string | undefined = undefined; // TODO: Impliment Alert Notification

	interface contactsInterface extends metaDataInterface {
		results: Omit<ContactsDocument, 'createdAt' | 'updatedAt' | 'password' | 'userRole'>[];
	}

	interface corporateQueryParamsInterface {
		limit: number;
		page: number;
		sort: string;
		isCorporate: boolean;
		name?: string;
	}

	let corporateSearch: Partial<ContactsDocument> = { name: null };

	let showList = false;
	let selected = -1;

	function handleShowList() {
		if (showList) {
			showList = false;
		}
	}

	let defaultCorporateQueryParams: Partial<corporateQueryParamsInterface> = {
		limit: 10,
		page: 1,
		sort: 'name',
		isCorporate: true
	};
	let currentCorporateQueryParams = defaultCorporateQueryParams;
	let contacts: contactsInterface;

	onMount(() => {
		getCorporateContacts(currentCorporateQueryParams);
	});

	const getCorporateContacts = async (paramsObj: Partial<corporateQueryParamsInterface>) => {
		try {
			let searchParams = new URLSearchParams(paramsObj);

			const res = await fetch('/api/contacts.json?' + searchParams.toString());
			contacts = await res.json();
		} catch (err) {
			logger.error(err.message);
			toasts.add({
				message: 'An error has occured while getting corporate contacts',
				type: 'danger'
			});
			error = err.message;
		}
	};

	const heandleReset = () => {
		currentCorporateQueryParams = defaultCorporateQueryParams;
		getCorporateContacts(currentCorporateQueryParams);
		corporateSearch = { name: null };
		formData.organizationID = null;
		highlightIndex = -1;
	};

	let highlightIndex = -1;

	async function handleKeyDown(e) {
		const listLenght = contacts.results.length;
		switch (e.key) {
			case 'Escape':
				showList = false;
				break;
			case 'Enter':
				corporateSearch = contacts.results[highlightIndex];
				formData.organizationID = corporateSearch;
				handleShowList();
				break;
			case 'ArrowUp':
				highlightIndex <= 0 ? (highlightIndex = 0) : (highlightIndex -= 1);
				break;
			case 'ArrowDown':
				highlightIndex === listLenght - 1
					? (highlightIndex = listLenght - 1)
					: (highlightIndex += 1);
				break;
		}
	}

	interface formDataType {
		name: string;
		organizationID?: Partial<ContactsDocument>;
		isCorporate: boolean;
		email: string;
		phone: string;
		address: string;
	}

	let formData: formDataType = {
		isCorporate: false,
		organizationID: corporateSearch,
		name: '',
		email: '',
		phone: '',
		address: ''
	};

	const handleInput = (event) => {
		let name = event.target.name;
		let value = event.target.value;
		formData[name] = value;
		result = suite(formData, name);
	};

	$: cn = classnames(result, {
		warning: 'warning',
		invalid: 'error',
		valid: 'success'
	});

	$: disabled = !result.isValid();

	$: resetForm = () => {
		formData = {
			isCorporate: false,
			organizationID: { name: null },
			name: '',
			email: '',
			phone: '',
			address: ''
		};
		suite.reset();
		result = suite.get();
	};

	const handleSubmit = async () => {
		try {
			const { organizationID, ...otherData } = formData;
			const finalData = { ...otherData, organizationID: organizationID._id };
			const res = await fetch('/api/contacts.json', {
				method: 'POST',
				body: JSON.stringify(finalData),
				headers: { 'Content-Type': 'application/json' }
			});

			if (res.ok) {
				// const data = await res.json();
				resetForm();
				toasts.add({ message: 'The Contact was added', type: 'success' });
			}
			// else {
			// 	error = 'An error has occured';
			// 	toasts.add({ message: 'An error has occured', type: 'danger' });
			// }
		} catch (err) {
			logger.error(err.messages);
			toasts.add({ message: 'An error has occured while adding the contact', type: 'danger' });
			error = 'An error has occured';
		}
	};

	const gotoContacts = async () => {
		await goto(`/contacts`);
	};

	let uploadFiles;

	// const inputElement = document.getElementById('uploadCSV');
	// inputElement.addEventListener('change', handleFiles, false);
	// function handleFiles() {
	// 	const fileList = this.files; /* now you can work with the file list */
	// }

	const handleUpload = (e) => {
		const form = new FormData();
		form.append('contacts', '/home/karadz/Downloads/MOCK_DATA (4).csv');
	};

	const makeMatchBold = (searchMatchString: string) => {
		let MatchedWords = [];
		if (corporateSearch.name) {
			const regex = new RegExp(corporateSearch.name, 'ig');
			MatchedWords = searchMatchString.trim().match(regex);
		}

		let makeBold = `<strong>${MatchedWords[0]}</strong>`;
		let boldedStr = searchMatchString.replace(MatchedWords[0], makeBold);

		return boldedStr;
	};
</script>

<svelte:head>
	<title>Add Contact</title>
</svelte:head>

{#if error}
	<h2>Error while loading the data</h2>
{:else if contacts}
	<div class="flex flex-1 flex-col">
		<!-- Use This -->
		<div>
			<!-- Heading and Buttons Bar -->
			<div class="main-header flex flex-row items-center justify-between">
				<div class="flex">
					<button class="mr-3" on:click={gotoContacts}>
						{@html svgArrow}
					</button>
					<h1 class="text-slate-700 text-2xl font-medium">Contacts</h1>
				</div>
				<!-- Right -->
				<div class="flex items-center">
					<form method="post" enctype="multipart/form-data" on:submit|preventDefault={handleUpload}>
						<div class="relative">
							<button
								class="absolute border border-royal-blue-500 bg-royal-blue-500 p-2 text-white"
								for="uploadCSV">{@html svgUpload}</button
							>
							<input
								bind:files={uploadFiles}
								class="w-72 border border-pickled-bluewood-300 bg-pickled-bluewood-100 text-pickled-bluewood-500 ring-royal-blue-500 file:w-10 file:p-1 file:opacity-0"
								type="file"
								name="UploadCSV"
								id="uploadCSV"
								accept=".csv, .CSV"
							/>
							<button
								class="absolute right-0 border border-royal-blue-500 bg-royal-blue-500 p-2 text-white"
								type="submit">{@html svgPlus}</button
							>
						</div>
					</form>
					<!-- Make the button hidden until I find use for it, inline-flex removed-->
					<button class=" btn btn-primary ml-2 hidden items-center justify-center px-3">
						<span>
							{@html svgPlus}
						</span>

						<span class="ml-2">Add Contact</span>
					</button>
				</div>
			</div>

			<!-- Search and View Bar -->
			<div class="z-10 mt-4 flex h-14 w-full flex-row items-center justify-center bg-white">
				<div>
					<h2 class="text-center text-2xl font-bold text-pickled-bluewood-600">Add Contact</h2>
				</div>
			</div>
		</div>
		<!-- End This -->

		<div class="mx-auto mt-2 h-full w-full max-w-md space-y-8">
			<form class="mt-2 space-y-6" on:submit|preventDefault={handleSubmit}>
				<input type="hidden" name="userid" value="true" />
				<div class="space-y-2 shadow-sm">
					<div class="mb-1 flex justify-between">
						<label for="name" class="text-sm">Name</label>
						{#if result.getErrors('name').length}
							<span class="text-sm {cn('name')}">{result.getErrors('name')[0]}</span>
						{/if}
					</div>
					<input
						id="name"
						class="input {cn('name')}"
						name="name"
						placeholder="Name"
						type="text"
						autocomplete="off"
						bind:value={formData.name}
						required
						on:input={handleInput}
					/>
					<!-- isCorporate -->
					<div class="bg-pickled-bluewood-100">
						<div class="mx-auto max-w-md">
							<div class="mb-1 flex justify-between">
								<label for="organization" class="text-sm">Organization</label>
							</div>
							<div class="relative">
								<div class="flex h-10 items-center border border-pickled-bluewood-300 bg-white">
									<!-- ComboBox Input -->
									<input
										bind:value={formData.organizationID.name}
										on:keydown={handleKeyDown}
										on:focus|preventDefault={(e) => (showList = true)}
										on:click|preventDefault={(e) => (showList = true)}
										on:input|preventDefault={(e) => {
											highlightIndex = -1;
											currentCorporateQueryParams = {
												...currentCorporateQueryParams,
												name: corporateSearch.name
											};
											getCorporateContacts(currentCorporateQueryParams);
										}}
										autocomplete="off"
										name="organization"
										id="organization"
										class="w-full appearance-none px-4 text-sm text-pickled-bluewood-600 outline-none"
										checked
									/>
									<!-- Reset Button -->
									<button
										on:click|preventDefault={heandleReset}
										class="cursor-pointer text-pickled-bluewood-300 outline-none transition-all hover:text-pickled-bluewood-600 focus:outline-none"
									>
										{@html svgXSmall}
									</button>
									<!-- Dropdown Label -->
									<label
										for="show_more"
										class="mx-0 cursor-pointer border-l border-pickled-bluewood-200 px-0 text-pickled-bluewood-300 outline-none transition-all hover:text-pickled-bluewood-600 focus:outline-none"
									>
										{@html svgSelector}
									</label>
								</div>

								<input
									type="checkbox"
									name="show_more"
									id="show_more"
									class="peer hidden"
									autocomplete="off"
									bind:checked={showList}
								/>
								<ul
									use:clickOutside
									on:clickOutside={handleShowList}
									class="absolute z-50 mt-1 hidden w-full flex-col overflow-hidden border border-pickled-bluewood-300 bg-white shadow peer-checked:flex"
								>
									{#each contacts.results as result, index (result._id)}
										<li
											class="group cursor-pointer border-t border-pickled-bluewood-200 first:border-t-0"
										>
											<!-- svelte-ignore a11y-missing-attribute -->
											<a
												on:click|preventDefault={(e) => {
													corporateSearch = result;
													formData.organizationID = corporateSearch;
													showList = false;
												}}
												class="{index === highlightIndex
													? 'border-l-4 border-royal-blue-600 bg-pickled-bluewood-100'
													: ''} block border-l-4 border-transparent p-2 text-sm text-pickled-bluewood-600 group-hover:border-royal-blue-600 group-hover:bg-pickled-bluewood-100"
												>{@html makeMatchBold(result.name)}</a
											>
										</li>
									{/each}
								</ul>
							</div>
						</div>
					</div>
					<!-- End isCorporate -->

					<div class="flex flex-row justify-between">
						<!-- Toggle A -->
						<div class="mt-2 mb-1 flex w-full items-center">
							<label for="toogleA" class="flex cursor-pointer items-center">
								<!-- toggle -->
								<div class="relative">
									<!-- input -->
									<input
										id="toogleA"
										type="checkbox"
										class="sr-only"
										bind:checked={formData.isCorporate}
									/>
									<!-- line -->
									<div class="h-4 w-10 rounded-full bg-pickled-bluewood-400 shadow-inner" />
									<!-- dot -->
									<div
										class="dot absolute -left-1 -top-1 h-6 w-6 rounded-full bg-white shadow transition"
									/>
								</div>
								<!-- label -->
								<div class="ml-3 font-medium text-pickled-bluewood-700">
									Individual or Corparate
								</div>
							</label>
						</div>
						<div class="grow" />
					</div>

					<div class="mb-1 flex justify-between">
						<label for="email" class="text-sm">Email</label>
						{#if result.getErrors('email').length}
							<span class="text-sm {cn('email')}">{result.getErrors('email')[0]}</span>
						{/if}
					</div>
					<input
						id="email"
						class="input {cn('email')}"
						name="email"
						placeholder="Email"
						type="email"
						autocomplete="off"
						required
						bind:value={formData.email}
						on:input={handleInput}
					/>

					<div class="mb-1 flex justify-between">
						<label for="phone" class="text-sm">Phone</label>
						{#if result.getErrors('phone').length}
							<span class="text-sm {cn('phone')}">{result.getErrors('phone')[0]}</span>
						{/if}
					</div>
					<input
						id="phone"
						class="input {cn('phone')}"
						name="phone"
						placeholder="Phone"
						type="text"
						autocomplete="off"
						required
						bind:value={formData.phone}
						on:input={handleInput}
					/>

					<div class="mb-4 flex justify-between">
						<label for="address" class="text-sm">Address</label>
						{#if result.getErrors('address').length}
							<span class="text-sm {cn('address')}">{result.getErrors('address')[0]}</span>
						{/if}
					</div>
					<textarea
						id="address"
						class="input {cn('address')}"
						name="address"
						placeholder="Address"
						type="text"
						autocomplete="off"
						required
						bind:value={formData.address}
						on:input={handleInput}
					/>

					<div class="mt-6 flex space-x-2">
						<button
							type="submit"
							class="disabled:opacity-60 disabled:cursor-not-allowed group relative flex w-full justify-center border border-transparent bg-royal-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-royal-blue-700 focus:outline-none focus:ring-2 focus:ring-royal-blue-500 focus:ring-offset-2"
						>
							<span class="absolute inset-y-0 left-0 flex items-center pl-3">
								{@html svgAddUser}
							</span>
							Add Contact
						</button>
						<button
							on:click|preventDefault={(e) => resetForm()}
							class="group relative flex w-full justify-center  border border-transparent bg-royal-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-royal-blue-700 focus:outline-none focus:ring-2 focus:ring-royal-blue-500 focus:ring-offset-2"
						>
							<span class="absolute inset-y-0 left-0 flex items-center pl-3">
								{@html svgX}
							</span>
							Reset
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
{:else}
	<Loading />
{/if}

<!-- <script>
  export let value = ''
  export let label = ''
  export let name = ''
  export let pending = false
  export let errors = {}
  export let onInput = () => {}

  $: messages = errors[name] || []
</script>

<label class:pending class={$$props.class}>
  <div class="row">
    <strong class="col-xs-4">{label}</strong>
    {#if messages.length}
      <span class="col-xs-8 error-container">{messages[0]}</span>
    {/if}
  </div>
  <input type="text" {name} bind:value {...$$props} on:input={onInput} />
</label> -->
