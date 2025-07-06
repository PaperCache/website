<script lang="ts">
	import GuideNav from "$lib/components/GuideNav.svelte";
	import guides from "$lib/data/guides.json";
</script>

<GuideNav pages={guides.map(guideSection => {
	return {
		title: guideSection.title,
		slug: `/${guideSection.slug}`,
	};
})} />
