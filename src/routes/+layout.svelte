<script>
	import '../app.postcss';
	import Nav from '../lib/components/Nav.svelte';
	import Footer from '../lib/components/Footer.svelte';
	import './global.css';
</script>

<Nav />

<slot />

<Footer />
