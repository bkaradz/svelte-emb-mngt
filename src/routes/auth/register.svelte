<script lang="ts">
	import suite from '$lib/validation/register.validate';
	import classnames from 'vest/classnames';
	import { goto } from '$app/navigation';
	import logger from '$lib/utility/logger';

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

	let error: string | undefined = undefined; // TODO: Impliment Alert Notification

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
		// console.log('contactData Submit', contactData);
		try {
			const res = await fetch('/api/register.json', {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: { 'Content-Type': 'application/json' }
			});

			if (res.ok) {
				const data = await res.json();
				// console.log('Register Form', data);

				resetForm();

				suite.reset();

				goto('/auth/login');
			} else {
				error = 'An error has occured';
			}
		} catch (err) {
			logger.error(err.messages);
			error = 'An error has occured';
		}
	};
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<div class="h-full w-full max-w-md space-y-8">
	<div>
		<img class="mx-auto h-12 w-auto" src="../../../static/small_logo.png" alt="Lilian Logo" />
		<h2 class="mt-6 text-center text-3xl font-bold text-pickled-bluewood-900">Register</h2>
	</div>
	<form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
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
				Register
			</button>
		</div>
	</form>
</div>
