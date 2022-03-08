<script lang="ts">
	import Button from '$lib/components/Button.svelte';
</script>

<svelte:head>
	<title>Dashboad</title>
</svelte:head>

<div class=" space-x-2 space-y-4">
	<h3 class=" m-4 text-sm font-semibold uppercase tracking-wider text-gray-700">Large</h3>
	<div class="mb-4">
		<Button size="btn-lg" type="btn-primary">one primary</Button>
		<Button size="btn-lg" type="btn-secondary">secondary</Button>
		<Button size="btn-lg" type="btn-tertiary">tertiary</Button>
		<Button size="btn-lg" type="btn-success">success</Button>
		<Button size="btn-lg" type="btn-warning">warning</Button>
		<Button size="btn-lg" type="btn-danger">danger</Button>
	</div>
	<h3 class=" m-4 text-sm font-semibold uppercase tracking-wider text-gray-700">Default</h3>
	<div class="mb-4">
		<Button type="btn-primary">primary</Button>
		<Button type="btn-secondary">secondary</Button>
		<Button type="btn-tertiary">tertiary</Button>
		<Button type="btn-success">success</Button>
		<Button type="btn-warning">warning</Button>
		<Button type="btn-danger">danger</Button>
	</div>
	<h3 class=" m-4 text-sm font-semibold uppercase tracking-wider text-gray-700">Small</h3>
	<div class="mb-4">
		<Button size="btn-sm" type="btn-primary">primary</Button>
		<Button size="btn-sm" type="btn-secondary">secondary</Button>
		<Button size="btn-sm" type="btn-tertiary">tertiary</Button>
		<Button size="btn-sm" type="btn-success">success</Button>
		<Button size="btn-sm" type="btn-warning">warning</Button>
		<Button size="btn-sm" type="btn-danger">danger</Button>
	</div>

	<hr class=" my-4 border border-gray-600" />

	<!-- outlined -->
	<h3 class=" m-4 text-sm font-semibold uppercase tracking-wider text-gray-700">Large</h3>
	<div class="mb-4">
		<Button outlined="btn-outlined" size="btn-lg" type="btn-primary">primary</Button>
		<Button outlined="btn-outlined" size="btn-lg" type="btn-secondary">secondary</Button>
		<Button outlined="btn-outlined" size="btn-lg" type="btn-tertiary">tertiary</Button>
		<Button outlined="btn-outlined" size="btn-lg" type="btn-success">success</Button>
		<Button outlined="btn-outlined" size="btn-lg" type="btn-warning">warning</Button>
		<Button outlined="btn-outlined" size="btn-lg" type="btn-danger">danger</Button>
	</div>
	<h3 class=" m-4 text-sm font-semibold uppercase tracking-wider text-gray-700">Default</h3>
	<div class="mb-4">
		<Button outlined="btn-outlined" type="btn-primary">primary</Button>
		<Button outlined="btn-outlined" type="btn-secondary">secondary</Button>
		<Button outlined="btn-outlined" type="btn-tertiary">tertiary</Button>
		<Button outlined="btn-outlined" type="btn-success">success</Button>
		<Button outlined="btn-outlined" type="btn-warning">warning</Button>
		<Button outlined="btn-outlined" type="btn-danger">danger</Button>
	</div>
	<h3 class=" m-4 text-sm font-semibold uppercase tracking-wider text-gray-700">Small</h3>
	<div class="mb-4">
		<Button outlined="btn-outlined" size="btn-sm" type="btn-primary">primary</Button>
		<Button outlined="btn-outlined" size="btn-sm" type="btn-secondary">secondary</Button>
		<Button outlined="btn-outlined" size="btn-sm" type="btn-tertiary">tertiary</Button>
		<Button outlined="btn-outlined" size="btn-sm" type="btn-success">success</Button>
		<Button outlined="btn-outlined" size="btn-sm" type="btn-warning">warning</Button>
		<Button outlined="btn-outlined" size="btn-sm" type="btn-danger">danger</Button>
	</div>

	<hr class=" my-4 border border-gray-600" />
	<Button type="btn-primary">
		<svg
			class="inline-block h-8 w-8"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			><path d="M7 7H9V9H7V7Z" fill="currentColor" /><path
				d="M11 7H13V9H11V7Z"
				fill="currentColor"
			/><path d="M17 7H15V9H17V7Z" fill="currentColor" /><path
				d="M7 11H9V13H7V11Z"
				fill="currentColor"
			/><path d="M13 11H11V13H13V11Z" fill="currentColor" /><path
				d="M15 11H17V13H15V11Z"
				fill="currentColor"
			/><path d="M9 15H7V17H9V15Z" fill="currentColor" /><path
				d="M11 15H13V17H11V15Z"
				fill="currentColor"
			/><path d="M17 15H15V17H17V15Z" fill="currentColor" /></svg
		>
		Primary
	</Button>
</div>
