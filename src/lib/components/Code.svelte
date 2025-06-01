<script lang="ts">
	import hljs from "highlight.js";
	import rust from "highlight.js/lib/languages/rust";
	import bash from "highlight.js/lib/languages/bash";

	import "highlight.js/styles/vs.min.css";

	hljs.registerLanguage("rust", rust);
	hljs.registerLanguage("bash", bash);

	const {
		lang: language,
		code,
	}: Props = $props();

	function getHighlightedCode(): string {
		const formatted = getFormattedCode();
		return hljs.highlight(formatted, { language }).value;
	}

	function getFormattedCode(): string {
		const extraTabs = code
			.split(/\n/)
			.filter(line => line.trim())
			.map(line => {
				const matches = line.match(/^\t*/)
				return matches ? matches[0].length : 0
			});

		const minTabs = Math.min(...extraTabs);
		const regex = new RegExp(`^\\t{${minTabs}}`);

		const formatted = code
			.split(/\n/)
			.map(line => line.replace(regex, ""))
			.join("\n")
			.trim()
			.replace(/\t/g, "    ");

		return formatted;
	}

	type Props = {
		lang: "rust" | "bash";
		code: string;
	};
</script>

<pre><code>{@html getHighlightedCode()}</code></pre>

<style lang="scss">
	pre {
		margin: 8px 0;
		padding: 12px;
		border: 1px solid #222222;
		border-radius: 4px;
		overflow-y: auto;
		font-family: "Source Code Pro", monospace !important;
		font-size: 14px;

		*,
		:global(.hljs-keyword),
		:global(.hljs-title),
		:global(.hljs-type),
		:global(.hljs-punctuation),
		:global(.hljs-comment),
		:global(.hljs-meta)
 		{
			font-family: inherit !important;
		}
	}
</style>
