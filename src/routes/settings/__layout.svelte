<div class="flex h-full w-full space-x-4">
	<div
		class="h-full grow-0 overflow-y-auto rounded bg-white py-4 px-3 dark:bg-pickled-bluewood-800"
	>
		<aside class=" w-52 " aria-label="Sidebar">
			<ul class="space-y-2">
				<li>
					<a
						href="/settings"
						class="flex items-center rounded  border border-pickled-bluewood-100 p-2 text-base font-normal text-pickled-bluewood-900 hover:bg-pickled-bluewood-100 dark:text-white dark:hover:bg-pickled-bluewood-700"
					>
						<svg
							class="h-5 w-5 text-pickled-bluewood-500 transition duration-75 group-hover:text-pickled-bluewood-900 dark:text-pickled-bluewood-400 dark:group-hover:text-white"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" /><path
								d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"
							/></svg
						>

						<span class="ml-3 text-sm">Dashboard</span>
					</a>
				</li>
				<li>
					<a
						href="/settings/options"
						class="flex items-center rounded  border border-pickled-bluewood-100 p-2 text-base font-normal text-pickled-bluewood-900 hover:bg-pickled-bluewood-100 dark:text-white dark:hover:bg-pickled-bluewood-700"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 text-pickled-bluewood-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
							/>
						</svg>

						<span class="ml-3 text-sm">Option</span>
					</a>
				</li>
			</ul>
		</aside>
	</div>
	<div class="h-full grow rounded bg-white p-5">
		<slot />
	</div>
</div>
