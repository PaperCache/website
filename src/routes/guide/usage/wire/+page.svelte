<script lang="ts">
	import Table from "$lib/components/Table.svelte";

	const COMMANDS: Command[] = [
		{
			command: "PING",
			description: "Sends a ping request to the server. Useful for health checks.",
			request: ["0 (u8)"],
			response: ["pong (u8[])"],
		},
		{
			command: "VERSION",
			description: "Requests the version number of the cache.",
			request: ["1 (u8)"],
			response: ["<version> (u8[])"],
		},
		{
			command: "AUTH",
			description: "Authorizes the client with the server if an auth_token has been configured.",
			request: ["2 (u8)", "<token> (u8[])"],
			response: [],
		},
		{
			command: "GET",
			description: "Gets the value of the supplied key if it exists, otherwise returns an error value.",
			request: ["3 (u8)", "<key> (u8[])"],
			response: ["<value> (u8[])"],
		},
		{
			command: "SET",
			description: "Sets a new value with the supplied key. The TTL value is in seconds (a TTL value of 0 indicates no expiry).",
			request: ["4 (u8)", "<key> (u8[])", "<value> (u8[])", "<ttl> (u32)"],
			response: [],
		},
		{
			command: "DEL",
			description: "Deletes an object if it exists, otherwise returns an error value.",
			request: ["5 (u8)", "<key> (u8[])"],
			response: [],
		},
		{
			command: "HAS",
			description: "Checks if a value with the supplied key exists.",
			request: ["6 (u8)", "<key> (u8[])"],
			response: ["0 (u8, 0 = false, 1 = true)"],
		},
		{
			command: "PEEK",
			description: "Gets the value of the supplied key if it exists, otherwise returns an error value. Unlike GET, PEEK does not modify the order of the eviction policy stack upon access.",
			request: ["7 (u8)", "<key> (u8[])"],
			response: ["<value> (u8[])"],
		},
		{
			command: "TTL",
			description: "Sets the TTL of the supplied key if it exists, otherwise returns an error value. The TTL value is in seconds (a TTL value of 0 indicates no expiry).",
			request: ["8 (u8)", "<key> (u8[])", "<ttl> (u32)"],
			response: [],
		},
		{
			command: "SIZE",
			description: "Gets the size of the value of the supplied key if it exists, otherwise returns an error value.",
			request: ["9 (u8)", "<key> (u8[])"],
			response: ["<size> (u32)"],
		},
		{
			command: "WIPE",
			description: "Deletes all data from the cache.",
			request: ["10 (u8)"],
			response: [],
		},
		{
			command: "RESIZE",
			description: "Resizes the cache.",
			request: ["11 (u8)", "<size> (u64)"],
			response: [],
		},
		{
			command: "POLICY",
			description: "Sets the cache's eviction policy.",
			request: ["12 (u8)", "<policy ID> (u8[])"],
			response: [],
		},
		{
			command: "STATS",
			description: "Gets the cache's statistics.",
			request: ["13 (u8)"],
			response: [
				"<max size> (u64)",
				"<used size> (u64)",
				"<num objects> (u64)",
				"<total GETs> (u64)",
				"<total SETs> (u64)",
				"<total DELs> (u64)",
				"<miss ratio> (f64)",
				"<num policies> (u32)",
				"<policies> (u8[][num policies])",
				"<policy> (u8[])",
				"<is auto policy> (u8, 0 = false, 1 = true)",
				"<uptime> (u64, milliseconds)",
			],
		},
	];

	type Command = {
		command: string;
		description: string;
		request: string[];
		response: string[];
	};
</script>

<p>The following is a description of PaperCache's wire protocol. This is useful when creating a new client. All values are encoded in little-endian. All strings are UTF-8 encoded.</p>

<Table
	headers={["Command", "Description", "Request", "Ok response"]}
	items={COMMANDS}
	{row}
/>

{#snippet row(command: Command)}
	<td>{command.command}</td>
	<td>{command.description}</td>

	<td>
		<ul>
			{#each command.request as item}
				<li>{item}</li>
			{/each}
		</ul>
	</td>

	<td>
		<ul>
			{#each command.response as item}
				<li>{item}</li>
			{/each}
		</ul>
	</td>
{/snippet}

<style lang="scss">
	p {
		margin-bottom: 8px;
	}

	li {
		white-space: nowrap;
	}
</style>
