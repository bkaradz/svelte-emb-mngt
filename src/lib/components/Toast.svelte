<script lang="ts">
	import {
		svgCheckCircle,
		svgExclamationCircle,
		svgInfo,
		svgXCircle,
		svgXSmall
	} from '$lib/utility/svgLogos';
	export let type: string;
	export let message: string;
	export let id: string;
	export let removeToast;

	let progress = 0;
	let autoClose = 5000;
	let visibleSince = new Date().getTime();

	let intervalId = setInterval(() => {
		const timeVisible = new Date().getTime() - visibleSince;
		progress = timeVisible / autoClose;
	}, 10);

	$: if (progress > 1) {
		clearInterval(intervalId);
		intervalId = null;
		removeToast(id);
	}

	const heandleDelete = () => {
		clearInterval(intervalId);
		intervalId = null;
		removeToast(id);
	};

	let icon = `${svgCheckCircle}`;
	let style = 'bg-success';

	if (type === 'danger') {
		icon = `${svgXCircle}`;
		style = 'bg-danger';
	}
	if (type === 'warning') {
		icon = `${svgExclamationCircle}`;
		style = 'bg-warning';
	}
	if (type === 'info') {
		icon = `${svgInfo}`;
		style = 'bg-info';
	}
</script>

<!-- Info -->

<div
	style="--progress: {progress}"
	class="{style} progress relative m-1 flex h-16 w-[700px] items-center justify-between  text-white"
>
	<span class="mx-2 flex-none">
		{@html icon}
	</span>

	<!-- warning, danger, info -->
	<span class="flex h-12 grow items-center overflow-hidden text-ellipsis">
		<p class="text-xs">{message}</p>
	</span>

	<span class="mr-2 flex-none">
		<button on:click={heandleDelete}>
			{@html svgXSmall}
		</button>
	</span>
</div>

<!-- Warning -->
<style>
	.progress::after {
		content: '';
		position: absolute;
		height: 3px;
		width: calc(100% * var(--progress, 1));
		bottom: 0;
		background-color: #64748b;
	}
</style>
