<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import IconButton from '$lib/components/IconButton.svelte';
	import { svgWaves } from '$lib/utility/svgLogos';

	let value = 0;
	const increment = () => (value += 1);
	const decrement = () => (value -= 1);
</script>

<svelte:head>
	<title>Dashboad</title>
</svelte:head>

<div class="custom-number-input h-10 w-24">
	<div class=" flex items-center justify-center">
		<div class="border-gray-900 h-6 w-6 animate-spin rounded-full border-b-2" />
	</div>
	<label for="custom-input-number" class="w-full text-sm font-semibold text-pickled-bluewood-700"
		>Counter Input
	</label>
	<div class="flex w-full flex-row bg-transparent">
		<button
			on:click={decrement}
			class="h-full w-20 cursor-pointer bg-pickled-bluewood-300 text-pickled-bluewood-700 outline-none hover:bg-pickled-bluewood-400 hover:text-pickled-bluewood-700"
		>
			<span class="m-auto text-2xl">−</span>
		</button>
		<input
			type="number"
			class="text-sm my-0 py-0 hover:text-black focus:text-black md:text-basecursor-default flex w-full select-all items-center border-0 bg-pickled-bluewood-300 text-center font-semibold  text-pickled-bluewood-700 outline-none focus:border-0  focus:outline-none"
			name="custom-input-number"
			bind:value
		/>
		<button
			on:click={increment}
			class="h-full w-20 cursor-pointer bg-pickled-bluewood-300 text-pickled-bluewood-700 outline-none hover:bg-pickled-bluewood-400 hover:text-pickled-bluewood-700"
		>
			<span class="m-auto text-2xl">+</span>
		</button>
	</div>
</div>

