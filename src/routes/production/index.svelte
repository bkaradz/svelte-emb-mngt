<script lang="ts">
	const heandleSubmit = async (e: SubmitEvent) => {
		const formElm = e.target as HTMLFormElement;
		const formData = new FormData(formElm);

		const res = await fetch('/api/test.json', {
			method: 'POST',
			body: formData
		});

		if (res.ok) {
			formElm.reset();
		}
	};
</script>

<h1>Production</h1>

<form on:submit|preventDefault={heandleSubmit}>
	<input class="btn btn-primary" type="file" name="file" accept=".csv" />
	<button class="btn btn-primary" type="submit">Submit</button>
</form>

<style>
</style>
