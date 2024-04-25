import type { PageServerLoad } from './$types';
// import getContent from '$lib/getContent';

async function getContent() {
	const owner = 'KoljaL'; // Replace with the GitHub username or organization name
	const repo = 'Laraland'; // Replace with the GitHub repository name
	const path = 'content/Laraland.md'; // Replace with the path to your markdown file in the repository
	const imagePath = 'content/img';
	const { jsonData, imageUrls } = await fetchMarkdownFromGitHub(owner, repo, path);
	await downloadImages(imageUrls);
	return await sortJsonByHeadline(jsonData);
}

async function fetchMarkdownFromGitHub(owner, repo, path) {
	const response = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/main/${path}`);
	if (!response.ok) {
		throw new Error(`Failed to fetch markdown file: ${response.status} ${response.statusText}`);
	}
	const markdownContent = await response.text();
	const jsonData = markdownToJson(markdownContent);
	const imageUrls = extractImageUrls(markdownContent);
	return { jsonData, imageUrls };
}

function markdownToJson(markdownContent) {
	const entries = [];
	const regex =
		/# (.*?)\n\n!\[(.*?)\]\((.*?)\)\n\n\[.*?\]\((.*?)\)\n\[.*?\]\((.*?)\)\nTags: (.*?)\n\n(.*?)\n---/gs;
	let match;
	while ((match = regex.exec(markdownContent)) !== null) {
		const entry = {
			headline: match[1],
			image: match[3],
			link: match[4],
			repository: match[5],
			tags: match[6].split(',').map((tag) => tag.trim()),
			paragraph: match[7].trim()
		};
		entries.push(entry);
	}
	return entries;
}

function extractImageUrls(markdownContent) {
	const imageUrls = [];
	const regex = /!\[.*?\]\((.*?)\)/g;
	let match;
	while ((match = regex.exec(markdownContent)) !== null) {
		imageUrls.push(match[1]);
	}
	return imageUrls;
}

function sortJsonByHeadline(jsonData) {
	return jsonData.sort((a, b) => a.headline.localeCompare(b.headline));
}

async function downloadImages(imageUrls) {
	for (let imageUrl of imageUrls) {
		const imageName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
		const imgDir = 'src/img';
		const imagePath = `${imgDir}/${imageName}`;
		const imageResponse = await fetch(imageUrl);
		if (imageResponse.ok) {
			const arrayBuffer = await imageResponse.arrayBuffer();
			fs.writeFileSync(imagePath, Buffer.from(arrayBuffer));
		} else {
			console.error(`Failed to download image: ${imageUrl}`);
		}
	}
}

export const load: PageServerLoad = async () => {
	try {
		const content = await getContent();
		console.log(content);
		return {
			content
		};

		// write a fetch function to a dummy api
		// const response = await fetch('https://jsonplaceholder.typicode.com/posts');
		// const data = await response.json();
		// console.log(data);
		// return {
		// 	props: {
		// 		data
		// 	}
		// };
	} catch (error) {
		console.error(`Error in load function for /: ${error}`);
	}
};
