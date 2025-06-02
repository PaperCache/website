<script lang="ts">
	import { page } from "$app/state";
	import Content from "$lib/components/Content.svelte";
</script>

<Content title="Error">
	<p>{page.error?.message}</p>
</Content>
