<script lang="ts">
	import { onMount } from 'svelte';
	import suite from '$lib/validation/client/signUp.validate';
	import logger from '$lib/utility/logger';
	import { svgAddUser, svgArrow, svgPlus, svgUpload, svgX } from '$lib/utility/svgLogos';
	import classnames from 'vest/classnames';
	import { goto } from '$app/navigation';
	// import Loading from '$lib/components/Loading.svelte';
	import { toasts } from '$lib/stores/toasts.store';
	import type { ContactsDocument } from '$lib/models/contacts.model';
	import type { metaDataInterface } from '$lib/services/aggregateQuery.services';
	import Input from '$lib/components/Input.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Combobox from '$lib/components/Combobox.svelte';
	import type { OptionsDocument } from '$lib/models/options.models';
	import type { ProductsDocument } from '$lib/models/products.models';

	let result = suite.get();

	// let error: string | undefined = undefined;

	interface contactsInterface extends metaDataInterface {
		results: Array<Omit<ContactsDocument, 'createdAt' | 'updatedAt' | 'password' | 'userRole'>>;
	}

	interface corporateQueryParamsInterface {
		limit: number;
		page: number;
		sort: string;
		isCorporate: boolean;
		name?: string;
	}

	type corporateSearchInterface = Partial<ContactsDocument> & { name: string };

	let categorySearch: corporateSearchInterface = { name: '' };

	let showList = false;

	function handleShowList() {
		if (showList) {
			showList = false;
		}
	}

	let defaultCorporateQueryParams: Partial<corporateQueryParamsInterface> = {
		limit: 7,
		page: 1,
		sort: 'name',
		isCorporate: true
	};
	let currentCorporateQueryParams = defaultCorporateQueryParams;
	let productcategories: Array<OptionsDocument>;

	onMount(() => {
		getProductCategories();
	});

	const getProductCategories = async () => {
		try {
			let searchParams = new URLSearchParams({ group: 'productCategories' });
			const res = await fetch('/api/options.json?' + searchParams.toString());
			productcategories = await res.json();
		} catch (err) {
			logger.error(err.message);
			toasts.add({
				message: 'An error has occured while getting product categories',
				type: 'error'
			});
		}
	};

	let formData: Partial<ProductsDocument> = {
		name: '',
		title: '',
		description: '',
		unitPrice: 0,
		category: '',
		stitches: 0,
		quantity: 0,
		isActive: true
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
			name: '',
			title: '',
			description: '',
			unitPrice: 0,
			category: '',
			stitches: 0,
			quantity: 0,
			isActive: true
		};
		categorySearch = { name: '' };
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
		} catch (err) {
			logger.error(err.messages);
			toasts.add({ message: 'An error has occured while adding the contact', type: 'error' });
		}
	};

	const gotoProducts = async () => {
		await goto(`/products`);
	};

	const handleUpload = async (e: SubmitEvent) => {
		try {
			const formElm = e.target as HTMLFormElement;
			const formData = new FormData(formElm);

			const res = await fetch('/api/products/upload.json', {
				method: 'POST',
				body: formData
			});

			if (res.ok) {
				formElm.reset();
				toasts.add({ message: 'Products uploaded', type: 'success' });
			}
		} catch (err) {
			logger.error(err.messages);
			toasts.add({ message: 'An error has occured while uploading products', type: 'error' });
		}
	};

	const handleComboInput = (e: any) => {
		currentCorporateQueryParams = {
			...currentCorporateQueryParams,
			name: e.target.value
		};
		// getCorporateContacts(currentCorporateQueryParams);
	};
</script>

<svelte:head>
	<title>Add Product</title>
</svelte:head>

<div class="flex flex-1 flex-col">
	<!-- Use This -->
	<div>
		<!-- Heading and Buttons Bar -->
		<div class="main-header flex flex-row items-center justify-between">
			<div class="flex">
				<button class="mr-3" on:click={gotoProducts}>
					{@html svgArrow}
				</button>
				<h1 class="text-slate-700 text-2xl font-medium">Products</h1>
			</div>
			<!-- Right -->
			<div class="flex items-center">
				<form on:submit|preventDefault={handleUpload}>
					<div class="relative">
						<button
							class="absolute border border-royal-blue-500 bg-royal-blue-500 p-2 text-white"
							for="uploadCSV">{@html svgUpload}</button
						>
						<input
							class="w-72 border border-pickled-bluewood-300 bg-pickled-bluewood-100 text-pickled-bluewood-500 ring-royal-blue-500 file:w-10 file:p-1 file:opacity-0"
							type="file"
							name="products"
							id="uploadCSV"
							accept=".csv, .CSV"
						/>
						<button
							class="absolute right-0 border border-royal-blue-500 bg-royal-blue-500 p-2 text-white"
							type="submit">{@html svgPlus}</button
						>
					</div>
				</form>
			</div>
		</div>

		<!-- Search and View Bar -->
		<div class="z-10 mt-4 flex h-14 w-full flex-row items-center justify-center bg-white">
			<div>
				<h2 class="text-center text-2xl font-bold text-pickled-bluewood-600">Add Product</h2>
			</div>
		</div>
	</div>
	<!-- End This -->

	<div class="mx-auto mt-2 h-full w-full max-w-md space-y-8">
		<form class="mt-2 space-y-6" on:submit|preventDefault={handleSubmit}>
			<div class="space-y-2 shadow-sm">
				<Input
					name="name"
					label="Name"
					bind:value={formData.name}
					onInput={handleInput}
					messages={result.getErrors('name')}
					validityClass={cn('name')}
				/>
				<Input
					name="title"
					label="Title"
					bind:value={formData.title}
					onInput={handleInput}
					messages={result.getErrors('title')}
					validityClass={cn('title')}
				/>
				<Textarea
					name="description"
					label="Description"
					bind:value={formData.description}
					onInput={handleInput}
					messages={result.getErrors('description')}
					validityClass={cn('description')}
				/>

				{#if productcategories}
					<Combobox
						name="category"
						label="category"
						list={productcategories}
						bind:value={categorySearch}
						onInput={handleComboInput}
					/>
				{/if}

				<Input
					name="stitches"
					label="Stitches"
					type="number"
					bind:value={formData.stitches}
					onInput={handleInput}
					messages={result.getErrors('stitches')}
					validityClass={cn('stitches')}
				/>

				<Input
					name="unitPrice"
					label="Unit Price"
					type="number"
					bind:value={formData.unitPrice}
					onInput={handleInput}
					messages={result.getErrors('unitPrice')}
					validityClass={cn('unitPrice')}
				/>

				<Input
					name="quantity"
					label="Quantity"
					type="number"
					bind:value={formData.quantity}
					onInput={handleInput}
					messages={result.getErrors('quantity')}
					validityClass={cn('quantity')}
				/>

				<div class="mt-6 flex space-x-2">
					<button
						type="submit"
						class="group relative flex w-full justify-center border border-transparent bg-royal-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-royal-blue-700 focus:outline-none focus:ring-2 focus:ring-royal-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
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
