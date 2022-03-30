<script lang="ts">
	import { USD } from '@dinero.js/currencies';
	import { dinero, toFormat, toSnapshot, type Dinero } from 'dinero.js';

	const transformer = (props) => `${props.currency.code} ${props.amount}`;

	const d: Dinero = dinero({ amount: 999, currency: USD });

	console.log('Snapshot:', toSnapshot(d));
	console.log('Formatted:', toFormat(d, transformer));
</script>

<svelte:head>
	<title>Products</title>
</svelte:head>
