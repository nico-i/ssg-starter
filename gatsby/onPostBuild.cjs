const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// TODO: Replace this with a custom template
const exampleTemplate = require('../src/templates/OG/example.js');

/**
 * This post build script is used to generate OG images for blog posts and other pages.
 * Based off of https://github.com/PostHog/posthog.com/blob/138a67505cc806e12d3500969b96e00b741ce338/gatsby/onPostBuild.js
 */
module.exports = exports.onPostBuild = async () => {
	// TODO: Fetch data from your graphql endpoint
	//   const { data } = await graphql(`
	//     query {
	//     }
	//   `);

	// Create the og-images directory in the output folder if it doesn't exist
	const dir = path.resolve(__dirname, '../public/og-images');
	if (!fs.existsSync(dir)) fs.mkdirSync(dir);

	// TODO: Fetch and save a font to the assets folder
	//   const relFontPath = `../assets/fonts/example-font.woff`;
	//   const res = await fetch("url-to-your-font.woff");
	//   await new Promise((resolve, reject) => {
	//     // Save the font to the assets folder
	//     const fileStream = fs.createWriteStream(
	//       path.resolve(__dirname, relFontPath),
	//     );
	//     res.body?.pipe(fileStream);
	//     res.body?.on("error", (err) => {
	//       reject(err);
	//     });
	//     fileStream.on("finish", function () {
	//       resolve(void 0);
	//     });
	//   });
	//   const font = fs.readFileSync(path.resolve(__dirname, relFontPath), {
	//     encoding: "base64",
	//   });

	const browser = await chromium.launch({
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
		headless: true,
	});

	const page = await browser.newPage();
	await page.setViewportSize({
		width: 1200,
		height: 630,
	});
	async function createOG({ html, slug }) {
		await page.setContent(html, {
			waitUntil: 'domcontentloaded',
		});

		await page.evaluateHandle('document.fonts.ready');

		await page.screenshot({
			type: 'jpeg',
			path: `${dir}/${slug.replace(/\//g, '')}.jpeg`,
			quality: 75,
		});
	}

	// TODO: Load an image from the assets folder
	//   const relPathToOGImage = `../assets/img/og/example.jpeg`;
	//   const image = fs.readFileSync(path.resolve(__dirname, relPathToOGImage), {
	//     encoding: "base64",
	//   });

	await createOG({
		html: exampleTemplate({
			title: 'Example OG Image',
			description: 'This is an example blog post.',
			image: '',
		}),
		slug: '/example',
	});

	// Repeat this process for all pages that need OG images

	await browser.close();
};
