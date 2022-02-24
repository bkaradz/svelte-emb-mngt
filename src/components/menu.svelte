<script>
	let loginMenu = true;
	function handleClick() {
		loginMenu = !loginMenu;
	}
	$: loginMenu;
</script>

<div class="menu flex flex-row justify-end items-center bg-neutral-100 drop-shadow-md ">
	<span class="relative inline-block mr-8">
		<svg
			class="w-7 h-7 fill-blue-500 stroke-blue-600"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
			/></svg
		>
		<span
			class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-purple-600 rounded-full"
			>122</span
		>
	</span>

	<div class="relative mr-6">
		<!-- Dropdown toggle button -->
		<button
			on:click={handleClick}
			class="flex justify-center items-center bg-purple-600 w-12 h-12 rounded-full mr-2 border-2 border-solid border-white"
		>
			<p class="text-white">B K</p>
		</button>

		<div
			class="{loginMenu
				? 'hidden'
				: ''} absolute right-0 w-60 px-5 py-3 dark:bg-gray-800 bg-blue-500 rounded-lg shadow border dark:border-transparent mt-1"
		>
			<ul class="space-y-3 text-white">
				<li class="font-medium">
					<a
						href="/"
						on:click={handleClick}
						class="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-gray-300"
					>
						<div class="mr-3">
							<svg
								class="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								/></svg
							>
						</div>
						Account
					</a>
				</li>
				<li class="font-medium">
					<a
						href="/"
						on:click={handleClick}
						class="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-gray-300"
					>
						<div class="mr-3">
							<svg
								class="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
								/><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
								/></svg
							>
						</div>
						Setting
					</a>
				</li>
				<hr class="dark:border-gray-700" />
				<li class="font-medium">
					<a
						href="/"
						on:click={handleClick}
						class="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600"
					>
						<div class="mr-3 text-red-600">
							<svg
								class="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
								/></svg
							>
						</div>
						Logout
					</a>
				</li>
			</ul>
		</div>
	</div>
</div>
