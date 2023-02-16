<script>
	import Nav from '../lib/components/Nav.svelte';
	import Footer from '../lib/components/Footer.svelte';
</script>

<Nav />

<slot />

<Footer />

<style>
	:global(body) {
		-webkit-text-size-adjust: 100%;
		font-feature-settings: normal;
		font-family: Inter var, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI,
			Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji,
			Segoe UI Symbol, Noto Color Emoji;
		line-height: 1.5;
		-moz-tab-size: 4;
		tab-size: 4;
	}
	:global(::selection) {
		background: #ffea00;
	}
</style>
