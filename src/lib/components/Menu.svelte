<script lang="ts">
	import { clickOutside } from '$lib/utility/clickOutside';
	import logger from '$lib/utility/logger';
	import { goto } from '$app/navigation';
	import { svgLogout, svgMessages, svgSettings, svgUser } from '$lib/utility/svgLogos';
	import { session } from '$app/stores';

	let signInMenuOpen = false;
	function handleClick() {
		signInMenuOpen = !signInMenuOpen;
	}
	$: signInMenuOpen;

	function handleClickOutside(event) {
		if (signInMenuOpen) {
			signInMenuOpen = !signInMenuOpen;
		}
	}

	function handleKeyDown(event) {
		if (event.key === 'Escape') {
			signInMenuOpen = !signInMenuOpen;
		}
	}

	const handleSignOut = async () => {
		try {
			const res = await fetch('/api/auth/signOut.json', {
				method: 'GET'
			});

			if (res.ok) {
				const data = await res.json();
				$session = {};
				await goto('/auth/signIn');
			}
		} catch (err) {
			logger.error(err.messages);
		}
	};
</script>

<svelte:window on:keydown={handleKeyDown} />

<div
	class="menu z-10 flex flex-row items-center justify-end  bg-gradient-to-tl from-royal-blue-500 to-royal-blue-200 drop-shadow-md"
>
	<span class="relative mr-8 inline-block">
		{@html svgMessages}
		<span
			class="absolute top-0 right-0 inline-flex translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full  bg-success px-2 py-1 text-xs font-bold leading-none text-white"
			>122</span
		>
	</span>

	<div class="relative mr-6">
		<!-- Dropdown toggle button -->
		<button
			on:click={handleClick}
			class="mr-2 flex h-12 w-12 items-center justify-center rounded-full border border-solid border-pickled-bluewood-200 bg-royal-blue-600"
		>
			<p class="text-white">B K</p>
		</button>

		<div
			use:clickOutside
			on:clickOutside={handleClickOutside}
			class="{signInMenuOpen
				? ''
				: 'hidden'} ring-black absolute right-0 top-9 z-10 mt-2 w-56 origin-top-right divide-y divide-pickled-bluewood-300 rounded-md bg-royal-blue-50 shadow-lg ring-1 ring-opacity-5 focus:outline-none"
		>
			<div class="py-1" role="none">
				<a
					href="/"
					class="flex items-center px-4 py-2 text-sm text-pickled-bluewood-700 hover:bg-royal-blue-100"
					role="menuitem"
					tabindex="-1"
					id="menu-item-0"
				>
					<div class="mr-3">
						{@html svgUser}
					</div>
					Account</a
				>
				<a
					href="/"
					class="flex items-center px-4 py-2 text-sm text-pickled-bluewood-700 hover:bg-royal-blue-100"
					role="menuitem"
					tabindex="-1"
					id="menu-item-1"
				>
					<div class="mr-3">
						{@html svgSettings}
					</div>
					Setting</a
				>
			</div>
			<div class="py-1" role="none">
				<a
					class="flex items-center px-4 py-2 text-sm text-pickled-bluewood-700 hover:bg-royal-blue-100"
					role="menuitem"
					tabindex="-1"
					id="menu-item-2"
					on:click={handleSignOut}
				>
					<div class="mr-3">
						{@html svgLogout}
					</div>
					Logout</a
				>
			</div>
		</div>
	</div>
</div>
