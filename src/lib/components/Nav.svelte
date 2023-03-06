<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte';
	import type { PageData } from '../../routes/$types';
	import { page } from '$app/stores';
</script>

<Navbar navClass="m-4 sm:m-0" let:hidden let:toggle>
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"> rAuto </span>
	</NavBrand>
	<div class="flex md:order-2">
		{#if !$page.data.session}
			<Button gradient size="sm" href="/login">Log in</Button>
		{:else}
			<Button gradient size="sm" href="/logout">Log out</Button>
		{/if}
		<NavHamburger on:click={toggle} />
	</div>
	<NavUl {hidden}>
		{#if !$page.data.session}
			<NavLi href="/#features">Features</NavLi>
			<NavLi href="/#pricing">Pricing</NavLi>
		{:else}
			<NavLi href="/dashboard">Dashboard</NavLi>
			<NavLi href="/profile">Profile</NavLi>
		{/if}
	</NavUl>
</Navbar>
