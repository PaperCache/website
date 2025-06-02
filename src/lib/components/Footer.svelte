<script lang="ts">
	function getCurrentYear(): number {
		return new Date().getFullYear();
	}
</script>

<footer>
	<span class="copyright">{'\u{00a9}'} {getCurrentYear()} <a href="https://kiashakiba.ca">Kia Shakiba</a></span>
</footer>

<style lang="scss">
	footer {
		width: 100%;
		margin-top: 32px;
		padding: 8px;
		border-top: 1px solid #dddddd;
		display: flex;
		flex: 0 0 auto;
	}

	.copyright {
		color: #555555;
		font-size: 0.85em;
		line-height: 1.5em;
		padding: 4px 16px;
		margin-left: auto;

		a {
			color: inherit;

			&:hover {
				text-decoration: underline;
			}
		}
	}
</style>
