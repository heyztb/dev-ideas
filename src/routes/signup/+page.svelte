<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { Heading, Label, Input, Helper, Button } from 'flowbite-svelte';
	import { afterUpdate } from 'svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	afterUpdate(() => {
		if (browser) {
			if (form?.message) {
				let hcaptcha: any = window.hcaptcha;
				hcaptcha.reset();
			}
		}
	});
</script>

<svelte:head>
	<script src="https://js.hcaptcha.com/1/api.js" async defer></script>
</svelte:head>

<div class="flex flex-col justify-center items-center h-screen">
	<Heading tag="h3" class="text-center">Sign up</Heading>
	<form method="post" action="?/signup" class="w-1/3 space-y-4" use:enhance>
		<Label for="email" color="gray" class="block">Email</Label>
		<Input
			name="email"
			id="email"
			type="email"
			autofocus
			required
			placeholder="Enter your email address"
		/>
		<Label for="password" color="gray" class="block">Password</Label>
		<Input
			name="password"
			id="password"
			type="password"
			required
			placeholder="Enter your password"
		/>
		<Label for="confirm-password" color="gray" class="block">Confirm Password</Label>
		<Input
			name="confirm-password"
			id="confirm-password"
			type="password"
			required
			placeholder="Confirm your password"
		/>
		<div class="h-captcha" data-sitekey="f9b8f5aa-31e8-4ac1-807a-4912e25a66be" />
		{#if form?.error}
			<Helper class="my-2" color="red"
				><span class="font-semibold">Uh oh!</span> {form?.error}.</Helper
			>
		{/if}
		{#if form?.message}
			<Helper class="my-2" color="green">{form?.message}</Helper>
		{/if}
		<Button type="submit" class="my-2">Sign up</Button>
	</form>
</div>
