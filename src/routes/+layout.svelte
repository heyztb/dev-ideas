<script lang="ts">
	import '../app.postcss';
	import Nav from '../lib/components/Nav.svelte';
	import Footer from '../lib/components/Footer.svelte';

	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.data.title}</title>
	<meta name="description" content={$page.data.description} />
	<!-- 100% privacy friendly analytics -->
	<script async defer src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
	<noscript
		><img
			src="https://queue.simpleanalyticscdn.com/noscript.gif"
			alt=""
			referrerpolicy="no-referrer-when-downgrade"
		/></noscript
	>
</svelte:head>

<Nav />

<slot />

<Footer />
