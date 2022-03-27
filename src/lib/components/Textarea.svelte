<script lang="ts">
	export let size = '';
	export let value = '';
	export let label = '';
	export let messages = [];
	export let name = '';
	export let validityClass;
	export let placeholder = '';
	export let required = true;
	export let type = '';
</script>

<div class="">
	<div class="mb-1 flex justify-between">
		<label for={name} class="text-sm">{label}</label>
		{#if messages.length}
			<span class="text-sm {validityClass}">{messages[0]}</span>
		{/if}
	</div>
	<textarea
		class="input {size} {type} {validityClass}"
		id={name}
		{name}
		{required}
		{placeholder}
		bind:value
		on:input
	/>
</div>

<style>
</style>
