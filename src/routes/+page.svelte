<script lang="ts">
	interface ContentEntry {
		headline: string | null;
		imageAltText: string | null;
		imageUrl: string | null;
		linkText: string | null;
		linkUrl: string | null;
		tags: string[];
		categories: string[];
		description: string;
	}

	// type ContentEntry can be null
	// type ContentEntry = {
	// 	headline: string | null;
	// 	imageAltText: string | null;
	// 	imageUrl: string | null;
	// 	linkText: string | null;
	// 	linkUrl: string | null;
	// 	tags: string[];
	// 	categories: string[];
	// 	description: string;
	// };

	// type ContentEntries = ContentEntry[];

	async function fetchData(url: string): Promise<string> {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(
				`Failed to fetch data from ${url}: ${response.status} ${response.statusText}`
			);
		}
		return await response.text();
	}

	async function extractMarkdownSection(section: string): Promise<ContentEntry> {
		const headlineRegex = /^## (.*)$/m;
		const imageRegex = /\[!\[(.*?)\]\((.*?)\)\]\((.*?)\)/;
		const linkRegex = /\[(.*?)\]\((.*?)\)/;
		const tagsRegex = /Tags: (.*)/;
		const categoriesRegex = /Categories: (.*)/;

		const headlineMatch = section.match(headlineRegex);
		const imageMatch = section.match(imageRegex);
		const linkMatch = section.match(linkRegex);
		const tagsMatch = section.match(tagsRegex);
		const categoriesMatch = section.match(categoriesRegex);

		const headline = headlineMatch ? headlineMatch[1] : null;
		const imageAltText = imageMatch ? imageMatch[1] : null;
		const imageUrl = imageMatch ? imageMatch[2] : null;
		const linkText = linkMatch ? linkMatch[1] : null;
		const linkUrl = linkMatch ? linkMatch[2] : null;
		const tags = tagsMatch ? tagsMatch[1].split(',').map((tag) => tag.trim()) : [];
		const categories = categoriesMatch
			? categoriesMatch[1].split(',').map((category) => category.trim())
			: [];

		const description = section
			.replace(headlineRegex, '')
			.replace(imageRegex, '')
			.replace(linkRegex, '')
			.replace(tagsRegex, '')
			.replace(categoriesRegex, '')
			.trim();

		return {
			headline,
			imageAltText,
			imageUrl,
			linkText,
			linkUrl,
			tags,
			categories,
			description
		};
	}

	async function splitMarkdownInSections(md: string): Promise<ContentEntry[]> {
		const sections = md.split('---\n');
		const content: ContentEntry[] = [];
		for (const section of sections) {
			if (!section.trim()) continue;
			const entry = await extractMarkdownSection(section.trim());
			content.push(entry);
		}
		return content;
	}

	async function main() {
		const url = 'https://raw.githubusercontent.com/KoljaL/Laraland/main/content/Laraland.md';
		try {
			const markdownContent = await fetchData(url);
			const content = await splitMarkdownInSections(markdownContent);
			// console.log(content);
			return content;
		} catch (error) {
			console.error('Error:', (error as Error).message);
			return [];
		}
	}

	async function loadContent() {
		try {
			content = await main();
			return content;
		} catch (error) {
			console.error('Error:', (error as Error).message);
			throw error;
		}
	}
	let content: ContentEntry[] = [];
	loadContent();
	// $: console.log(content);
</script>

<div class="container mx-auto px-4 py-8">
	{#if content.length > 0}
		{#each content as entry}
			<article class="text-secondary dark:text-secondary mb-6 rounded-md p-6 shadow-md">
				{#if entry.headline}
					<h2 class="mb-4 text-xl font-bold">{entry.headline}</h2>
				{/if}
				{#if entry.imageUrl}
					<img src={entry.imageUrl} alt={entry.imageAltText} class="mb-4 rounded-md" />
				{/if}
				{#if entry.linkUrl}
					<a href={entry.linkUrl} class="mb-4 text-blue-500 hover:underline">{entry.linkText}</a>
				{/if}
				{#if entry.tags.length}
					<div class="mb-4 flex flex-wrap">
						{#each entry.tags as tag}
							<span class="mb-2 mr-2 rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700"
								>{tag}</span
							>
						{/each}
					</div>
				{/if}
				{#if entry.categories.length}
					<div class="mb-4 flex flex-wrap">
						{#each entry.categories as category}
							<span class="mb-2 mr-2 rounded-full bg-blue-200 px-3 py-1 text-sm text-blue-700"
								>{category}</span
							>
						{/each}
					</div>
				{/if}
				<p class="text-gray-700">{entry.description}</p>
			</article>
		{/each}
	{:else}
		<p>No content available</p>
	{/if}
</div>
<!-- 
{#await loadContent()}
	<p>Loading...</p>
{:then content}
	{#each content as entry}
		<article>
		</article>
	{/each}
{:catch error}
	<p>Error: {error.message}</p>
{/await} -->
