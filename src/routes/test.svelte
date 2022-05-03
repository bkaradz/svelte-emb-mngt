<script lang="ts">
	import { onMount } from 'svelte';
	import logger from '$lib/utility/logger';
	import { clickOutside } from '$lib/utility/clickOutside';
	import { toasts } from '$lib/stores/toasts.store';
	import Input from '$lib/components/Input.svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Combobox from '$lib/components/Combobox.svelte';

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

	function handleShowList() {
		if (showList) {
			showList = false;
		}
	}

	let defaultCorporateQueryParams: getContactsInterface = {
		limit: 9,
		page: 1,
		sort: 'name'
	};
	let currentCorporateQueryParams: getContactsInterface = defaultCorporateQueryParams;
	let contacts;
	let error;

	onMount(() => {
		getCorporateContacts(currentCorporateQueryParams);
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

	let value = 'hello World';
	let check = false;
	let comboValue: { name: '' };
	const heandleInput = (e: any) => {
		currentCorporateQueryParams = {
			...currentCorporateQueryParams,
			name: e.target.value
		};
		getCorporateContacts(currentCorporateQueryParams);
	};
</script>

<!-- ###################################################### -->
<div class="w-full space-y-6">
	<button
		class="btn btn-primary"
		on:click={(e) => toasts.add({ message: 'Success', type: 'success' })}>Success</button
	>
	<button
		class="btn btn-primary"
		on:click={(e) => toasts.add({ message: 'Warning', type: 'warning' })}>Warning</button
	>
	<button class="btn btn-primary" on:click={(e) => toasts.add({ message: 'Info', type: 'info' })}
		>Info</button
	>
	<button class="btn btn-primary" on:click={(e) => toasts.add({ message: 'Error', type: 'error' })}
		>Error</button
	>

	<!-- <Toasts /> -->
	<Input
		name="confirm"
		label="Confirm"
		bind:value
		pending={true}
		onInput={(e) => console.log('event', e.target.value)}
		messages={['Phase one test']}
		validityClass={'confirm'}
	/>
	<Checkbox name="checkbox" label="Yes or No" validityClass={'error'} bind:checked={check} />
	{#if contacts}
		<Combobox
			label="Combobox Test"
			name="testCombo"
			list={contacts.results}
			bind:value={comboValue}
			onInput={heandleInput}
		/>
	{/if}
</div>

<style lang="postcss">
</style>
