import type { PageServerLoad } from './$types';
import { get } from '$lib/getContent';

async function loadMarkdown() {
	const data = await get();
	console.log(data.body);
	return { props: { jsonData: data.body } };
}
let jsonData = await loadMarkdown();
export const load = (async () => {
	return {};
}) satisfies PageServerLoad;
