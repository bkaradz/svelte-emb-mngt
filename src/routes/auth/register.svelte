<script lang="ts">
	import suite from '$lib/validation/register.validate';

	let res = suite.get();

	// $: console.log('res', res);

	interface formDataType {
		name: string;
		email: string;
		phoneNo: string;
		address: string;
		password: string;
		confirmPassword: string;
	}

	let formData: formDataType = {
		name: '',
		email: '',
		phoneNo: '',
		address: '',
		password: '',
		confirmPassword: ''
	};

	const handleChange = (name) => {
		// console.log('formData', formData);
		res = suite(formData);
	};

	const handleSubmit = async () => {
		// console.log('contactData Submit', contactData);
		const submit = await fetch('/api/register.json', {
			method: 'POST',
			body: JSON.stringify(formData)
		});

		const data = await submit.json();

		console.log('Register Form', data);
	};
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<div class="h-full w-full max-w-md space-y-8">
	<div>
		<img class="mx-auto h-12 w-auto" src="../../../static/small_logo.png" alt="Lilian Logo" />
		<h2 class="mt-6 text-center text-3xl font-bold text-gray-900">Register</h2>
	</div>
	<form class="mt-8 space-y-6" on:submit|preventDefault={handleSubmit}>
		<input type="hidden" name="remember" value="true" />
		<div class="-space-y-px rounded-md shadow-sm">
			<div>
				<label for="name" class="sr-only">Name</label>
				<input
					id="name"
					name="name"
					type="text"
					autocomplete="name"
					class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					placeholder="Name"
					bind:value={formData.name}
					on:change={handleChange}
				/>
			</div>
			<div>
				<label for="email" class="sr-only">Email address</label>
				<input
					id="email"
					name="email"
					type="email"
					autocomplete="email"
					class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					placeholder="Email address"
					bind:value={formData.email}
				/>
			</div>
			<div>
				<label for="phone" class="sr-only">Telephone Number</label>
				<input
					id="phone"
					name="phone"
					type="text"
					autocomplete="phone"
					class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					placeholder="Telephone Number"
					bind:value={formData.phoneNo}
				/>
			</div>
			<div>
				<label for="address" class="sr-only">Address</label>
				<textarea
					class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					name="address"
					id="address"
					rows="4"
					autocomplete="address"
					placeholder="Address"
					bind:value={formData.address}
				/>
			</div>
			<div>
				<label for="password" class="sr-only">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					autocomplete="current-password"
					class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					placeholder="Password"
					bind:value={formData.password}
				/>
			</div>
			<div>
				<label for="confirmPassword" class="sr-only">Password</label>
				<input
					id="confirmPassword"
					name="confirmPassword"
					type="password"
					autocomplete="confirm-password"
					class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					placeholder="confirm Password"
					bind:value={formData.confirmPassword}
				/>
			</div>
		</div>

		<div>
			<button
				type="submit"
				class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>
				<span class="absolute inset-y-0 left-0 flex items-center pl-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
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
