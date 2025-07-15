<script lang="ts">
	import { base } from "$app/paths";
	import Command from "$lib/components/Command.svelte";
	import Tag from "$lib/components/Tag.svelte";
	import Table from "$lib/components/Table.svelte";

	const ACCESS_FIELDS: AccessField[] = [
		{
			bytes: 8,
			type: "u64",
			description: "The UNIX timestamp in milliseconds.",
		},
		{
			bytes: 1,
			type: "u8",
			description: "The command type. 0 indicates a GET and 1 indicates a SET.",
		},
		{
			bytes: 8,
			type: "u64",
			description: "The access key.",
		},
		{
			bytes: 4,
			type: "u32",
			description: "The access size (i.e., the size of the object in bytes).",
		},
		{
			bytes: 4,
			type: "u32",
			description: "The TTL (a TTL of 0 indicates no expire time).",
		},
	];

	type AccessField = {
		bytes: number;
		type: string;
		description: string;
	};
</script>

<p>To interact with PaperCache, we have created two CLI tools: <Command command="paper-cli" /> and <Command command="paper-benchmark" />.</p>

<h3>paper-cli</h3>
<p>The paper-cli tool allows you to send any of the described command in the <Tag href="{base}/guide/usage/wire">wire protocol</Tag> from the command line. This is useful for monitoring the cache (e.g., checking the statistics at runtime, or changing the eviction policy manually).</p>

<h4>Installation</h4>
<Command command="cargo install paper-cli" />

<h4>Usage</h4>
<Command command="paper-cli -h" />

<h3>paper-benchmark</h3>
<p>The paper-benchmark tool takes as input a path to a trace and sends the accesses in the trace to a PaperCache instance.</p>

<p>The access trace is in binary format and must be formatted as follows (all values are encoded in little-endian):</p>

<Table
	headers={["Bytes", "Type", "Description"]}
	items={ACCESS_FIELDS}
	{row}
	spaceIndex={2}
	/>

{#snippet row(field: AccessField)}
	<td>{field.bytes}</td>
	<td>{field.type}</td>
	<td>{field.description}</td>
{/snippet}

<h4>Installation</h4>
<Command command="cargo install paper-benchmark" />

<h4>Usage</h4>
<Command command="paper-benchmark -h" />

<style lang="scss">
	h3, h4 {
		color: #222222;
		font-weight: 700;
	}

	h3 {
		font-size: 1.5em;
		margin: 32px 0 8px;
	}

	h4 {
		font-size: 1.05em;
		margin: 16px 0 8px;
	}
</style>
