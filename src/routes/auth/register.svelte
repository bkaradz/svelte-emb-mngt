<div class="w-full max-w-md space-y-8">
	<div>
		<img class="mx-auto h-12 w-auto" src="../../../static/small_logo.png" alt="Lilian Logo" />
		<h2 class="mt-6 text-center text-3xl font-bold text-gray-900">Register</h2>
	</div>
	<form class="mt-8 space-y-6" action="#" method="POST">
		<input type="hidden" name="remember" value="true" />
		<div class="-space-y-px rounded-md shadow-sm">
			<div>
				<label for="name" class="sr-only">Name</label>
				<input
					id="name"
					name="name"
					type="text"
					autocomplete="name"
					required
					class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					placeholder="Name"
				/>
			</div>
			<div>
				<label for="email-address" class="sr-only">Email address</label>
				<input
					id="email-address"
					name="email"
					type="email"
					autocomplete="email"
					required
					class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					placeholder="Email address"
				/>
			</div>
			<div>
				<label for="phone" class="sr-only">Telephone Number</label>
				<input
					id="phone"
					name="phone"
					type="text"
					autocomplete="phone"
					required
					class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					placeholder="Telephone Number"
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
				/>
				<!-- <input
						id="phone"
						name="phone"
						type="text"
						autocomplete="phone"
						required
						class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
						placeholder="Telephone Number"
					/> -->
			</div>
			<div>
				<label for="password" class="sr-only">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					autocomplete="current-password"
					required
					class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					placeholder="Password"
				/>
			</div>
			<div>
				<label for="confirm-password" class="sr-only">Password</label>
				<input
					id="confirm-password"
					name="confirm-password"
					type="password"
					autocomplete="confirm-password"
					required
					class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					placeholder="confirm Password"
				/>
			</div>
		</div>

		<div>
			<button
				type="submit"
				class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>
				<span class="absolute inset-y-0 left-0 flex items-center pl-3">
					<!-- Heroicon name: solid/lock-closed -->
					<svg
						class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
							clip-rule="evenodd"
						/>
					</svg>
				</span>
				Register
			</button>
		</div>
	</form>
</div>
