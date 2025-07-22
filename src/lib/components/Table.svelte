<script lang="ts" generics="T">
	import type { Snippet } from "svelte";

	const {
		headers = [],
		items,
		row,
		spaceIndex,
	}: Props = $props();

	type Props = {
		headers?: string[];
		items: T[];
		row: Snippet<[T]>;
		spaceIndex?: number;
	};
</script>

<div>
	<table>
		<thead>
			<tr>
				{#each headers as header, index}
					<th style:width={spaceIndex === index ? "100%": ""}>
						{header}
					</th>
				{/each}
			</tr>
		</thead>

		<tbody>
			{#each items as item}
				<tr>{@render row(item)}</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="scss">
	@use "$lib/styles/app";

	div {
		width: 100%;
		overflow-x: auto;
	}

	table {
		width: 100%;
		border: 1px solid;
		@include app.themed("light") { border-color: #222222; }
		@include app.themed("night") { border-color: #424242; }
		border-radius: 4px;
		border-spacing: 0;
		border-collapse: separate;

		thead tr {
			@include app.themed("light") { background-color: #eeeeee; }
			@include app.themed("night") { background-color: #424242; }
		}

		tr {
			&:hover {
				@include app.themed("light") { background-color: #eeeeee; }
				@include app.themed("night") { background-color: #424242; }
			}

			&:last-of-type {
				th, :global(td) {
					border-bottom: 0;
				}
			}
		}

		th, :global(td) {
			@include app.themed("light") { color: #222222; }
			@include app.themed("night") { color: #ffffff; }
			font-size: 0.9em;
			line-height: 1.25em;
			padding: 16px 20px;
			border-bottom: 1px solid;
			@include app.themed("light") { border-color: #dddddd; }
			@include app.themed("night") { border-color: #424242; }
			vertical-align: top;

			@media screen and (max-width: app.$mobile-width) {
				white-space: nowrap;
			}
		}

		th {
			font-weight: 700;
			text-align: left;
		}
	}
</style>
