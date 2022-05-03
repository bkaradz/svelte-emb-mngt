<script lang="ts">
	import suite from '$lib/validation/client/signUp.validate';
	import logger from '$lib/utility/logger';
	import { svgArrow, svgPlus } from '$lib/utility/svgLogos';
	import classnames from 'vest/classnames';
	import { goto } from '$app/navigation';

	let result = suite.get();

	interface formDataType {
		name: string;
		email: string;
		phone: string;
		address: string;
		password: string;
		confirmPassword: string;
	}

	let formData: formDataType = {
		name: '',
		email: '',
		phone: '',
		address: '',
		password: '',
		confirmPassword: ''
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

	let error: string | undefined = undefined;

	const resetForm = () => {
		formData = {
			name: '',
			email: '',
			phone: '',
			address: '',
			password: '',
			confirmPassword: ''
		};
	};

	const handleSubmit = async () => {
		try {
			const res = await fetch('/api/products.json', {
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

	const gotoProducts = async () => {
		await goto(`/products`);
	};
</script>

<svelte:head>
	<title>Add Product</title>
</svelte:head>
<div class="flex flex-1 flex-col">
	<div class="main-header mb-6 flex flex-row items-center justify-between">
		<div class="flex">
			<button class="mr-3" on:click={gotoProducts}>
				{@html svgArrow}
			</button>
			<h1 class="text-slate-700 text-2xl font-medium">Products</h1>
		</div>

		<button class="btn btn-primary hidden items-center justify-center px-3">
			<span>
				{@html svgPlus}
			</span>

			<span class="ml-2">Add Order</span>
		</button>
	</div>
	<hr />
	<div class="mx-auto mt-6 h-full w-full max-w-md space-y-8">
		<div>
			<h2 class="text-center text-3xl font-bold text-pickled-bluewood-900">Add Product</h2>
		</div>
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
					autocomplete="name"
					required
					on:input={handleInput}
				/>

				<div class="flex flex-row justify-between">
					<!-- Toggle A -->
					<div class="mt-2 mb-1 flex w-full items-center">
						<label for="toogleA" class="flex cursor-pointer items-center">
							<!-- toggle -->
							<div class="relative">
								<!-- input -->
								<input id="toogleA" type="checkbox" class="sr-only" />
								<!-- line -->
								<div class="h-4 w-10 rounded-full bg-pickled-bluewood-400 shadow-inner" />
								<!-- dot -->
								<div
									class="dot absolute -left-1 -top-1 h-6 w-6 rounded-full bg-white shadow transition"
								/>
							</div>
							<!-- label -->
							<div class="ml-3 font-medium text-pickled-bluewood-700">Corparate or Individual</div>
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
					autocomplete="email"
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
					autocomplete="phone"
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
					autocomplete="address"
					required
					on:input={handleInput}
				/>

				<div class="mb-1 flex justify-between">
					<label for="password" class="text-sm">Password</label>
					{#if result.getErrors('password').length}
						<span class="text-sm {cn('password')}">{result.getErrors('password')[0]}</span>
					{/if}
				</div>
				<input
					id="password"
					class="input {cn('password')}"
					name="password"
					placeholder="Password"
					type="password"
					autocomplete="password"
					required
					on:input={handleInput}
				/>

				<div class="mb-1 flex justify-between">
					<label for="confirmPassword" class="text-sm">Confirm Password</label>
					{#if result.getErrors('confirmPassword').length}
						<span class="text-sm {cn('confirmPassword')}"
							>{result.getErrors('confirmPassword')[0]}</span
						>
					{/if}
				</div>
				<input
					id="confirmPassword"
					class="input {cn('confirmPassword')}"
					name="confirmPassword"
					placeholder="Confirm Password"
					type="password"
					autocomplete="confirmPassword"
					required
					on:input={handleInput}
				/>
			</div>

			<div>
				<button
					{disabled}
					type="submit"
					class="group relative flex w-full justify-center  border border-transparent bg-royal-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-royal-blue-700 focus:outline-none focus:ring-2 focus:ring-royal-blue-500 focus:ring-offset-2"
				>
					<span class="absolute inset-y-0 left-0 flex items-center pl-3">
						{@html svgPlus}
					</span>
					Add Product
				</button>
			</div>
		</form>
	</div>
</div>
