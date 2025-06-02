<script lang="ts">
    import { onMount } from "svelte";
    let minimized: boolean = $state(false);

	function handleScroll() {
		minimized = window.scrollY >= 128;
	}

	onMount(() => {
		minimized = window.scrollY >= 128;

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	});
</script>

<header class={minimized ? "minimized" : ""}>
	<a href="/" class="name">PaperCache</a>

	<nav>
		<a href="/">Home</a>
		<a href="/policy">Policies</a>
		<a href="/client">Clients</a>
		<a href="/">Paper</a>
		<a href="/">GitHub</a>
	</nav>
</header>

<div class="spacer"></div>

<style lang="scss">
	header {
		width: 100%;
		padding: 20px 64px;
		background-color: #ffffff;
		box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.15);
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		transition: padding 0.15s ease-out;
	}

	.name {
		color: #222222;
		font-size: 1.65em;
		line-height: 1.65em;
		font-weight: 300;
		text-decoration: none;
		transition: font-size 0.15s ease-out, line-height 0.15s ease-out;
	}

	nav {
		margin-left: auto;

		a {
			color: #555555;
			font-size: 1em;
			line-height: 1em;
			margin-left: 24px;
			transition:
				font-size 0.15s ease-out,
				line-height 0.15s ease-out,
				margin 0.15s ease-out;

			&:hover {
				text-decoration: underline;
			}
		}
	}

	.spacer {
		height: 84px;
		margin-bottom: 32px;
		flex: 0 0 auto;
	}

	.minimized {
		padding-top: 12px;
		padding-bottom: 12px;

		.name {
			font-size: 1.25em;
			line-height: 1.25em;
		}

		nav a {
			font-size: 0.85em;
			line-height: 0.85em;
			margin-left: 16px;
		}
	}
</style>
