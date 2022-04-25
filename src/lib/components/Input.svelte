<script lang="ts">
	import { selectTextOnFocus, blurOnEscape } from '$lib/utility/inputSelectDirective';
	export let value = '';
	export let label = '';
	export let name = '';
	export let pending = false;
	export let messages = [];
	export let validityClass;
	export let onInput = (name?: string) => {};
</script>

<div class:pending class={`${validityClass} form-input`}>
	<label for={name}>
		<span class="text-sm">{label}</span>
		{#if messages.length}
			<span class="validation-message text-sm">{messages[0]}</span>
		{/if}
	</label>
	<div class="relative">
		{#if pending}
			<div class="pointer-events-none absolute inset-y-0 right-2 flex items-center pl-3">
				<svg
					role="status"
					class="mr-2 inline h-6 w-6 animate-spin text-white"
					viewBox="0 0 100 101"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor"
					/>
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="#1C64F2"
					/>
				</svg>
			</div>
		{/if}
		<input
			{name}
			use:selectTextOnFocus
			use:blurOnEscape
			bind:value
			on:input={() => onInput(name)}
			type="text"
			id="email-adress-icon"
			class="input"
			autocomplete="off"
		/>
	</div>
</div>

<style lang="postcss">
	input:focus {
		border-color: steelblue;
	}
	div {
		@apply border-none bg-transparent;
		--color-error: #f58989;
		--color-warning: #f5ca89;
		--color-success: #79c472;
		--color-content-active: #5081a6;
		--color-content-semi: #89b8dd;
		--color-content-inactive: #cfe3f0;
		color: #999;
	}
	label {
		@apply block;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.form-input {
		@apply relative py-0 px-0;
	}

	.form-input label {
		@apply block;
	}

	.form-input .validation-message {
		@apply float-right font-normal;
	}

	.form-input input {
		border: 1px solid var(--color-content-inactive);
		background: #fff;
		color: var(--color-content-active);
		transition: 0.2s;

		/* @apply box-border w-full rounded border-4 p-4 text-sm outline-none; */
	}

	.form-input input:focus {
		border: 1px solid var(--color-content-active);
	}

	.form-input.success .validation-message {
		color: var(--color-success);
	}

	.form-input.warning .validation-message {
		color: var(--color-warning);
	}

	.form-input.error .validation-message {
		color: var(--color-error);
	}

	.form-input.success input {
		border: 1px solid var(--color-success);
		color: var(--color-success);
	}

	.form-input.warning input {
		border: 1px solid var(--color-warning);
		color: var(--color-warning);
	}

	.form-input.error input {
		border: 1px solid var(--color-error);
		color: var(--color-error);
	}
</style>
