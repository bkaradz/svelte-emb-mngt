<script lang="ts">
	import { onMount } from 'svelte';
	import logger from '$lib/utility/logger';
	import { clickOutside } from '$lib/utility/clickOutside';

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

	let corporateSearch = { name: null };

	let showList = false;
	let selected = -1;

	function handleShowList() {
		if (showList) {
			showList = false;
		}
	}

	let defaultGlobalParams: getContactsInterface = {
		limit: 3,
		page: 1,
		sort: 'name'
	};
	let currentGlobalParams: getContactsInterface = defaultGlobalParams;
	let contacts;
	let error;

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

	let value = 'hello World';
	$: console.log('🚀 ~ file: test.svelte ~ line 105 ~ value', value);
	let check = false;
	$: console.log('🚀 ~ file: test.svelte ~ line 108 ~ check', check);
</script>

<!-- ###################################################### -->
<div class="w-full">
	{#if contacts}
		<div class="bg-pickled-bluewood-100">
			<div class="mx-auto">
				<label for="select" class="block text-sm text-pickled-bluewood-600">Select Input:</label>

				<div class="relative">
					<div class="flex items-center border border-pickled-bluewood-200 bg-white">
						<input
							bind:value={corporateSearch.name}
							on:keydown={handleKeyDown}
							on:click|preventDefault={(e) => (showList = true)}
							on:input|preventDefault={(e) => {
								highlightIndex = -1;
								currentGlobalParams = { ...currentGlobalParams, name: corporateSearch.name };
								getCorporateContacts(currentGlobalParams);
							}}
							name="select"
							id="select"
							class=" w-full appearance-none py-2 px-3 text-sm text-pickled-bluewood-600 outline-none"
							checked
						/>

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
						<label
							for="show_more"
							class="cursor-pointer border-l border-pickled-bluewood-200 text-pickled-bluewood-300 outline-none transition-all hover:text-pickled-bluewood-600 focus:outline-none"
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
								<polyline points="18 15 12 9 6 15" />
							</svg>
						</label>
					</div>

					<input
						type="checkbox"
						name="show_more"
						id="show_more"
						class="peer hidden"
						bind:checked={showList}
					/>
					<ul
						use:clickOutside
						on:clickOutside|preventDefault={handleShowList}
						class="absolute mt-1 hidden w-full flex-col overflow-hidden border border-pickled-bluewood-200 bg-white shadow peer-checked:flex"
					>
						{#each contacts.results as result, index (result._id)}
							<li
								class="group cursor-pointer border-t border-pickled-bluewood-200 first:border-t-0"
							>
								<!-- svelte-ignore a11y-missing-attribute -->
								<a
									on:click|preventDefault={(e) => {
										corporateSearch = result;
										showList = false;
									}}
									class="{index === highlightIndex
										? 'block border-l-4 border-transparent border-royal-blue-600 bg-pickled-bluewood-100'
										: ''} block border-l-4 border-transparent p-2 text-sm text-pickled-bluewood-600 hover:border-royal-blue-600 hover:bg-pickled-bluewood-100"
									>{result.name}</a
								>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
</style>
