<script lang="ts">
	import suite from '$lib/validation/client/signUp.validate';
	import { goto } from '$app/navigation';
	import logger from '$lib/utility/logger';
	import classnames from 'vest/classnames';
	import { toasts } from '$lib/stores/toasts.store';
	import { svgSignUp } from '$lib/utility/svgLogos';

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

	const handleSignUp = async () => {
		try {
			const res = await fetch('/api/auth/signUp.json', {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: { 'Content-Type': 'application/json' }
			});

			if (res.ok) {
				const data = await res.json();

				resetForm();

				suite.reset();
				toasts.add({
					message: 'Sign Up was successful, Wait for approval from the ADMIN',
					type: 'success'
				});
				await goto('/auth/signIn');
			}
			// else {
			// 	error = 'An error has occured';
			// }
		} catch (err) {
			logger.error(err.messages);
			error = 'An error has occured';
			toasts.add({ message: 'An error has occured', type: 'error' });
		}
	};
</script>

<svelte:head>
	<title>Sign Up</title>
</svelte:head>

<div class="h-full w-full max-w-md space-y-8">
	<div>
		<img class="mx-auto h-12 w-auto" src="../../../static/small_logo.png" alt="Lilian Logo" />
		<h2 class="mt-6 text-center text-3xl font-bold text-pickled-bluewood-900">Register</h2>
	</div>
	<form class="mt-8 space-y-6" on:submit|preventDefault={handleSignUp}>
		<input type="hidden" name="remember" value="true" />
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
				class="group relative flex w-full justify-center border border-transparent  bg-royal-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-royal-blue-700 focus:outline-none focus:ring-2 focus:ring-royal-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
			>
				<span class="absolute inset-y-0 left-0 flex items-center pl-3">
					{@html svgSignUp}
				</span>
				Register
			</button>
		</div>
	</form>
</div>
