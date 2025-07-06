<script lang="ts">
	import { base } from "$app/paths";
	import Tag from "$lib/components/Tag.svelte";
	import Command from "$lib/components/Command.svelte";
</script>

<p>To try PaperCache locally, install the <Tag href="#">paper-server</Tag> Rust crate, using the following instructions:</p>

<ol>
	<li>Download and install <Tag href="https://www.rust-lang.org">Rust</Tag>.</li>

	<li>
		Install <Tag href="#">paper-server</Tag> using the command:

		<Command command={`
			cargo install paper-server
		`} />
	</li>

	<li>Install a PaperCache <Tag href="{base}/guide/usage/clients">client</Tag>.</li>

	<li>
		(Optional) Install <Tag href="#">paper-cli</Tag> using the command:

		<Command command={`
			cargo install paper-cli
		`} />
	</li>

	<li>
		(Optional) Install <Tag href="#">paper-benchmark</Tag> using the command:

		<Command command={`
			cargo install paper-benchmark
		`} />
	</li>
</ol>
