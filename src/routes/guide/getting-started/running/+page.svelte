<script>
	import { base } from "$app/paths";
	import Command from "$lib/components/Command.svelte";
	import Tag from "$lib/components/Tag.svelte";
	import links from "$lib/data/links.json";
</script>

<p>Start the PaperCache server using the command <Command command="paper-server" />. This will load the default configuration, found <Tag href={`${links.githubBase}/paper-server/blob/main/default.pconf`}>here</Tag>.</p>

<p>To create a custom configuration, create a ".pconf" file (using the default configuration file as a starting point), apply edits, and run the command <Command command="paper-server -c /path/to/config.pconf" />.</p>

<p>You may now interact with PaperCache using a <Tag href="{base}/guide/usage/clients">client</Tag> or a <Tag href="{base}/guide/usage/tools">tool</Tag>. Alternatively, you may create your own custom method of interaction with PaperCache using the described <Tag href="{base}/guide/usage/wire">wire protocol</Tag>.</p>
