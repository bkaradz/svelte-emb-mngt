<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session }) => {
		if (!session?.user?.authenticated) {
			return {
				status: 302,
				redirect: '/auth/unauthorized'
			};
		}
		return {
			props: {
				user: session.user
			}
		};
	};
</script>

<script lang="ts">
	import { session } from '$app/stores';
	import { toggleMenu } from '$lib/stores/sideMenuStore';
	import Menu from '$lib/components/Menu.svelte';
	import SideMenu from '$lib/components/SideMenu.svelte';
	import '../styles/app.css';
	import { goto } from '$app/navigation';

	function redirectToLogin() {
		if (typeof window !== 'undefined') {
			goto('/auth/signIn');
		}
	}
</script>

<div class="app flex h-screen {$toggleMenu ? 'big-menu' : 'small-menu'}">
	<SideMenu />
	<Menu />
	<main class="main z-0 flex flex-1 overflow-hidden bg-royal-blue-50 p-6">
		<slot />
	</main>
</div>

<style>
	.app {
		display: grid;
		width: 100vw;
		height: 100vh;
		grid-template-areas:
			'sidebar menu'
			'sidebar main';
		grid-template-rows: 70px 1fr;
	}

	.small-menu {
		grid-template-columns: 60px 1fr;
	}

	.big-menu {
		grid-template-columns: 200px 1fr;
	}

	.main {
		grid-area: main;
	}
</style>
