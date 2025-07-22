<script lang="ts">
	import LogoSvg from "$lib/svgs/LogoSvg.svelte";

	function getCurrentYear(): number {
		return new Date().getFullYear();
	}
</script>

<footer>
	<LogoSvg />
	<span class="copyright">
		{'\u{00a9}'} {getCurrentYear()}
		<a href="https://kiashakiba.ca" target="_blank">Kia Shakiba</a>
	</span>
</footer>

<style lang="scss">
	@use "$lib/styles/app";

	footer {
		width: 100%;
		padding: 8px 16px;
		border-top: 1px solid;
		@include app.themed("light") { border-color: #dddddd; }
		@include app.themed("night") { border-color: #424242; }
		display: flex;
		align-items: center;
		flex: 0 0 auto;

		@media screen and (max-width: app.$mobile-width) {
			padding-left: 8px;
			padding-right: 8px;
		}

		:global(svg) {
			height: 1.15em;
			width: 1.15em;
		}
	}

	.copyright {
		color: #555555;
		@include app.themed("light") { color: #555555; }
		@include app.themed("night") { color: #dddddd; }
		font-size: 0.85em;
		line-height: 1.5em;
		margin-left: auto;

		a {
			color: inherit;

			&:hover {
				text-decoration: underline;
			}
		}
	}
</style>
