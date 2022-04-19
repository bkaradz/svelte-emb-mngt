<script>
	import { svgLoader } from '$lib/utility/svgLogos';
</script>

<div class="loader text-center">
	{@html svgLoader}
</div>

<style>
	/* .height_max {
		height: 100vh !important;
	} */
	.loader {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: grid;
		place-items: center;
		background: whitesmoke;
		z-index: 99999;
	}
	.svgHeight {
		width: 100px;
		height: 100px;
		color: whitesmoke;
	}
</style>
