<script lang="ts">
	import { onMount } from 'svelte';
	import logger from '$lib/utility/logger';
	import { clickOutside } from '$lib/utility/clickOutside';
	import { toasts } from '$lib/stores/Toasts.store';
	import Toasts from '$lib/components/Toasts.svelte';
	import Input from '$lib/components/Input.svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import ComboBox from '$lib/components/ComboBox.svelte';
	// import { makeMatchBold } from '$lib/utility/makeMatchBold';

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
<div class="w-full space-y-6">
	<!-- <Toasts /> -->

	<Input
		name="confirm"
		label="Confirm"
		bind:value
		pending={true}
		onInput={(e) => console.log('event', e)}
		messages={['Phase one test']}
		validityClass={'confirm'}
	/>
	<Checkbox name="checkbox" label="Yes or No" validityClass={'confirm'} bind:checked={check} />
	<ComboBox />
</div>

<style lang="postcss">
	.btn-primary {
		@apply bg-success;
	}
</style>
