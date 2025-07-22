<script lang="ts">
	import hljs from "highlight.js";
	import { ThemeManager } from "$lib/utils/theme-manager";

	import rust from "highlight.js/lib/languages/rust";
	import javascript from "highlight.js/lib/languages/javascript";
	import go from "highlight.js/lib/languages/go";
	import c from "highlight.js/lib/languages/c";
	import cpp from "highlight.js/lib/languages/cpp";
	import python from "highlight.js/lib/languages/python";
	import java from "highlight.js/lib/languages/java";
	import csharp from "highlight.js/lib/languages/csharp";
	import kotlin from "highlight.js/lib/languages/kotlin";
	import php from "highlight.js/lib/languages/php";
	import ruby from "highlight.js/lib/languages/ruby";

	hljs.registerLanguage("rust", rust);
	hljs.registerLanguage("javascript", javascript);
	hljs.registerLanguage("go", go);
	hljs.registerLanguage("c", c);
	hljs.registerLanguage("cpp", cpp);
	hljs.registerLanguage("python", python);
	hljs.registerLanguage("java", java);
	hljs.registerLanguage("csharp", csharp);
	hljs.registerLanguage("kotlin", kotlin);
	hljs.registerLanguage("php", php);
	hljs.registerLanguage("ruby", ruby);
	hljs.registerLanguage("zig", javascript);

	const {
		lang: language,
		code,
		numbers,
	}: Props = $props();

	const theme = ThemeManager.get();
	let stylesheet = $derived($theme === "light" ? "vs" : "monokai-sublime");

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
		lang: "rust" | "javascript" | "go" | "c" | "cpp" | "python" | "java" | "csharp" | "kotlin" | "php" | "ruby" | "zig";
		code: string;
		numbers?: boolean;
	};
</script>

<svelte:head>
	{#if typeof window !== "undefined"}
		<link rel="stylesheet" href="/highlightjs/{stylesheet}.min.css" />
	{/if}
</svelte:head>

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
	@use "sass:meta";
	@use "$lib/styles/app";

	.code {
		margin: 8px 0;
		padding: 12px;
		border: 1px solid;
		@include app.themed("light") { border-color: #222222; }
		@include app.themed("night") { border-color: #424242; }
		border-radius: 4px;
		@include app.themed("light") { background-color: #f8f8f8; }
		@include app.themed("night") { background-color: #333333; }
		display: flex;
	}

	.line-numbers {
		margin-right: 12px;
		flex: 0 0 auto;
		display: flex;
		flex-direction: column;

		span {
			@include app.themed("light") { color: #555555; }
			@include app.themed("night") { color: #dddddd; }
			font-family: "Source Code Pro", monospace !important;
			font-size: 0.5em;
			line-height: 2.25em;
		}
	}

	pre {
		@include app.themed("light") { color: #222222; }
		@include app.themed("night") { color: #ffffff; }
		overflow-y: auto;
		font-family: "Source Code Pro", monospace !important;
		font-size: 0.75em;
		line-height: 1.5em;
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
		:global(.hljs-number),
		:global(.hljs-literal),
		:global(.hljs-property)
 		{
			font-family: inherit !important;
		}
	}
</style>
