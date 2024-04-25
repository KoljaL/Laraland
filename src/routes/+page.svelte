<script lang="ts">
	// import { get } from '$lib/getContent';

	// let jsonData = get();
	// $: console.log(jsonData);

	// async function load() {
	// 	const data = await get();
	// 	console.log(data.body);
	// 	return { props: { jsonData: data.body } };
	// }
</script>

<h1>JSON Data Sorted by Headline:</h1>

<!-- <ul>
	{#each jsonData as entry}
		<li>
			<h2>{entry.headline}</h2>
			{#if entry.image}
				<img src={entry.image} alt={entry.headline} />
			{/if}
			{#if entry.link}
				<a href={entry.link}>Link</a>
			{/if}
			<p>{entry.paragraph}</p>
		</li>
	{/each}
</ul> -->
