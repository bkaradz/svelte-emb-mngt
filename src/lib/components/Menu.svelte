<script lang="ts">
	import { clickOutside } from '$lib/utility/clickOutside';
	import logger from '$lib/utility/logger';
	import { goto } from '$app/navigation';
	import { svgLogout, svgMessages, svgSettings, svgUser } from '$lib/utility/svgLogos';
	import { Menu, MenuItems, MenuItem, MenuButton } from '@rgossiaux/svelte-headlessui';
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

	<Menu as="div" class="relative mr-6">
		<MenuButton
			class="mr-2 flex h-12 w-12 items-center justify-center rounded-full border border-solid border-pickled-bluewood-200 bg-royal-blue-600"
			id="menu-button"
			aria-expanded="true"
			aria-haspopup="true"
		>
			<p class="text-white">B K</p>
		</MenuButton>

		<MenuItems
			class=" absolute right-0 top-9 z-10 mt-2 w-40 origin-top-right divide-y divide-pickled-bluewood-100 rounded-md bg-white shadow-lg ring-1 ring-royal-blue-300 focus:outline-none"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="menu-button"
			tabindex="-1"
		>
			<div class="py-1" role="none">
				<MenuItem active={true}>
					<a
						href="/"
						class="flex items-center px-4 py-2 text-sm text-pickled-bluewood-700 hover:bg-royal-blue-500 hover:text-white"
						role="menuitem"
						tabindex="-1"
						id="menu-item-0"
					>
						<div class="mr-3">
							{@html svgUser}
						</div>
						Account
					</a>
				</MenuItem>
				<MenuItem>
					<a
						href="/"
						class="flex items-center px-4 py-2 text-sm text-pickled-bluewood-700 hover:bg-royal-blue-500 hover:text-white"
						role="menuitem"
						tabindex="-1"
						id="menu-item-1"
					>
						<div class="mr-3">
							{@html svgSettings}
						</div>
						Setting
					</a>
				</MenuItem>
			</div>
			<div class="py-1" role="none">
				<MenuItem>
					<a
						href="/"
						class="flex items-center px-4 py-2 text-sm text-pickled-bluewood-700 hover:bg-royal-blue-500 hover:text-white"
						role="menuitem"
						tabindex="-1"
						id="menu-item-2"
						on:click={handleSignOut}
					>
						<div class="mr-3">
							{@html svgLogout}
						</div>
						Logout
					</a>
				</MenuItem>
			</div>
		</MenuItems>
	</Menu>
</div>
