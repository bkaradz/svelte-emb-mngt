<div class="height_max flex flex-col items-center bg-gray-50">
	<div
		class="  mb-16 flex h-[70px] w-screen flex-row items-center justify-center bg-neutral-100 drop-shadow-md"
	>
		<a
			class="relative block appearance-none rounded-none rounded-l-md border border-gray-300 bg-transparent px-3 py-2  font-semibold text-gray-900 hover:bg-indigo-700 hover:text-gray-300"
			href="/auth/login">Login</a
		>
		<a
			class="relative block appearance-none rounded-none rounded-r-md border border-gray-300  bg-transparent px-3 py-2  font-semibold text-gray-900 hover:bg-indigo-700 hover:text-gray-300"
			href="/auth/register">Register</a
		>
	</div>

	<slot />
</div>

<style>
	.height_max {
		height: 100vh !important;
	}
</style>
