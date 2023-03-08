import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter(),
		csp: {
			mode: "nonce",
			directives: {
				'script-src': ['self', 'https://hcaptcha.com', 'https://*.hcaptcha.com', 'https://simpleanalyticscdn.com', 'https://*.simpleanalyticscdn.com'],
				'frame-src': ['self', 'https://hcaptcha.com', 'https://*.hcaptcha.com'],
				'style-src': ['self', 'https://hcaptcha.com', 'https://*.hcaptcha.com'],
				'connect-src': ['self', 'https://hcaptcha.com', 'https://*.hcaptcha.com', 'https://nsnoqrkywjdrvqgrgyfr.supabase.co'],
			}
		}
	}
};

export default config;
