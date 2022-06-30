<script lang="ts">
	import { goto } from '$app/navigation';
	import AddOrder from '$lib/components/orders/addOrder.svelte';
	import { svgArrow } from '$lib/utility/svgLogos';

	const gotoOrders = async () => {
		await goto(`/orders`);
	};
</script>

<AddOrder>
	<div slot="header">
		<div class="flex justify-between">
			<div class="flex">
				<button class="mr-3" on:click={gotoOrders}>
					{@html svgArrow}
				</button>
				<h1 class="text-slate-700 text-2xl font-medium">New Quotation</h1>
			</div>
			<div>
				<button class="bg-royal-blue-500  px-5 py-2 rounded text-white mr-4">Cancel</button>
				<button class="bg-royal-blue-500  px-5 py-2 rounded text-white" type="submit">Done</button>
			</div>
		</div>
	</div>
	<div slot="page">
		<h1>Page</h1>
	</div>
</AddOrder>

<style>
</style>
