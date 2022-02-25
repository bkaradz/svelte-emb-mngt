<script>
	import { toggleMenu } from '../stores/side-menu-store';
	import Menu from '../components/menu.svelte';
	import SideMenu from '../components/side-menu.svelte';
	import '../styles/app.css';
</script>

<div class="app {$toggleMenu ? 'big-menu' : 'small-menu'}">
	<SideMenu />
	<!-- <div class="sidebar bg-blue-600">
	</div> -->
	<Menu />
	<!-- <div class="menu bg-gray-300">
	</div> -->
	<div class="main bg-neutral-200 z-0">
		<slot />
	</div>
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
