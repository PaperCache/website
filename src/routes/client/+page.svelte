<script lang="ts">
	import Content from "$lib/components/Content.svelte";
	import Code from "$lib/components/Code.svelte";
</script>

{#snippet label(name: string, href: string)}
	<div class="client-label">
		<h3>{name}</h3>
		<a {href} target="_blank">GitHub</a>
	</div>
{/snippet}

<Content title="Clients">
	<section>
		{@render label("Rust", "/")}

		<Code lang="rust" numbers code={`
			let client = PaperClient::new("paper://127.0.0.1:3145")?;

			client.set("key", "value", None)?;
			let got = client.get("key")?;
		`} />
	</section>

	<section>
		{@render label("JavaScript", "/")}

		<Code lang="javascript" numbers code={`
			const client = await PaperClient.connect("paper://127.0.0.1:3145");

			await client.set("key", "value");
			const got = await client.get("key");
		`} />
	</section>

	<section>
		{@render label("Go", "/")}

		<Code lang="go" numbers code={`
			client, err := Connect("paper://127.0.0.1:3145")

			if err != nil {
				// handle error
			}

			client.Set("key", "value", 0);
			got, err := client.Get("key")

			if err != nil {
				// handle error
			}
		`} />
	</section>

	<section>
		{@render label("C", "/")}

		<Code lang="c" numbers code={`
			paper_client* client = paper_connect("paper://127.0.0.1:3145");

			paper_set(client, "key", "value", 0);
			paper_str_response* got = paper_get(client, "key");

			paper_str_response_free(got);
		`} />
	</section>

	<section>
		{@render label("C++", "/")}

		<Code lang="cpp" numbers code={`
			paper::client client ("paper://127.0.0.1:3145");

			client.set("key", "value");
			auto got = client.get("key");
		`} />
	</section>

	<section>
		{@render label("Python", "/")}

		<Code lang="python" numbers code={`
			client = PaperClient("paper://127.0.0.1:3145")

			client.set("key", "value")
			got = client.get("key")
		`} />
	</section>

	<section>
		{@render label("Java", "/")}

		<Code lang="java" numbers code={`
			PaperClient client = new PaperClient("paper://127.0.0.1:3145");

			client.set("key", "value");
			PaperResponse<String> got = client.get("key");
		`} />
	</section>

	<section>
		{@render label("Kotlin", "/")}

		<Code lang="kotlin" numbers code={`
			var client = new PaperClient("paper://127.0.0.1:3145");

			client.set("key", "value");
			var got = client.get("key");
		`} />
	</section>

	<section>
		{@render label("PHP", "/")}

		<Code lang="php" numbers code={`
			$client = new PaperClient("paper://127.0.0.1:3145");

			$client->set("key", "value");
			$got = $client->get("key");
		`} />
	</section>

	<section>
		{@render label("Zig", "/")}

		<Code lang="zig" numbers code={`
			var heap = std.heap.ArenaAllocator.init(std.heap.page_allocator);
			const allocator = heap.allocator();

			var client = try PaperClient.init(allocator, "paper://127.0.0.1:3145");
			defer client.disconnect();

			try client.set("key", "value");
			const got = try client.get("key");
		`} />
	</section>
</Content>

<style lang="scss">
	.client-label {
		width: 100%;
		display: flex;
		align-items: center;

		h3, a {
			color: #222222;
		}

		h3 {
			font-size: 18px;
			line-height: 22px;
			flex: 1 1 auto;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}

		a {
			font-size: 16px;
			line-height: 20px;
			margin-left: 8px;
			flex: 0 0 auto;

			&:hover {
				text-decoration: underline;
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
