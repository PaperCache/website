<script lang="ts">
	import GuideNav from "$lib/components/GuideNav.svelte";
	import guides from "$lib/data/guides.json";

	const guide = guides[1];
</script>

<GuideNav
	title={guide.title}
	pages={guide.modules.map(module => {
		return {
			title: module.title,
			slug: `/${guide.slug}/${module.slug}`,
		};
	})}
/>
