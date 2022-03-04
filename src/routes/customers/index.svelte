<svelte:head>
	<title>Customers</title>
</svelte:head>

<div class="">
	<!-- Heading and Buttons Bar -->
	<div class="main-header flex flex-row items-center justify-between">
		<h1 class="text-2xl font-medium text-slate-700">Customers</h1>

		<button
			class="focus:shadow-outline inline-flex h-10 items-center rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 px-5 text-indigo-100 transition-colors duration-150 hover:from-purple-400 hover:to-purple-600"
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
	<div class="  z-10 mt-4 flex h-14 w-full flex-row items-center justify-between bg-white">
		<div>
			<div class="relative flex flex-row items-center text-left">
				<button
					class="inline-flex w-full items-center justify-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
					id="menu-button"
					aria-expanded="true"
					aria-haspopup="true"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="ml-2 mr-0 h-6 w-6"
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
				<!-- hidden  -->
				<div
					class="absolute left-0 top-9 z-10 mt-2 hidden w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="menu-button"
					tabindex="-1"
				>
					<div class="py-1" role="none">
						<!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
						<a
							href="/"
							class="block px-4 py-2 text-sm text-gray-700"
							role="menuitem"
							tabindex="-1"
							id="menu-item-0">Edit</a
						>
						<a
							href="/"
							class="block px-4 py-2 text-sm text-gray-700"
							role="menuitem"
							tabindex="-1"
							id="menu-item-1">Duplicate</a
						>
					</div>
					<div class="py-1" role="none">
						<a
							href="/"
							class="block px-4 py-2 text-sm text-gray-700"
							role="menuitem"
							tabindex="-1"
							id="menu-item-2">Archive</a
						>
						<a
							href="/"
							class="block px-4 py-2 text-sm text-gray-700"
							role="menuitem"
							tabindex="-1"
							id="menu-item-3">Move</a
						>
					</div>
					<div class="py-1" role="none">
						<a
							href="/"
							class="block px-4 py-2 text-sm text-gray-700"
							role="menuitem"
							tabindex="-1"
							id="menu-item-4">Share</a
						>
						<a
							href="/"
							class="block px-4 py-2 text-sm text-gray-700"
							role="menuitem"
							tabindex="-1"
							id="menu-item-5">Add to favorites</a
						>
					</div>
					<div class="py-1" role="none">
						<a
							href="/"
							class="block px-4 py-2 text-sm text-gray-700"
							role="menuitem"
							tabindex="-1"
							id="menu-item-6">Delete</a
						>
					</div>
				</div>

				<div class="container mx-auto flex">
					<div class="flex rounded border border-solid border-gray-300">
						<button class="flex items-center justify-center border-r px-4">
							<svg
								class="h-6 w-6 text-gray-600"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
							>
								<path
									d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
								/>
							</svg>
						</button>
						<input type="text" class="w-50 px-4 py-1.5" placeholder="Search..." />
					</div>
				</div>
			</div>
			<div />
		</div>
		<!-- Veiw list Buttons -->
		<div class="flex flex-row items-center ">
			<svg
				class="h-8 w-8"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				><path d="M7 7H9V9H7V7Z" fill="currentColor" /><path
					d="M11 7H13V9H11V7Z"
					fill="currentColor"
				/><path d="M17 7H15V9H17V7Z" fill="currentColor" /><path
					d="M7 11H9V13H7V11Z"
					fill="currentColor"
				/><path d="M13 11H11V13H13V11Z" fill="currentColor" /><path
					d="M15 11H17V13H15V11Z"
					fill="currentColor"
				/><path d="M9 15H7V17H9V15Z" fill="currentColor" /><path
					d="M11 15H13V17H11V15Z"
					fill="currentColor"
				/><path d="M17 15H15V17H17V15Z" fill="currentColor" /></svg
			>
			<svg
				class="h-8 w-8"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				><path d="M9 7H7V9H9V7Z" fill="currentColor" /><path
					d="M7 13V11H9V13H7Z"
					fill="currentColor"
				/><path d="M7 15V17H9V15H7Z" fill="currentColor" /><path
					d="M11 15V17H17V15H11Z"
					fill="currentColor"
				/><path d="M17 13V11H11V13H17Z" fill="currentColor" /><path
					d="M17 7V9H11V7H17Z"
					fill="currentColor"
				/></svg
			>
		</div>
	</div>
	<!-- List of Customers -->
	<div class="mt-6">
		<div class="relative h-[175px] w-[300px] border-t-4 border-indigo-500 bg-white shadow-lg">
			<h4 class=" mt-6 ml-4 text-lg font-medium text-gray-600">Reactial</h4>
			<div
				class="absolute bottom-0 left-0 mx-4 mb-4 flex h-[82px] w-[266px] items-center justify-evenly border border-[#DDE9FB]"
			>
				<div>
					<p class=" text-xs font-semibold text-gray-500  ">BALANCE DUE</p>
					<span class="  text-lg  font-bold text-gray-500 "> $230 </span>
				</div>
				<div>
					<p class=" text-xs font-semibold text-gray-500  ">TOTAL INVOICED</p>
					<span class="  text-lg  font-bold text-gray-500 "> $12 650 </span>
				</div>
			</div>
		</div>
	</div>
</div>
