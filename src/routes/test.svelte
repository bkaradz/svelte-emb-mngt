<script>
	import { svgSelector, svgSort, svgDotsVertical } from '$lib/utility/svgLogos';
	import { Menu, MenuItems, MenuItem, MenuButton } from '@rgossiaux/svelte-headlessui';
</script>

<h1>Test</h1>

<Menu as="div" class="relative">
	<MenuButton
		class="btn inline-flex w-full items-center justify-center px-2 py-2 text-sm text-pickled-bluewood-500 hover:bg-pickled-bluewood-50 focus:outline-none focus:ring-2 focus:ring-royal-blue-50 focus:ring-offset-2 focus:ring-offset-pickled-bluewood-100"
		id="menu-button"
		aria-expanded="true"
		aria-haspopup="true"
	>
		<span>
			{@html svgSort}
		</span>

		Sort by Name
		<span>
			{@html svgSelector}
		</span>
	</MenuButton>

	<MenuItems
		class=" absolute left-0 top-9 z-10 mt-2 w-40 origin-top-right divide-y divide-pickled-bluewood-100 bg-white shadow-lg ring-1 ring-royal-blue-300 focus:outline-none"
		role="menu"
		aria-orientation="vertical"
		aria-labelledby="menu-button"
		tabindex="-1"
	>
		<div class="py-1" role="none">
			<MenuItem active={true}>
				<a
					href="/"
					class="block px-4 py-2 text-sm text-pickled-bluewood-700 hover:bg-royal-blue-500 hover:text-white"
					role="menuitem"
					tabindex="-1"
					id="menu-item-0">Edit</a
				>
			</MenuItem>
			<MenuItem>
				<a
					href="/"
					class="block px-4 py-2 text-sm text-pickled-bluewood-700 hover:bg-royal-blue-500 hover:text-white"
					role="menuitem"
					tabindex="-1"
					id="menu-item-1">Duplicate</a
				>
			</MenuItem>
		</div>
		<div class="py-1" role="none">
			<MenuItem>
				<a
					href="/"
					class="block px-4 py-2 text-sm text-pickled-bluewood-700 hover:bg-royal-blue-500 hover:text-white"
					role="menuitem"
					tabindex="-1"
					id="menu-item-2">Archive</a
				>
			</MenuItem>
			<MenuItem>
				<a
					href="/"
					class="block px-4 py-2 text-sm text-pickled-bluewood-700 hover:bg-royal-blue-500 hover:text-white"
					role="menuitem"
					tabindex="-1"
					id="menu-item-3">Move</a
				>
			</MenuItem>
		</div>
		<div class="py-1" role="none">
			<MenuItem>
				<a
					href="/"
					class="block px-4 py-2 text-sm text-pickled-bluewood-700 hover:bg-royal-blue-500 hover:text-white"
					role="menuitem"
					tabindex="-1"
					id="menu-item-4">Share</a
				>
			</MenuItem>
			<MenuItem>
				<a
					href="/"
					class="block px-4 py-2 text-sm text-pickled-bluewood-700 hover:bg-royal-blue-500 hover:text-white"
					role="menuitem"
					tabindex="-1"
					id="menu-item-5">Add to favorites</a
				>
			</MenuItem>
		</div>
		<div class="py-1" role="none">
			<MenuItem>
				<a
					href="/"
					class="block px-4 py-2 text-sm text-pickled-bluewood-700 hover:bg-royal-blue-500 hover:text-white"
					role="menuitem"
					tabindex="-1"
					id="menu-item-6">Delete</a
				>
			</MenuItem>
		</div>
	</MenuItems>
</Menu>

<Menu as="div" class="relative">
	<MenuButton
		class="btn inline-flex w-full items-center justify-center px-2 py-2 text-sm text-pickled-bluewood-500 hover:bg-pickled-bluewood-50 focus:outline-none focus:ring-2 focus:ring-royal-blue-50 focus:ring-offset-2 focus:ring-offset-pickled-bluewood-100"
		id="menu-button"
		aria-expanded="true"
		aria-haspopup="true"
	>
		<span>
			{@html svgDotsVertical}
		</span>
	</MenuButton>

	<MenuItems
		class=" absolute right-0 top-9 z-10 mt-2 w-20 origin-top-right divide-y divide-pickled-bluewood-100 bg-white shadow-lg ring-1 ring-royal-blue-300 focus:outline-none"
		role="menu"
		aria-orientation="vertical"
		aria-labelledby="menu-button"
		tabindex="-1"
	>
		<div class="py-1" role="none">
			<MenuItem active={true}>
				<a
					href="/"
					class="block px-4 py-2 text-sm text-pickled-bluewood-700 hover:bg-royal-blue-500 hover:text-white"
					role="menuitem"
					tabindex="-1"
					id="menu-item-0">Edit</a
				>
			</MenuItem>
			<MenuItem>
				<a
					href="/"
					class="block px-4 py-2 text-sm text-pickled-bluewood-700 hover:bg-royal-blue-500 hover:text-white"
					role="menuitem"
					tabindex="-1"
					id="menu-item-1">Delete</a
				>
			</MenuItem>
		</div>
	</MenuItems>
</Menu>

<input
	class=" file:btn-primary file:border-none file:bg-royal-blue-600 file:text-white"
	type="file"
	name="Upload"
	id=""
/>

<div class="relative mt-4 mb-4 overflow-hidden">
	<input
		class="btn btn-primary absolute block cursor-pointer opacity-0"
		type="file"
		name="vacancyImageFiles"
	/>
	<button
		class="inline-flex w-full items-center bg-royal-blue-500 py-2 px-2 font-bold text-white hover:bg-royal-blue-600"
	>
		<svg fill="#FFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
		</svg>
	</button>
</div>
