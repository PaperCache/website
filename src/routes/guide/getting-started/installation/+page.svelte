<script lang="ts">
	import { base } from "$app/paths";
	import Tag from "$lib/components/Tag.svelte";
	import Command from "$lib/components/Command.svelte";

	const DOCKER_HREF = "https://hub.docker.com/r/kiashakiba/paper-cache";
</script>

<p>To try PaperCache locally, use either:</p>
<ul>
	<li>The official <Tag href={DOCKER_HREF}>Docker image</Tag></li>
	<li>The <Tag href="https://crates.io/crates/paper-server">paper-server</Tag> Rust crate</li>
</ul>

<h3>Install using Docker image</h3>
<p>The official PaperCache <Tag href={DOCKER_HREF}>Docker image</Tag> can be used to install and run PaperCache using the command:
<Command command={`
	sudo docker run --net=host kiashakiba/paper-cache
`} />
</p>

<h3>Install using Rust crate</h3>

<p>Install the <Tag href="https://crates.io/crates/paper-server">paper-server</Tag> Rust crate, using the following instructions:</p>

<ol>
	<li>Download and install <Tag href="https://www.rust-lang.org">Rust</Tag>.</li>

	<li>
		Install <Tag href="https://crates.io/crates/paper-server">paper-server</Tag> using the command:

		<Command command={`
			cargo install paper-server
		`} />
	</li>

	<li>Install a PaperCache <Tag href="{base}/guide/usage/clients">client</Tag>.</li>

	<li>
		(Optional) Install <Tag href="https://crates.io/crates/paper-cli">paper-cli</Tag> using the command:

		<Command command={`
			cargo install paper-cli
		`} />
	</li>

	<li>
		(Optional) Install <Tag href="https://crates.io/crates/paper-benchmark">paper-benchmark</Tag> using the command:

		<Command command={`
			cargo install paper-benchmark
		`} />
	</li>
</ol>

<style lang="scss">
	h3 {
		color: #222222;
		font-size: 1.15em;
		font-weight: 700;
		margin: 32px 0 8px;
	}
</style>
