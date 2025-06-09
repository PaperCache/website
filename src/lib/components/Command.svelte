<script lang="ts">
    import { onMount } from "svelte";

	const {
		command,
	}: Props = $props();

	let element: HTMLInputElement | undefined = $state();
	let width: number | undefined = $state();

	onMount(() => {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		ctx.font = "1em 'Source Code Pro', monospace";
		width = ctx?.measureText(command).width + 16;
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
	input[type="text"] {
		border: 1px solid #222222;
		padding: 8px;
		background-color: #222222;
		color: #ffffff;
		font-size: 0.8em;
		line-height: 0.8em;
		font-family: "Source Code Pro", monospace !important;
	}
</style>
