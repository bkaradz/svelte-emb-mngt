<script lang="ts">
	import { goto } from '$app/navigation';
	import Combobox from '$lib/components/Combobox.svelte';
	import Input from '$lib/components/Input.svelte';
	import AddOrder from '$lib/components/orders/addOrder.svelte';
	import { svgArrow } from '$lib/utility/svgLogos';

	const gotoOrders = async () => {
		await goto(`/orders`);
	};
</script>

<AddOrder>
	<div slot="header">
		<div class="flex justify-between items-center">
			<div class="flex items-center">
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
	<div class="flex flex-col m-4 bg-white" slot="page">
		<div class="grow-0 m-4">
			<div class="flex flex-row">
				<div class="grow">
					<Combobox label="Customer" />
					<div class="flex p-4">
						<article class=" mr-24">
							<h4>Customer Details</h4>
							<p>
								Ap #121-8985 Phasellus Av. <br />
								P.O. Box 856, 6546 Eu Avenue <br />
								Ap #901-9426 At, St. <br />
								706-5115 Ultricies Street <br />
								P.O. Box 411, 2950 Nisi. Av.
							</p>
						</article>
						<article>
							<h4>Customer Address</h4>
							<p>
								Ap #121-8985 Phasellus Av. <br />
								P.O. Box 856, 6546 Eu Avenue <br />
								Ap #901-9426 At, St. <br />
								706-5115 Ultricies Street <br />
								P.O. Box 411, 2950 Nisi. Av.
							</p>
						</article>
					</div>
				</div>
				<div class="grow-0">
					<Combobox label="Quotation #" />
					<Input label="Date" />
					<Input label="Due Date" />
					<Combobox label="PriceList" />
				</div>
			</div>
		</div>
		<div class=" bg-active grow m-4">table</div>
	</div>
</AddOrder>

<style lang="postcss">
</style>
