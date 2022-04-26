<script lang="ts">
	import { onMount } from 'svelte';
	import logger from '$lib/utility/logger';
	import { clickOutside } from '$lib/utility/clickOutside';
	import { svgSelector, svgXSmall } from '$lib/utility/svgLogos';

	// export let value = {name: null};
	export let label = '';
	export let name = '';
	export let value = { name: null };
	export let list = [];

	// $: console.log('🚀 ~ file: ComboBox.svelte ~ line 12 ~ value', value);
	// export let pending = false;
	// export let messages = [];
	// export let validityClass;
	// export let onInput = (name?: string) => {};

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

	let showList = false;
	let selected = -1;

	function handleShowList() {
		if (showList) {
			showList = false;
		}
	}

	let defaultGlobalParams: getContactsInterface = {
		limit: 9,
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
		value = { name: null };
		highlightIndex = -1;
	};

	let defaultChangedValue;
	$: console.log('🚀 ~ file: ComboBox.svelte ~ line 74 ~ defaultChangedValue', defaultChangedValue);

	let highlightIndex = -1;

	async function handleKeyDown(e) {
		const listLenght = contacts.results.length;
		switch (e.key) {
			case 'Escape':
				showList = false;
				break;
			case 'Enter':
				value = contacts.results[highlightIndex];
				handleShowList();
				highlightIndex = -1;
				break;
			case 'ArrowUp':
				highlightIndex <= 0 ? (highlightIndex = 0) : (highlightIndex -= 1);
				break;
			case 'ArrowDown':
				highlightIndex === listLenght - 1
					? (highlightIndex = listLenght - 1)
					: (highlightIndex += 1);
				break;
			default:
				break;
		}
	}

	const makeMatchBold = (searchMatchString: string) => {
		let MatchedWords = [];
		if (value.name) {
			const regex = new RegExp(value.name, 'ig');
			MatchedWords = searchMatchString.trim().match(regex);
		}

		let makeBold = `<strong>${MatchedWords[0]}</strong>`;
		let boldedStr = searchMatchString.replace(MatchedWords[0], makeBold);

		return boldedStr;
	};

	let disabled = true;

	list.length ? (disabled = false) : (disabled = true);
</script>

<!-- ###################################################### -->
<div class="w-full">
	<div class="bg-transparent">
		<div class="mx-auto">
			<label for={name} class="block text-sm text-pickled-bluewood-600">{label}</label>
			<div class="input relative p-0">
				<div class="flex items-center bg-white">
					<!-- ComboBox Input -->
					<input
						bind:value={value.name}
						on:keydown={handleKeyDown}
						on:focus|preventDefault={(e) => (showList = true)}
						on:click|preventDefault={(e) => (showList = true)}
						on:input|preventDefault={(e) => {
							highlightIndex = -1;
							currentGlobalParams = { ...currentGlobalParams, name: value.name };
							getCorporateContacts(currentGlobalParams);
						}}
						autocomplete="off"
						{name}
						id="select"
						class="input border-transparent"
						type="text"
						{disabled}
					/>
					<!-- Reset Button -->
					<button on:click|preventDefault={heandleReset} class="icons">
						{@html svgXSmall}
					</button>
					<!-- Dropdown Label -->
					<label for="show_more" class="icons">
						{@html svgSelector}
					</label>
				</div>

				<input
					type="checkbox"
					name="show_more"
					id="show_more"
					class="peer hidden"
					bind:checked={showList}
				/>
				{#if list.length}
					<ul
						on:select={defaultChangedValue}
						use:clickOutside
						on:clickOutside|preventDefault={handleShowList}
						class="list peer-checked:flex"
					>
						{#each list as listItem, index (listItem._id)}
							<li class="list--item group">
								<!-- svelte-ignore a11y-missing-attribute -->
								<a
									on:click|preventDefault={(e) => {
										value = listItem;
										showList = false;
									}}
									class="{index === highlightIndex
										? 'block border-l-4 border-transparent border-royal-blue-600 bg-pickled-bluewood-100'
										: ''} block border-l-4 border-transparent p-2 text-sm text-pickled-bluewood-600 hover:border-royal-blue-600 hover:bg-pickled-bluewood-100"
									>{listItem.name}</a
								>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.icons {
		@apply cursor-pointer border-l border-pickled-bluewood-200 px-1 text-pickled-bluewood-300 outline-none transition-all;
	}
	.icons:hover {
		@apply text-pickled-bluewood-600;
	}
	.icons:focus {
		@apply outline-none;
	}
	.list {
		@apply absolute mt-1 hidden w-full flex-col overflow-hidden border border-pickled-bluewood-200 bg-white shadow;
	}
	.list--item {
		@apply cursor-pointer border-t border-pickled-bluewood-200;
	}
	.list--item:first-child {
		@apply border-t-0;
	}
</style>
