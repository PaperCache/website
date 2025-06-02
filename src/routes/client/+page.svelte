<script lang="ts">
	import Content from "$lib/components/Content.svelte";
	import Code from "$lib/components/Code.svelte";
</script>

<Content title="Clients">
	<section>
		<h3>Rust</h3>

		<Code lang="rust" numbers code={`
			let client = PaperClient::new("paper://127.0.0.1:3145")?;

			client.set("key", "value", None)?;
			let got = client.get("key")?;
		`} />
	</section>

	<section>
		<h3>JavaScript</h3>

		<Code lang="javascript" numbers code={`
			const client = await PaperClient.connect("paper://127.0.0.1:3145");

			await client.set("key", "value");
			const got = await client.get("key");
		`} />
	</section>

	<section>
		<h3>Go</h3>

		<Code lang="go" numbers code={`
			client, err := Connect("paper://127.0.0.1:3145")

			if err != nil {
				// handle error
			}

			client.Set("key", "value", 0);
			got, _ := client.Get("key")
		`} />
	</section>

	<section>
		<h3>C</h3>

		<Code lang="c" numbers code={`
			paper_client* client = paper_connect("paper://127.0.0.1:3145");

			paper_set(client, "key", "value", 0);
			paper_str_response* got = paper_get(client, "key");
		`} />
	</section>

	<section>
		<h3>C++</h3>

		<Code lang="cpp" numbers code={`
			paper::client client ("paper://127.0.0.1:3145");

			client.set("key", "value");
			auto got = client.get("key");
		`} />
	</section>

	<section>
		<h3>Python</h3>

		<Code lang="python" numbers code={`
			client = PaperClient("paper://127.0.0.1:3145")

			client.set("key", "value")
			got = client.get("key")
		`} />
	</section>
</Content>
