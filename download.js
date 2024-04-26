import https from 'https';
import fs from 'fs';
import path from 'path';

const markdownPath = 'content/Laraland.md';
const ghURL = `https://raw.githubusercontent.com/KoljaL/Laraland/main/`;
const savePath = './src/content';

const { jsonData, imageUrls } = await fetchMarkdownFromGitHub(ghURL + markdownPath);
await saveJsonToFile(jsonData, savePath);
await downloadImages(imageUrls);

async function saveJsonToFile(jsonData, savePath) {
	const sortedJsonData = sortJsonByHeadline(jsonData);
	const jsonPath = path.join(savePath, 'Laraland.json');
	const jsonContent = JSON.stringify(sortedJsonData, null, 2);
	fs.writeFileSync(jsonPath, jsonContent);
	console.log(`Saved JSON data to ${jsonPath}`);
}

async function fetchMarkdownFromGitHub(ghURL) {
	const response = await fetch(ghURL);
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
		const imgUrl = ghURL + imageUrl.substring(0, imageUrl.lastIndexOf('/'));
		const imageName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
		const imagePath = `${imgUrl}/${imageName}`;
		try {
			await downloadImage(imagePath);
			console.log(`Downloaded ${imagePath}`);
		} catch (error) {
			console.error(`Failed to download ${imagePath}: ${error.message}`);
		}
	}
}

async function downloadImage(url) {
	return new Promise((resolve, reject) => {
		https
			.get(url, (res) => {
				if (res.statusCode === 200) {
					const filename = path.basename(url);
					const filepath = path.join(savePath + '/img', `${filename}`);
					const fileStream = fs.createWriteStream(filepath);
					res.pipe(fileStream);
					fileStream.on('error', (err) => {
						reject(err);
					});
					fileStream.on('close', () => {
						resolve(filepath);
					});
				} else {
					res.resume();
					reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
				}
			})
			.on('error', (err) => {
				reject(err);
			});
	});
}
