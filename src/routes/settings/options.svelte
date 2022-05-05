<div class="border-gray-200 dark:border-gray-700 mb-4 border-b">
	<ul
		class="-mb-px flex flex-wrap text-center text-sm font-medium"
		id="myTab"
		data-tabs-toggle="#myTabContent"
		role="tablist"
	>
		<li class="mr-2" role="presentation">
			<button
				class="inline-block rounded-t-lg border-b-2 p-4"
				id="profile-tab"
				data-tabs-target="#profile"
				type="button"
				role="tab"
				aria-controls="profile"
				aria-selected="false">Profile</button
			>
		</li>
		<li class="mr-2" role="presentation">
			<button
				class="hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 inline-block rounded-t-lg border-b-2 border-transparent p-4"
				id="dashboard-tab"
				data-tabs-target="#dashboard"
				type="button"
				role="tab"
				aria-controls="dashboard"
				aria-selected="false">Dashboard</button
			>
		</li>
		<li class="mr-2" role="presentation">
			<button
				class="hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 inline-block rounded-t-lg border-b-2 border-transparent p-4"
				id="settings-tab"
				data-tabs-target="#settings"
				type="button"
				role="tab"
				aria-controls="settings"
				aria-selected="false">Settings</button
			>
		</li>
		<li role="presentation">
			<button
				class="hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 inline-block rounded-t-lg border-b-2 border-transparent p-4"
				id="contacts-tab"
				data-tabs-target="#contacts"
				type="button"
				role="tab"
				aria-controls="contacts"
				aria-selected="false">Contacts</button
			>
		</li>
	</ul>
</div>
<div id="myTabContent">
	<div
		class="bg-gray-50 dark:bg-gray-800 hidden rounded-lg p-4"
		id="profile"
		role="tabpanel"
		aria-labelledby="profile-tab"
	>
		<p class="text-gray-500 dark:text-gray-400 text-sm">
			This is some placeholder content the <strong class="text-gray-800 font-medium dark:text-white"
				>Profile tab's associated content</strong
			>. Clicking another tab will toggle the visibility of this one for the next. The tab
			JavaScript swaps classes to control the content visibility and styling.
		</p>
	</div>
	<div
		class="bg-gray-50 dark:bg-gray-800 hidden rounded-lg p-4"
		id="dashboard"
		role="tabpanel"
		aria-labelledby="dashboard-tab"
	>
		<p class="text-gray-500 dark:text-gray-400 text-sm">
			This is some placeholder content the <strong class="text-gray-800 font-medium dark:text-white"
				>Dashboard tab's associated content</strong
			>. Clicking another tab will toggle the visibility of this one for the next. The tab
			JavaScript swaps classes to control the content visibility and styling.
		</p>
	</div>
	<div
		class="bg-gray-50 dark:bg-gray-800 hidden rounded-lg p-4"
		id="settings"
		role="tabpanel"
		aria-labelledby="settings-tab"
	>
		<p class="text-gray-500 dark:text-gray-400 text-sm">
			This is some placeholder content the <strong class="text-gray-800 font-medium dark:text-white"
				>Settings tab's associated content</strong
			>. Clicking another tab will toggle the visibility of this one for the next. The tab
			JavaScript swaps classes to control the content visibility and styling.
		</p>
	</div>
	<div
		class="bg-gray-50 dark:bg-gray-800 hidden rounded-lg p-4"
		id="contacts"
		role="tabpanel"
		aria-labelledby="contacts-tab"
	>
		<p class="text-gray-500 dark:text-gray-400 text-sm">
			This is some placeholder content the <strong class="text-gray-800 font-medium dark:text-white"
				>Contacts tab's associated content</strong
			>. Clicking another tab will toggle the visibility of this one for the next. The tab
			JavaScript swaps classes to control the content visibility and styling.
		</p>
	</div>
</div>
