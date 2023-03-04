<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte';
</script>

<Navbar navClass="m-4 sm:m-0" let:hidden let:toggle>
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"> rAuto </span>
	</NavBrand>
	<div class="flex md:order-2">
		<Button gradient size="sm" href="/login">Log in</Button>
		<NavHamburger on:click={toggle} />
	</div>
	<NavUl {hidden}>
		<NavLi href="/#features">Features</NavLi>
		<NavLi href="/#pricing">Pricing</NavLi>
	</NavUl>
</Navbar>
