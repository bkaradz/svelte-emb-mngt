<script lang="ts">
	import { toggleMenu } from '$lib/stores/sideMenuStore';
	import Menu from '$lib/components/Menu.svelte';
	import SideMenu from '$lib/components/SideMenu.svelte';
	import '../styles/app.css';
</script>

<div class="app {$toggleMenu ? 'big-menu' : 'small-menu'}">
	<SideMenu />

	<Menu />

	<main class="main z-0 bg-neutral-200 p-6">
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
