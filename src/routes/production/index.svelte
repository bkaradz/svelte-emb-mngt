<script lang="ts">
	// let file = null;
	// const heandleChange = (e) => {
	// 	file = e.target.files[0];
	// };

	const heandleSubmit = async (e: SubmitEvent) => {
		const formElm = e.target as HTMLFormElement;
		const formData = new FormData(formElm);
		// formData.append('file', e.target.file);
		// const json = Object.fromEntries(formData.entries());
		// console.log('🚀 ~ file: index.svelte ~ line 14 ~ heandleSubmit ~ json', json);

		const res = await fetch('/api/test.json', {
			method: 'POST',
			body: formData
		});

		if (res.ok) {
			formElm.reset();
		}
	};
	// const heandleSubmit = async () => {
	// 	const formData = new FormData();
	// 	formData.append('file', file);
	// 	if (file) {
	// 		const res = await fetch('/api/test.json', {
	// 			method: 'POST',
	// 			body: formData
	// 		});
	// 	}
	// };
</script>

<h1>Production</h1>

<form on:submit|preventDefault={heandleSubmit}>
	<input class="btn btn-primary" type="file" name="file" accept=".csv" />
	<button class="btn btn-primary" type="submit">Submit</button>
</form>

<!-- <div>
	<input
		class="btn btn-primary"
		type="file"
		name="file"
		accept=".csv"
		on:change|preventDefault={heandleChange}
	/>
	<button class="btn btn-primary" type="submit" on:click={heandleSubmit}>Submit</button>
</div> -->
<style>
</style>
