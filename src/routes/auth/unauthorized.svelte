<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session }) => {
		console.log('🚀 ~ file: unauthorized.svelte ~ line 5 ~ constload:Load= ~ session', session);
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

<h1 class=" text-6xl text-danger">Unauthorized</h1>
