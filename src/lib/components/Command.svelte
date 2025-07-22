<script lang="ts">
	import { onMount } from "svelte";

	const {
		command,
	}: Props = $props();

	let element: HTMLInputElement | undefined = $state();
	let width: number | undefined = $state();

	onMount(() => {
		if (!element) return;

		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const computed = window.getComputedStyle(element);
		const padding = parseFloat(computed.paddingLeft) + parseFloat(computed.paddingRight);

		// add a fudge factor to slightly increase the width
		const fudge = 2;

		ctx.font = computed.font;
		width = Math.ceil(ctx?.measureText(command.trim()).width) + padding + fudge;
	});

	type Props = {
		command: string;
	};
</script>

<input
	bind:this={element}
	type="text"
	value={command.trim()}
	style:width={`${width}px`}
	onclick={element?.select}
	onfocus={element?.select}
/>

<style lang="scss">
	@use "$lib/styles/app";

	input[type="text"] {
		width: 16px;
		max-width: 100%;
		border: 1px solid;
		@include app.themed("light") { border-color: #222222; }
		@include app.themed("night") { border-color: #424242; }
		padding: 8px;
		@include app.themed("light") { background-color: #222222; }
		@include app.themed("night") { background-color: #424242; }
		color: #ffffff;
		font-size: 0.8em;
		line-height: 0.8em;
		font-family: "Source Code Pro", monospace !important;
		transition: width 0.25s ease-out;
	}
</style>
