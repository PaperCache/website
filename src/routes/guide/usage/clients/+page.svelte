<script lang="ts">
	import Code from "$lib/components/Code.svelte";
	import ExternalSvg from "$lib/svgs/ExternalSvg.svelte";
	import links from "$lib/data/links.json";
</script>

{#snippet label(name: string, href: string)}
	<div class="client-label">
		<h3>{name}</h3>
		<a {href} target="_blank">
			GitHub
			<ExternalSvg />
		</a>
	</div>
{/snippet}

<section>
	{@render label("Rust", `${links.githubBase}/paper-client-rs`)}

	<Code lang="rust" numbers code={`
		use paper_client::PaperClient;

		let client = PaperClient::new("paper://127.0.0.1:3145")?;

		client.set("key", "value", None)?;
		let got = client.get("key")?;
	`} />
</section>

<section>
	{@render label("JavaScript", `${links.githubBase}/paper-client-ts`)}

	<Code lang="javascript" numbers code={`
		import { PaperClient } from "paper-client";

		const client = await PaperClient.connect("paper://127.0.0.1:3145");

		await client.set("key", "value");
		const got = await client.get("key");
	`} />
</section>

<section>
	{@render label("Go", `${links.githubBase}/paper-client-go`)}

	<Code lang="go" numbers code={`
		import (paperclient "github.com/PaperCache/paper-client-go")

		client, err := paperclient.ClientConnect("paper://127.0.0.1:3145")

		if err != nil {
			// handle error
		}

		client.Set("key", "value", 0)
		got, err := client.Get("key")

		if err != nil {
			// handle error
		}
	`} />
</section>

<section>
	{@render label("C", `${links.githubBase}/paper-client-c`)}

	<Code lang="c" numbers code={`
		#include "paper_client_c/client.h"

		paper_client* client = paper_connect("paper://127.0.0.1:3145");

		paper_set(client, "key", "value", 0);
		paper_str_response* got = paper_get(client, "key");

		paper_str_response_free(got);
	`} />
</section>

<section>
	{@render label("C++", `${links.githubBase}/paper-client-cpp`)}

	<Code lang="cpp" numbers code={`
		#include <paper_client_cpp/client.hpp>

		paper::client client ("paper://127.0.0.1:3145");

		client.set("key", "value");
		auto got = client.get("key");
	`} />
</section>

<section>
	{@render label("Python", `${links.githubBase}/paper-client-py`)}

	<Code lang="python" numbers code={`
		from paper_client.client import PaperClient

		client = PaperClient("paper://127.0.0.1:3145")

		client.set("key", "value")
		got = client.get("key")
	`} />
</section>

<section>
	{@render label("Java", `${links.githubBase}/paper-client-java`)}

	<Code lang="java" numbers code={`
		import io.papercache.PaperClient;

		PaperClient client = new PaperClient("paper://127.0.0.1:3145");

		client.set("key", "value");
		String got = client.get("key");
	`} />
</section>

<section>
	{@render label("Scala", `${links.githubBase}/paper-client-scala`)}

	<Code lang="scala" numbers code={`
		import io.papercache.PaperClient;

		val client = new PaperClient("paper://127.0.0.1:3145");

		client.set("key", "value");
		val got = client.get("key");
	`} />
</section>

<section>
	{@render label("C#", `${links.githubBase}/paper-client-cs`)}

	<Code lang="csharp" numbers code={`
		using PaperClient;

		var client = new PaperClient("paper://127.0.0.1:3145");

		client.Set("key", "value");
		var got = client.Get("key");
	`} />
</section>

<section>
	{@render label("Kotlin", `${links.githubBase}/paper-client-kt`)}

	<Code lang="kotlin" numbers code={`
		import io.papercache.PaperClient;

		var client = PaperClient("paper://127.0.0.1:3145")

		client.set("key", "value")
		val got = client.get("key")
	`} />
</section>

<section>
	{@render label("PHP", `${links.githubBase}/paper-client-php`)}

	<Code lang="php" numbers code={`
		include_once(dirname(__FILE__) . "/path/to/paper-client-php");

		$client = new PaperClient("paper://127.0.0.1:3145");

		$client->set("key", "value");
		$got = $client->get("key");
	`} />
</section>

<section>
	{@render label("Ruby", `${links.githubBase}/paper-client-rb`)}

	<Code lang="ruby" numbers code={`
		require "paper_client"

		client = PaperClient::Client.new("paper://127.0.0.1:3145")

		client.set("key", "value")
		got = client.get("key")
	`} />
</section>

<section>
	{@render label("Zig", `${links.githubBase}/paper-client-zig`)}

	<Code lang="zig" numbers code={`
		const PaperClient = @import("/path/to/paper-client-zig/lib.zig").PaperClient;

		var heap = std.heap.ArenaAllocator.init(std.heap.page_allocator);
		const allocator = heap.allocator();

		var client = try PaperClient.init(allocator, "paper://127.0.0.1:3145");
		defer client.disconnect();

		try client.set("key", "value");
		const got = try client.get("key");
	`} />
</section>

<style lang="scss">
	@use "$lib/styles/app";

	.client-label {
		width: 100%;
		display: flex;
		align-items: center;

		h3, a {
			@include app.themed("light") { color: #222222; }
			@include app.themed("night") { color: #ffffff; }
		}

		h3 {
			font-size: 1.25em;
			line-height: 1.25em;
			flex: 1 1 auto;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}

		a {
			font-size: 1em;
			line-height: 1.25em;
			margin-left: 8px;
			flex: 0 0 auto;
			display: flex;
			align-items: center;

			&:hover {
				text-decoration: underline;
			}

			:global(svg) {
				height: 1.25em;
				width: 1.25em;
				@include app.themed("light") { fill: #222222; }
				@include app.themed("night") { fill: #ffffff; }
				margin-left: 4px;
			}
		}
	}

	section {
		width: 100%;
		margin: 8px 0;
		display: inline-block;

		&:last-child {
			margin-bottom: 0;
		}
	}
</style>
