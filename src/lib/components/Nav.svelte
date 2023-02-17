<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { page } from '$app/stores';

	let current = $page.url.pathname;
</script>

<Navbar navClass="m-4 sm:m-0" let:hidden let:toggle>
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"> rAuto </span>
	</NavBrand>
	<NavHamburger on:click={toggle} />
	<NavUl {hidden}>
		<NavLi href="#about">About</NavLi>
		<NavLi href="#features">Features</NavLi>
		<NavLi href="#pricing">Pricing</NavLi>
		<NavLi href="#contact">Contact</NavLi>
	</NavUl>
</Navbar>
