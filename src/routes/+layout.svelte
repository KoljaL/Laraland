<script lang="ts">
	import '../app.pcss';

	let toggleIcon: HTMLSpanElement;

	function toggleDarkMode() {
		const htmlElement = document.querySelector('html');
		if (htmlElement) {
			htmlElement.classList.toggle('dark');
			if (htmlElement.classList.contains('dark')) {
				toggleIcon.classList.remove('i-[ph--sun]');
				toggleIcon.classList.add('i-[ph--moon]');
			} else {
				toggleIcon.classList.remove('i-[ph--moon]');
				toggleIcon.classList.add('i-[ph--sun]');
			}
		}
	}
</script>

<header
	class="sticky top-0 z-50 flex w-full flex-wrap text-sm text-dark-primary sm:flex-nowrap sm:justify-start dark:bg-neutral-800"
>
	<a class="dark:text-red flex-none text-xl font-semibold" href="/" aria-label="Brand">
		Lara-Land
	</a>
	<button
		class="absolute right-0 top-0 p-4 text-gray-500 dark:text-gray-400"
		on:click={toggleDarkMode}
	>
		<span bind:this={toggleIcon} class="i-[ph--sun] h-10 w-10 bg-dark-primary"></span>
	</button>
</header>

<main id="content">
	<div
		class="mx-auto min-h-screen max-w-[85rem] border-x-gray-200 bg-white px-4 py-10 sm:px-6 lg:px-8 xl:border-x dark:border-x-gray-700 dark:bg-neutral-800"
	>
		<slot></slot>
	</div>
</main>

<footer
	class="sticky bottom-0 border-t border-gray-200 bg-white dark:border-neutral-700 dark:bg-neutral-800"
>
	<div class="mx-auto max-w-[85rem] px-4 py-1 sm:px-6 lg:px-8">
		<div
			class="flex flex-col items-center justify-center gap-y-4 sm:flex-row sm:justify-between sm:gap-y-0"
		>
			<p class="text-sm text-gray-500 dark:text-neutral-400">© 2021 All rights reserved</p>
			<div class="flex gap-x-4">
				<a
					href="https://github.com/koljal/laraland"
					class="text-blue-600 hover:underline dark:text-blue-500"
					target="_blank"
				>
					Source code on GitHub</a
				>
			</div>
		</div>
	</div>
</footer>

<!-- -->

<style>
	:global(body > div) {
		display: flex;
		flex-direction: column;
	}
</style>