<div class=" space-x-2 space-y-4">
	<h3 class=" m-4 text-sm font-semibold uppercase tracking-wider text-pickled-bluewood-700">
		Large
	</h3>
	<div class="mb-4">
		<Button size="btn-lg" type="btn-primary">one primary</Button>
		<Button size="btn-lg" type="btn-secondary">secondary</Button>
		<Button size="btn-lg" type="btn-tertiary">tertiary</Button>
		<Button size="btn-lg" type="btn-success">success</Button>
		<Button size="btn-lg" type="btn-warning">warning</Button>
		<Button size="btn-lg" type="btn-danger">danger</Button>
	</div>
	<h3 class=" m-4 text-sm font-semibold uppercase tracking-wider text-pickled-bluewood-700">
		Default
	</h3>
	<div class="mb-4">
		<Button type="btn-primary">primary</Button>
		<Button type="btn-secondary">secondary</Button>
		<Button type="btn-tertiary">tertiary</Button>
		<Button type="btn-success">success</Button>
		<Button type="btn-warning">warning</Button>
		<Button type="btn-danger">danger</Button>
	</div>
	<h3 class=" m-4 text-sm font-semibold uppercase tracking-wider text-pickled-bluewood-700">
		Small
	</h3>
	<div class="mb-4">
		<Button size="btn-sm" type="btn-primary">primary</Button>
		<Button size="btn-sm" type="btn-secondary">secondary</Button>
		<Button size="btn-sm" type="btn-tertiary">tertiary</Button>
		<Button size="btn-sm" type="btn-success">success</Button>
		<Button size="btn-sm" type="btn-warning">warning</Button>
		<Button size="btn-sm" type="btn-danger">danger</Button>
	</div>

	<hr class=" my-4 border border-pickled-bluewood-600" />

	<!-- outlined -->
	<h3 class=" m-4 text-sm font-semibold uppercase tracking-wider text-pickled-bluewood-700">
		Large
	</h3>
	<div class="mb-4">
		<Button outlined="btn-outlined" size="btn-lg" type="btn-primary">primary</Button>
		<Button outlined="btn-outlined" size="btn-lg" type="btn-secondary">secondary</Button>
		<Button outlined="btn-outlined" size="btn-lg" type="btn-tertiary">tertiary</Button>
		<Button outlined="btn-outlined" size="btn-lg" type="btn-success">success</Button>
		<Button outlined="btn-outlined" size="btn-lg" type="btn-warning">warning</Button>
		<Button outlined="btn-outlined" size="btn-lg" type="btn-danger">danger</Button>
	</div>
	<h3 class=" m-4 text-sm font-semibold uppercase tracking-wider text-pickled-bluewood-700">
		Default
	</h3>
	<div class="mb-4">
		<Button outlined="btn-outlined" type="btn-primary">primary</Button>
		<Button outlined="btn-outlined" type="btn-secondary">secondary</Button>
		<Button outlined="btn-outlined" type="btn-tertiary">tertiary</Button>
		<Button outlined="btn-outlined" type="btn-success">success</Button>
		<Button outlined="btn-outlined" type="btn-warning">warning</Button>
		<Button outlined="btn-outlined" type="btn-danger">danger</Button>
	</div>
	<h3 class=" m-4 text-sm font-semibold uppercase tracking-wider text-pickled-bluewood-700">
		Small
	</h3>
	<div class="mb-4">
		<Button outlined="btn-outlined" size="btn-sm" type="btn-primary">primary</Button>
		<Button outlined="btn-outlined" size="btn-sm" type="btn-secondary">secondary</Button>
		<Button outlined="btn-outlined" size="btn-sm" type="btn-tertiary">tertiary</Button>
		<Button outlined="btn-outlined" size="btn-sm" type="btn-success">success</Button>
		<Button outlined="btn-outlined" size="btn-sm" type="btn-warning">warning</Button>
		<Button outlined="btn-outlined" size="btn-sm" type="btn-danger">danger</Button>
	</div>

	<hr class=" my-4 border border-pickled-bluewood-600" />

	<!-- svgWaves Buttons -->

	<h3 class=" m-4 text-sm font-semibold uppercase tracking-wider text-pickled-bluewood-700">
		Large
	</h3>
	<div class="mb-4">
		<IconButton name="primary" size="btn-lg" type="btn-primary">{@html svgWaves}</IconButton>
		<IconButton name="secondary" size="btn-lg" type="btn-secondary">{@html svgWaves}</IconButton>
		<IconButton name="tertiary" size="btn-lg" type="btn-tertiary">{@html svgWaves}</IconButton>
		<IconButton name="success" size="btn-lg" type="btn-success">{@html svgWaves}</IconButton>
		<IconButton name="warning" size="btn-lg" type="btn-warning">{@html svgWaves}</IconButton>
		<IconButton name="danger" size="btn-lg" type="btn-danger">{@html svgWaves}</IconButton>
	</div>
	<h3 class=" m-4 text-sm font-semibold uppercase tracking-wider text-pickled-bluewood-700">
		Default
	</h3>
	<div class="mb-4">
		<IconButton name="primary" type="btn-primary">{@html svgWaves}</IconButton>
		<IconButton name="secondary" type="btn-secondary">{@html svgWaves}</IconButton>
		<IconButton name="tertiary" type="btn-tertiary">{@html svgWaves}</IconButton>
		<IconButton name="success" type="btn-success">{@html svgWaves}</IconButton>
		<IconButton name="warning" type="btn-warning">{@html svgWaves}</IconButton>
		<IconButton name="danger" type="btn-danger">{@html svgWaves}</IconButton>
	</div>
	<h3 class=" m-4 text-sm font-semibold uppercase tracking-wider text-pickled-bluewood-700">
		Small
	</h3>
	<div class="mb-4">
		<IconButton name="primary" size="btn-sm" type="btn-primary">{@html svgWaves}</IconButton>
		<IconButton name="secondary" size="btn-sm" type="btn-secondary">{@html svgWaves}</IconButton>
		<IconButton name="tertiary" size="btn-sm" type="btn-tertiary">{@html svgWaves}</IconButton>
		<IconButton name="success" size="btn-sm" type="btn-success">{@html svgWaves}</IconButton>
		<IconButton name="warning" size="btn-sm" type="btn-warning">{@html svgWaves}</IconButton>
		<IconButton name="danger" size="btn-sm" type="btn-danger">{@html svgWaves}</IconButton>
	</div>

	<hr class=" my-4 border border-pickled-bluewood-600" />
	<!-- svgWaves Only Buttons -->

	<h3 class=" m-4 text-sm font-semibold uppercase tracking-wider text-pickled-bluewood-700">
		Default
	</h3>
	<div class="mb-4">
		<IconButton size="btn-md" type="btn-primary">{@html svgWaves}</IconButton>
		<IconButton size="btn-md" type="btn-secondary">{@html svgWaves}</IconButton>
		<IconButton size="btn-md" type="btn-tertiary">{@html svgWaves}</IconButton>
		<IconButton size="btn-md" type="btn-success">{@html svgWaves}</IconButton>
		<IconButton size="btn-md" type="btn-warning">{@html svgWaves}</IconButton>
		<IconButton size="btn-md" type="btn-danger">{@html svgWaves}</IconButton>
	</div>

	<hr class=" my-4 border border-pickled-bluewood-600" />

	<!-- svgWaves Buttons -->

	<h3 class=" m-4 text-sm font-semibold uppercase tracking-wider text-pickled-bluewood-700">
		Default
	</h3>
	<div class="mb-4">
		<!-- <Input {...props2} name="primary" />
		<Input {...props} name="secondary" />
		<Input {...props} name="tertiary" />
		<Input {...props} name="success" />
		<Input {...props} name="warning" />
		<Input {...props} name="danger" /> -->
	</div>

	<hr class=" my-4 border border-pickled-bluewood-600" />
</div>

<style lang="postcss">
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
