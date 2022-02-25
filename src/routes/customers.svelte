<svelte:head>
	<title>Customers</title>
</svelte:head>

<div class="p-6">
	<!-- Heading and Buttons Bar -->
	<div class="main-header flex flex-row items-center justify-between">
		<h1 class="text-2xl text-slate-700 font-medium">Customers</h1>

		<button
			class="inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg focus:shadow-outline hover:from-purple-400 hover:to-purple-600"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 6v6m0 0v6m0-6h6m-6 0H6"
				/>
			</svg>

			<span class="pl-1">Add New</span>
		</button>
	</div>
	<!-- Search and View Bar -->
	<div class="h-14 w-full bg-white flex flex-row items-center justify-between mt-4">
		<div />
		<div class="relative inline-block text-left">
			<div>
				<button
					class="inline-flex items-center justify-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
					id="menu-button"
					aria-expanded="true"
					aria-haspopup="true"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 ml-2 mr-0"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
						/>
					</svg>
					Sort by Name
					<!-- Heroicon name: solid/chevron-down -->
					<svg
						class="-mr-1 ml-2 h-5 w-5 text-blue-600"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			</div>

			<div
				class="origin-top-right hidden absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="menu-button"
				tabindex="-1"
			>
				<div class="py-1" role="none">
					<!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
					<a
						href="/"
						class="text-gray-700 block px-4 py-2 text-sm"
						role="menuitem"
						tabindex="-1"
						id="menu-item-0">Edit</a
					>
					<a
						href="/"
						class="text-gray-700 block px-4 py-2 text-sm"
						role="menuitem"
						tabindex="-1"
						id="menu-item-1">Duplicate</a
					>
				</div>
				<div class="py-1" role="none">
					<a
						href="/"
						class="text-gray-700 block px-4 py-2 text-sm"
						role="menuitem"
						tabindex="-1"
						id="menu-item-2">Archive</a
					>
					<a
						href="/"
						class="text-gray-700 block px-4 py-2 text-sm"
						role="menuitem"
						tabindex="-1"
						id="menu-item-3">Move</a
					>
				</div>
				<div class="py-1" role="none">
					<a
						href="/"
						class="text-gray-700 block px-4 py-2 text-sm"
						role="menuitem"
						tabindex="-1"
						id="menu-item-4">Share</a
					>
					<a
						href="/"
						class="text-gray-700 block px-4 py-2 text-sm"
						role="menuitem"
						tabindex="-1"
						id="menu-item-5">Add to favorites</a
					>
				</div>
				<div class="py-1" role="none">
					<a
						href="/"
						class="text-gray-700 block px-4 py-2 text-sm"
						role="menuitem"
						tabindex="-1"
						id="menu-item-6">Delete</a
					>
				</div>
			</div>
		</div>
	</div>
	<!-- List of Customers -->
	<div class="mt-6 " />
</div>
