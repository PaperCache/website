<script lang="ts">
	import Table from "$lib/components/Table.svelte";

	const COMMANDS: WireEntry[] = [
		{
			label: "PING",
			description: "Sends a ping request to the server. Useful for health checks.",
			request: ["0 (u8)"],
			response: ["length (u32)", "pong (u8[])"],
		},
		{
			label: "VERSION",
			description: "Requests the version number of the cache.",
			request: ["1 (u8)"],
			response: ["length (u32)", "<version> (u8[])"],
		},
		{
			label: "AUTH",
			description: "Authorizes the client with the server if an auth_token has been configured.",
			request: ["2 (u8)", "<token> (u8[])"],
			response: [],
		},
		{
			label: "GET",
			description: "Gets the value of the supplied key if it exists, otherwise returns an error value.",
			request: ["3 (u8)", "<key> (u8[])"],
			response: ["length (u32)", "<value> (u8[])"],
		},
		{
			label: "SET",
			description: "Sets a new value with the supplied key. The TTL value is in seconds (a TTL value of 0 indicates no expiry).",
			request: ["4 (u8)", "<key> (u8[])", "<value> (u8[])", "<ttl> (u32)"],
			response: [],
		},
		{
			label: "DEL",
			description: "Deletes an object if it exists, otherwise returns an error value.",
			request: ["5 (u8)", "<key> (u8[])"],
			response: [],
		},
		{
			label: "HAS",
			description: "Checks if a value with the supplied key exists.",
			request: ["6 (u8)", "<key> (u8[])"],
			response: ["0 (u8, 0 = false, 1 = true)"],
		},
		{
			label: "PEEK",
			description: "Gets the value of the supplied key if it exists, otherwise returns an error value. Unlike GET, PEEK does not modify the order of the eviction policy stack upon access.",
			request: ["7 (u8)", "<key> (u8[])"],
			response: ["length (u32)", "<value> (u8[])"],
		},
		{
			label: "TTL",
			description: "Sets the TTL of the supplied key if it exists, otherwise returns an error value. The TTL value is in seconds (a TTL value of 0 indicates no expiry).",
			request: ["8 (u8)", "<key> (u8[])", "<ttl> (u32)"],
			response: [],
		},
		{
			label: "SIZE",
			description: "Gets the size of the value of the supplied key if it exists, otherwise returns an error value.",
			request: ["9 (u8)", "<key> (u8[])"],
			response: ["<size> (u32)"],
		},
		{
			label: "WIPE",
			description: "Deletes all data from the cache.",
			request: ["10 (u8)"],
			response: [],
		},
		{
			label: "RESIZE",
			description: "Resizes the cache.",
			request: ["11 (u8)", "<size> (u64)"],
			response: [],
		},
		{
			label: "POLICY",
			description: "Sets the cache's eviction policy.",
			request: ["12 (u8)", "<policy ID> (u8[])"],
			response: [],
		},
		{
			label: "STATS",
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

	const ERRORS: WireEntry[] = [
		{
			label: "INTERNAL",
			description: "An internal error has occurred.",
			response: ["1 (u8)"],
		},
		{
			label: "MAX_CONNECTIONS_EXCEEDED",
			description: "The maximum number of concurrent client connections has been exceeded.",
			response: ["2 (u8)"],
		},
		{
			label: "UNAUTHORIZED",
			description: "The client is not authorized to perform the action. Use the 'auth' command to authorize the client.",
			response: ["3 (u8)"],
		},
		{
			label: "INTERNAL_CACHE_ERROR",
			description: "An internal error occurred in the cache itself (not the TCP server).",
			response: ["0 (u8)", "0 (u8)"],
		},
		{
			label: "KEY_NOT_FOUND",
			description: "The requested key was not found in the cache.",
			response: ["0 (u8)", "1 (u8)"],
		},
		{
			label: "ZERO_VALUE_SIZE",
			description: "The provided value has zero size.",
			response: ["0 (u8)", "2 (u8)"],
		},
		{
			label: "EXCEEDING_VALUE_SIZE",
			description: "The provided value's size exceeds the size of the cache.",
			response: ["0 (u8)", "3 (u8)"],
		},
		{
			label: "ZERO_CACHE_SIZE",
			description: "The provided cache size is zero.",
			response: ["0 (u8)", "4 (u8)"],
		},
		{
			label: "UNCONFIGURED_POLICY",
			description: "The provided policy is not configured in the cache.",
			response: ["0 (u8)", "5 (u8)"],
		},
		{
			label: "INVALID_POLICY",
			description: "The provided policy is invalid.",
			response: ["0 (u8)", "6 (u8)"],
		},
	];

	type WireEntry = {
		label: string;
		description: string;
		request?: string[];
		response: string[];
	};
</script>

<p>The following is a description of PaperCache's wire protocol. This is useful when creating a new client. All values are encoded in little-endian. All strings are UTF-8 encoded. Each response is preceeded by a status byte (u8) where 33 is OKAY, and 63 is NOT OKAY.</p>

<Table
	headers={["Command", "Description", "Request", "OKAY response"]}
	items={COMMANDS}
	{row}
/>

<h3>Errors</h3>
<p>The following is a description of PaperCache's error wire protocol. If the initial byte of any response is NOT OKAY (63), the following can be used to parse the subsequent bytes.</p>

<Table
	headers={["Error type", "Description", "NOT OKAY response"]}
	items={ERRORS}
	{row}
/>

{#snippet row(entry: WireEntry)}
	<td>{entry.label}</td>
	<td>{entry.description}</td>

	{#if entry.request}
		<td>
			<ul>
				{#each entry.request as item}
					<li>{item}</li>
				{/each}
			</ul>
		</td>
	{/if}

	<td>
		<ul>
			{#each entry.response as item}
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

	h3 {
		color: #222222;
		font-size: 1.15em;
		font-weight: 700;
		margin: 32px 0 8px;
	}
</style>
