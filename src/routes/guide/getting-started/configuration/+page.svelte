<script lang="ts">
	import Table from "$lib/components/Table.svelte";

	const configs: Config[] = [
		{
			key: "host",
			description: "The host TCP IP.",
			default: "127.0.0.1",
		},
		{
			key: "port",
			description: "The port to which PaperCache will listen.",
			default: 3145,
		},
		{
			key: "max_size",
			description: "The maximum size of the cache.",
			default: "2GiB",
		},
		{
			key: "policies[]",
			description: "A list of configured eviction poliices. Policies are added by repeating the key with new values. The 2Q eviction policy is configured as '2Q-<K_in>-<K_out>'. The S3-FIFO eviction policy is configured as 'S3-FIFO-<|S|>'",
			default: "LFU, FIFO, CLOCK, SIEVE, LRU, MRU, 2Q-0.25-0.5, Arc, S3-FIFO-0.1",
		},
		{
			key: "policy",
			description: "The initial eviction policy of the cache.",
			default: "auto",
		},
		{
			key: "max_connections",
			description: "The maximum number of TCP connections the cache will accept. Any clients attempting to connect to the cache after the limit has been reached will be rejected.",
			default: 50,
		},
		{
			key: "auth_token",
			description: "An optional authorization token. If configured, the server will require the client to provide the token using the 'auth' command before use. If not provided, attempts to access the cache's data will be rejected.",
			default: "-",
		}
	];

	type Config = {
		key: string;
		description: string;
		default: string | number;
	};
</script>

<Table
	headers={["Key", "Description", "Default"]}
	items={configs}
	{row}
/>

{#snippet row(config: Config)}
	<td>{config.key}</td>
	<td>{config.description}</td>
	<td>{config.default}</td>
{/snippet}
