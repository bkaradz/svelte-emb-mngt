<script>
	let value = 0;
	const increment = () => (value += 1);
	const decrement = () => (value -= 1);
</script>

<!-- <script lang="ts">
	import { USD } from '@dinero.js/currencies';
	import { dinero, toFormat, toSnapshot, type Dinero } from 'dinero.js';

	const transformer = (props) => `${props.currency.code} ${props.amount}`;

	const d: Dinero = dinero({ amount: 999, currency: USD });

	console.log('Snapshot:', toSnapshot(d));
	console.log('Formatted:', toFormat(d, transformer));
</script> -->

<svelte:head>
	<title>Products</title>
</svelte:head>

<!-- component -->
<div class="custom-number-input h-10 w-24">
	<label for="custom-input-number" class="w-full text-sm font-semibold text-pickled-bluewood-700"
		>Counter Input
	</label>
	<div class="relative mt-1 flex h-10 w-full flex-row rounded-lg bg-transparent">
		<button
			on:click={decrement}
			data-action="decrement"
			class=" h-full w-20 cursor-pointer rounded-l bg-pickled-bluewood-300 text-pickled-bluewood-700 outline-none hover:bg-pickled-bluewood-400 hover:text-pickled-bluewood-700"
		>
			<span class="m-auto text-2xl font-thin">−</span>
		</button>
		<input
			type="number"
			class=" text-md hover:text-black focus:text-black md:text-basecursor-default flex w-full select-all items-center border-0 bg-pickled-bluewood-300 text-center font-semibold  text-pickled-bluewood-700 outline-none focus:border-0  focus:outline-none"
			name="custom-input-number"
			bind:value
		/>
		<button
			on:click={increment}
			data-action="increment"
			class="h-full w-20 cursor-pointer rounded-r bg-pickled-bluewood-300 text-pickled-bluewood-600 hover:bg-pickled-bluewood-400 hover:text-pickled-bluewood-700"
		>
			<span class="m-auto text-2xl font-thin">+</span>
		</button>
	</div>
</div>

<style>
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.custom-number-input input:focus {
		outline: none !important;
	}

	.custom-number-input button:focus {
		outline: none !important;
	}
</style>
