<!-- <script context="module">
	export async function load({ session }) {
		console.log('session', session);
		if (!session.authenticated) {
			return {
				status: 302,
				redirect: '/auth/unauthorized'
			};
		}
		return {
			props: {
				user: session
			}
		};
	}
</script> -->
<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import IconButton from '$lib/components/IconButton.svelte';
	import Input from '$lib/components/Input.svelte';
	import Index from './contacts/index.svelte';

	let icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="h-4 w-4">
  <path fill-rule="evenodd" d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.414 5 5 0 010-7.07 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415zM10 9a1 1 0 011 1v.01a1 1 0 11-2 0V10a1 1 0 011-1z" clip-rule="evenodd"/>
</svg>
`;

	const props = {
		value: '',
		size: '',
		label: 'Testing',
		outlined: '',
		messages: ['testing'],
		name: 'Testing',
		validityClass: '',
		placeholder: 'Testing',
		required: true,
		type: ''
	};
	const props2 = {
		value: '',
		size: '',
		label: 'Testing',
		outlined: '',
		messages: ['testing'],
		name: 'Testing',
		validityClass: '',
		placeholder: 'Testing',
		required: true,
		type: ''
	};

	// $: console.log('props', props2.value);

	// let name = 'with icon';
	let name = '';
</script>

<svelte:head>
	<title>Dashboad</title>
</svelte:head>

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

	<!-- Icon Buttons -->

	<h3 class=" m-4 text-sm font-semibold uppercase tracking-wider text-pickled-bluewood-700">
		Large
	</h3>
	<div class="mb-4">
		<IconButton name="primary" size="btn-lg" type="btn-primary">{@html icon}</IconButton>
		<IconButton name="secondary" size="btn-lg" type="btn-secondary">{@html icon}</IconButton>
		<IconButton name="tertiary" size="btn-lg" type="btn-tertiary">{@html icon}</IconButton>
		<IconButton name="success" size="btn-lg" type="btn-success">{@html icon}</IconButton>
		<IconButton name="warning" size="btn-lg" type="btn-warning">{@html icon}</IconButton>
		<IconButton name="danger" size="btn-lg" type="btn-danger">{@html icon}</IconButton>
	</div>
	<h3 class=" m-4 text-sm font-semibold uppercase tracking-wider text-pickled-bluewood-700">
		Default
	</h3>
	<div class="mb-4">
		<IconButton name="primary" type="btn-primary">{@html icon}</IconButton>
		<IconButton name="secondary" type="btn-secondary">{@html icon}</IconButton>
		<IconButton name="tertiary" type="btn-tertiary">{@html icon}</IconButton>
		<IconButton name="success" type="btn-success">{@html icon}</IconButton>
		<IconButton name="warning" type="btn-warning">{@html icon}</IconButton>
		<IconButton name="danger" type="btn-danger">{@html icon}</IconButton>
	</div>
	<h3 class=" m-4 text-sm font-semibold uppercase tracking-wider text-pickled-bluewood-700">
		Small
	</h3>
	<div class="mb-4">
		<IconButton name="primary" size="btn-sm" type="btn-primary">{@html icon}</IconButton>
		<IconButton name="secondary" size="btn-sm" type="btn-secondary">{@html icon}</IconButton>
		<IconButton name="tertiary" size="btn-sm" type="btn-tertiary">{@html icon}</IconButton>
		<IconButton name="success" size="btn-sm" type="btn-success">{@html icon}</IconButton>
		<IconButton name="warning" size="btn-sm" type="btn-warning">{@html icon}</IconButton>
		<IconButton name="danger" size="btn-sm" type="btn-danger">{@html icon}</IconButton>
	</div>

	<hr class=" my-4 border border-pickled-bluewood-600" />
	<!-- Icon Only Buttons -->

	<h3 class=" m-4 text-sm font-semibold uppercase tracking-wider text-pickled-bluewood-700">
		Default
	</h3>
	<div class="mb-4">
		<IconButton size="btn-md" type="btn-primary">{@html icon}</IconButton>
		<IconButton size="btn-md" type="btn-secondary">{@html icon}</IconButton>
		<IconButton size="btn-md" type="btn-tertiary">{@html icon}</IconButton>
		<IconButton size="btn-md" type="btn-success">{@html icon}</IconButton>
		<IconButton size="btn-md" type="btn-warning">{@html icon}</IconButton>
		<IconButton size="btn-md" type="btn-danger">{@html icon}</IconButton>
	</div>

	<hr class=" my-4 border border-pickled-bluewood-600" />

	<!-- Icon Buttons -->

	<h3 class=" m-4 text-sm font-semibold uppercase tracking-wider text-pickled-bluewood-700">
		Default
	</h3>
	<div class="mb-4">
		<Input {...props2} name="primary" />
		<Input {...props} name="secondary" />
		<Input {...props} name="tertiary" />
		<Input {...props} name="success" />
		<Input {...props} name="warning" />
		<Input {...props} name="danger" />
	</div>

	<hr class=" my-4 border border-pickled-bluewood-600" />
</div>
