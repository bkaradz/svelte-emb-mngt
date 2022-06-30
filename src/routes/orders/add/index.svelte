<script lang="ts">
	import AddOrder from '$lib/components/orders/addOrder.svelte';
</script>

<AddOrder>
	<div slot="header">
		<h1 class=" text-2xl">Header</h1>
	</div>
	<div slot="page">
		<h1>Page</h1>
	</div>
</AddOrder>

<style>
</style>
