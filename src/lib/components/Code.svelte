<script lang="ts">
	import hljs from "highlight.js";

	import rust from "highlight.js/lib/languages/rust";
	import javascript from "highlight.js/lib/languages/javascript";
	import go from "highlight.js/lib/languages/go";
	import c from "highlight.js/lib/languages/c";
	import cpp from "highlight.js/lib/languages/cpp";
	import python from "highlight.js/lib/languages/python";

	import "highlight.js/styles/vs.min.css";

	hljs.registerLanguage("rust", rust);
	hljs.registerLanguage("javascript", javascript);
	hljs.registerLanguage("go", go);
	hljs.registerLanguage("c", c);
	hljs.registerLanguage("cpp", cpp);
	hljs.registerLanguage("python", python);

	const {
		lang: language,
		code,
		numbers,
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
			.trim()
			.split(/\n/)
			.map(line => line.replace(regex, ""))
			.join("\n")
			.replace(/\t/g, "    ");

		return formatted;
	}

	function getNumLines(): number {
		return code
			.trim()
			.split("\n")
			.length;
	}

	type Props = {
		lang: "rust" | "javascript" | "go" | "c" | "cpp" | "python";
		code: string;
		numbers?: boolean;
	};
</script>

<div class="code">
	{#if numbers}
		<div class="line-numbers">
			{#each { length: getNumLines() } as _, i}
				<span>{i + 1}</span>
			{/each}
		</div>
	{/if}

	<pre><code>{@html getHighlightedCode()}</code></pre>
</div>

<style lang="scss">
	.code {
		margin: 16px 0;
		padding: 12px;
		border: 1px solid #222222;
		border-radius: 4px;
		background-color: #f8f8f8;
		display: flex;
	}

	.line-numbers {
		margin-right: 12px;
		flex: 0 0 auto;
		display: flex;
		flex-direction: column;

		span {
			color: #555555;
			font-family: "Source Code Pro", monospace !important;
			font-size: 10px;
			line-height: 20px;
		}
	}

	pre {
		overflow-y: auto;
		font-family: "Source Code Pro", monospace !important;
		font-size: 14px;
		line-height: 20px;
		flex: 1 1 auto;

		*,
		:global(.hljs-keyword),
		:global(.hljs-title),
		:global(.hljs-type),
		:global(.hljs-variable),
		:global(.hljs-function),
		:global(.hljs-built_in),
		:global(.hljs-punctuation),
		:global(.hljs-comment),
		:global(.hljs-meta),
		:global(.hljs-params),
		:global(.hljs-string),
		:global(.hljs-literal)
 		{
			font-family: inherit !important;
		}
	}
</style>
