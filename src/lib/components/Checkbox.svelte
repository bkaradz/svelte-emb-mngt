<script>
	export let name = '';
	export let checked = false;
	export let label = '';
	export let onChange = () => {};
	export let validityClass;
</script>

<label for={name} class={`form-checkbox ${validityClass}`}>
	<input type="checkbox" {name} bind:checked on:change={onChange} />
	<span>{label}</span>
</label>

<style lang="postcss">
	.form-checkbox {
		@apply border-none bg-transparent text-sm text-pickled-bluewood-500;
	}
	span {
		@apply whitespace-nowrap;
	}

	.form-checkbox {
		@apply flex items-center;
	}

	.form-checkbox input {
		@apply mr-2;
	}

	.form-checkbox.error {
		color: var(--color-error);
	}

	.form-checkbox.success {
		color: var(--color-success);
	}
</style>
