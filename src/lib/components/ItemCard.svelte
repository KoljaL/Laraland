<script lang="ts">
	export let item: any;
</script>

<!-- <div class="overflow-hidden rounded-lg bg-white shadow-lg">
	<img class="h-56 w-full object-cover object-center" src={item.imageUrl} alt={item.imageAltText} />
	<div class="p-4">
		<h2 class="text-xl font-semibold text-gray-800">{item.headline}</h2>
		<p class="mt-2 text-gray-600">{item.description}</p>
		<div class="mt-4 flex items-center justify-between">
			<a href={item.linkUrl} class="text-blue-600 hover:underline">{item.linkText}</a>
			<div>
				{#each item.tags as tag}
					<span class="mr-2 rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-800">{tag}</span>
				{/each}
			</div>
		</div>
	</div>
</div> -->

<article
	class="overflow-hidden rounded-lg shadow transition hover:shadow-lg dark:shadow-gray-700/25"
>
	<img alt="" src={item.imageUrl} class="h-56 w-full object-cover" />

	<div class="bg-white p-4 sm:p-6 dark:bg-gray-900">
		{#each item.tags as tag}
			<span class="rounded-fullblock mr-2 text-xs text-gray-500 dark:text-gray-400">{tag}</span>
		{/each}

		<a href={item.linkUrl}>
			<h3 class="mt-0.5 text-lg text-gray-900 dark:text-white">
				{item.linkText}
			</h3>
		</a>

		<p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400">
			{item.description}
		</p>
	</div>
</article>
