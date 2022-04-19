<script lang="ts">
	import { onMount } from 'svelte';
	import { clickOutside } from '$lib/utility/clickOutside';
	import suite from '$lib/validation/client/signUp.validate';
	import logger from '$lib/utility/logger';
	import { svgArrow, svgPlus, svgSelector, svgUpload } from '$lib/utility/svgLogos';
	import classnames from 'vest/classnames';
	import { goto } from '$app/navigation';

	let result = suite.get();

	interface getContactsInterface {
		limit: number;
		page: number;
		sort?: string;
		query?: string;
		name?: string;
		organisation?: string;
		phone?: string;
		email?: string;
		vatNo?: string;
		balanceDue?: string;
		state?: string;
		isCorporate?: boolean;
		isActive?: boolean;
		isUser?: boolean;
	}

	interface corporateSearchInterface {
		name: string | null;
		_id?: string | undefined;
	}

	let corporateSearch: corporateSearchInterface = { name: null };

	let showList = false;
	let selected = -1;

	function handleShowList() {
		if (showList) {
			showList = false;
		}
	}

	let defaultGlobalParams: getContactsInterface = {
		limit: 10,
		page: 1,
		sort: 'name',
		isCorporate: true
	};
	let currentGlobalParams: getContactsInterface = defaultGlobalParams;
	let contacts;

	onMount(() => {
		getCorporateContacts(currentGlobalParams);
	});

	const getCorporateContacts = async (paramsObj: getContactsInterface) => {
		try {
			let searchParams = new URLSearchParams(paramsObj);
			const res = await fetch('/api/contacts.json?' + searchParams.toString());
			contacts = await res.json();
		} catch (err) {
			logger.error(err.message);
			error = err.message;
		}
	};

	const heandleReset = () => {
		currentGlobalParams = defaultGlobalParams;
		getCorporateContacts(currentGlobalParams);
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
				formData.organizationID = corporateSearch?._id;
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
		organizationID?: string;
		isCorporate: boolean;
		email: string;
		phone: string;
		address: string;
	}

	let formData: formDataType = {
		isCorporate: false,
		organizationID: corporateSearch?._id,
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

	let error: string | undefined = undefined; // TODO: Impliment Alert Notification

	const resetForm = () => {
		formData = {
			isCorporate: false,
			name: '',
			email: '',
			phone: '',
			address: ''
		};
	};

	const handleSubmit = async () => {
		try {
			const res = await fetch('/api/contacts.json', {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: { 'Content-Type': 'application/json' }
			});

			if (res.ok) {
				const data = await res.json();

				resetForm();

				suite.reset();
			} else {
				error = 'An error has occured';
			}
		} catch (err) {
			logger.error(err.messages);
			error = 'An error has occured';
		}
	};

	const gotoContacts = async () => {
		await goto(`/contacts`);
	};
</script>

<svelte:head>
	<title>Add Contact</title>
</svelte:head>

{#if contacts}
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
				<div class="flex items-center">
					<button class="btn btn-primary inline-flex items-center justify-center px-3">
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
										bind:value={corporateSearch.name}
										on:keydown={handleKeyDown}
										on:click|preventDefault={(e) => (showList = true)}
										on:input|preventDefault={(e) => {
											highlightIndex = -1;
											currentGlobalParams = { ...currentGlobalParams, name: corporateSearch.name };
											getCorporateContacts(currentGlobalParams);
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
													formData.organizationID = corporateSearch?._id;
													showList = false;
												}}
												class="{index === highlightIndex
													? 'border-royal-blue-600 bg-pickled-bluewood-100'
													: ''} block border-l-4 border-transparent p-2 text-sm text-pickled-bluewood-600 group-hover:border-royal-blue-600 group-hover:bg-pickled-bluewood-100"
												>{result.name}</a
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
						on:input={handleInput}
					/>

					<div class="mb-1 flex justify-between">
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
						on:input={handleInput}
					/>

					<div>
						<button
							type="submit"
							class="group relative flex w-full justify-center  border border-transparent bg-royal-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-royal-blue-700 focus:outline-none focus:ring-2 focus:ring-royal-blue-500 focus:ring-offset-2"
						>
							<span class="absolute inset-y-0 left-0 flex items-center pl-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5 text-royal-blue-500 group-hover:text-royal-blue-400"
									fill="none"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
									/>
								</svg>
							</span>
							Add Contact
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
{/if}
