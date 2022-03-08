<script lang="ts">
	import { clickOutside } from '$lib/utility/clickOutside';
	let loginMenuOpen = false;
	function handleClick() {
		loginMenuOpen = !loginMenuOpen;
	}
	$: loginMenuOpen;

	function handleClickOutside(event) {
		if (loginMenuOpen) {
			loginMenuOpen = !loginMenuOpen;
		}
	}

	function handleKeyDown(event) {
		if (event.key === 'Escape') {
			loginMenuOpen = !loginMenuOpen;
		}
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

<div class="menu z-10 flex flex-row items-center justify-end bg-neutral-100 drop-shadow-md">
	<span class="relative mr-8 inline-block">
		<svg
			class="h-7 w-7 fill-blue-500 stroke-blue-600"
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
			class="absolute top-0 right-0 inline-flex translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-purple-600 px-2 py-1 text-xs font-bold leading-none text-red-100"
			>122</span
		>
	</span>

	<div class="relative mr-6">
		<!-- Dropdown toggle button -->
		<button
			on:click={handleClick}
			class="mr-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-solid border-white bg-purple-600"
		>
			<p class="text-white">B K</p>
		</button>

		<div
			use:clickOutside
			on:clickOutside={handleClickOutside}
			class="{loginMenuOpen
				? ''
				: 'hidden'} absolute right-0 mt-1 w-60 rounded-lg border bg-blue-500 px-5 py-3 shadow dark:border-transparent"
		>
			<ul class="space-y-3 text-white">
				<li class="font-medium">
					<a
						href="/"
						on:click={handleClick}
						class="flex transform items-center border-r-4 border-transparent transition-colors duration-200 hover:border-gray-300"
					>
						<div class="mr-3">
							<svg
								class="h-6 w-6"
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
						class="flex transform items-center border-r-4 border-transparent transition-colors duration-200 hover:border-gray-300"
					>
						<div class="mr-3">
							<svg
								class="h-6 w-6"
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
						class="flex transform items-center border-r-4 border-transparent transition-colors duration-200 hover:border-red-600"
					>
						<div class="mr-3 text-red-600">
							<svg
								class="h-6 w-6"
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
