<script lang="ts">
	export let data: any;
	$: console.log(data);
</script>

<main>
	{#if data}
		<!-- <pre>
		{JSON.stringify(data, null, 2)}
  </pre> -->

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
	{:else}
		<p>Loading...</p>
	{/if}
</main>
