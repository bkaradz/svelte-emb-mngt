<script lang="ts">
	import { page } from '$app/stores';
	import { toggleMenu, anchorList } from '../stores/sideMenuStore';
	let src = '../../static/small_logo.png';
	let location: string;
	$: location;
	if (typeof window !== 'undefined') {
		location = window.location.pathname;
	}
</script>

<nav class="sidebar relative z-40 flex flex-col bg-blue-600">
	<img {src} class="h-16 object-scale-down p-1 pt-3" alt="Company Logo" />
	<input
		type="checkbox"
		class="hidden"
		name="humberger"
		id="humberger"
		bind:checked={$toggleMenu}
	/>
	<label for="humberger" class="absolute top-6 -right-8 hover:cursor-pointer">
		{#if $toggleMenu}
			<svg
				class="h-7 w-7 text-purple-600 hover:text-blue-600"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 19l-7-7m0 0l7-7m-7 7h18"
				/></svg
			>
		{:else}
			<svg
				class="w-7 h-7 text-purple-600 hover:text-blue-600"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M14 5l7 7m0 0l-7 7m7-7H3"
				/></svg
			>
		{/if}
	</label>
	<div>
		<ul class="flex flex-col pl-1">
			{#each $anchorList as tag}
				<li class="mt-2 flex w-full">
					<a
						href={tag.url}
						class="flex w-full flex-row rounded-l-lg p-4 {$page.url.pathname === tag.url
							? `bg-gray-200 text-purple-600 hover:bg-purple-400 hover:text-blue-600`
							: `bg-blue-500 text-white hover:bg-purple-500 hover:text-white`}"
					>
						<span>{@html tag.icon}</span> <span class="ml-3">{$toggleMenu ? tag.name : ''}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>

<style>
</style>
