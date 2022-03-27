<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session }) => {
		// console.log('reset session back', session);

		if (session.user.authenticated) {
			return {
				status: 302,
				redirect: '/'
			};
		}
		return {
			props: {
				user: session
			}
		};
	};
</script>

<script lang="ts">
	import { session } from '$app/stores';
	import Loading from '$lib/components/Loading.svelte';
	// console.log('reset store session front', $session);
	// export let user;
	// console.log('user user front', user);
	import { getContext, onMount } from 'svelte';

	import { page } from '$app/stores';

	let isPageLoading = true;

	onMount(() => (isPageLoading = false));

	// const pageLoaded = () => (isPageLoading = false);

	const navList = [
		{
			url: '/auth/login',
			name: 'Login',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class=" inline-block h-6 w-6" fill="none" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
</svg>`
		},
		{
			url: '/auth/register',
			name: 'Register',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class=" inline-block h-6 w-6" fill="none" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
</svg>`
		}
	];
</script>

{#if isPageLoading}
	<Loading />
{/if}

<div class="height_max flex flex-col items-center bg-pickled-bluewood-50">
	<div
		class="mb-16 flex h-[70px] w-screen flex-row items-center justify-center bg-pickled-bluewood-100 drop-shadow-md"
	>
		<ul class="flex flex-row pl-1">
			{#each navList as tag (tag.name)}
				<li>
					<a
						class="relative m-1 block appearance-none border  bg-transparent px-3 py-2  font-semibold
						{$page.url.pathname === tag.url
							? `border-royal-blue-600 text-royal-blue-600 hover:border-success hover:text-success`
							: `border-pickled-bluewood-600 text-pickled-bluewood-600 hover:border-success hover:text-success`}
						"
						href={tag.url}
					>
						<span>{@html tag.icon}</span> <span class="ml-1">{tag.name}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>

	<slot />
</div>

<style>
	.height_max {
		height: 100vh !important;
	}
	.loader {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: grid;
		place-items: center;
		background: whitesmoke;
		z-index: 99999;
	}
	.svgHeight {
		width: 100px;
		height: 100px;
		color: blue;
	}
</style>
