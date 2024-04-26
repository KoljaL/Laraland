<script lang="ts">
	let data = fetchData().then((md) => {
		markdownToJSON(md);
	});

	async function fetchData() {
		const res = await fetch(
			'https://raw.githubusercontent.com/KoljaL/Laraland/main/content/Laraland.md'
		);
		const md = await res.text();
		console.log(md);
		return md;
	}

	function markdownToJSON(md: any) {
		const sections = md.split('---\n');
		const content = [];
		let entry = {};
		for (let section of sections) {
			if (!section) continue;
			section = section.trim();
			console.log('section\n', section);

			// ## Headline 2
			// ![Image 1](content/img/Herd.png)
			// [Link 2](https://example.com)
			// [Repository](https://github.com/user/repo2)
			// Tags: tag4, tag5, tag6
			// Lorem ipsum dolor sit amet, consectetur adipiscing elit
			// - blue
			// - blue
			// - blue

			// // find headline with ##
			// const headline = section.match(/^## (.*)$/m);
			// console.log('headline\n', headline);
			// // find image with ![...](...)
			// const image = section.match(/!\[.*\]\((.*)\)/);
			// console.log('image\n', image);
			// // find repolink with [Repo](...)
			// const repolink = section.match(/\[Repo\]\((.*)\)/);
			// console.log('repolink\n', repolink);
			// // find link with not [Repo](...)
			// const link = section.match(/\[.*\]\((.*)\)/);
			// console.log('link\n', link);
			// remove headline, image, repolink, link from section without regex
			// const text = section
			// 	.replace(/^## (.*)$/m, '')
			// 	.replace(/!\[.*\]\((.*)\)/, '')
			// 	.replace(/\[Repo\]\((.*)\)/, '')
			// 	.replace(/\[.*\]\((.*)\)/, '')
			// 	.trim();
			// console.log('text\n', text);

			// if (line.startsWith('# ')) {
			// 	if (entry.headline) {
			// 		content.push(entry);
			// 	}
			// 	entry = { headline: line.slice(2) };
			// } else if (line.startsWith('![')) {
			// 	entry.image = line.slice(4, -1);
			// } else if (line.startsWith('[')) {
			// 	entry.link = line.slice(1, -1);
			// } else {
			// 	entry.paragraph = line;
			// }
		}
		// content.push(entry);
		// data = { content };
	}

	$: console.log(data);
</script>

<main>
	{#await data}
		<p>loading...</p>
	{:then data}
		<!-- {#if data}
			{#each data.split('\n') as line}
				<p>{line}</p>
			{/each}
		{/if} -->
		{data}
	{/await}
	<!-- 
		<h1>LaraLand</h1>

		<ul>
			{#each data.content as entry}
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
		</ul>
    -->
</main>
