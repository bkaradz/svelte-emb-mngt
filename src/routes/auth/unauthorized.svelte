<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session }) => {
		if (session?.user?.authenticated) {
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

<svelte:head>
	<title>Unauthorized</title>
</svelte:head>

<h1 class=" text-6xl text-danger">Unauthorized</h1>
