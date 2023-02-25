<script lang="ts">
	import { enhance } from '$app/forms';
	import { Heading, Label, Input, Helper, Button } from 'flowbite-svelte';
	import type { ActionData } from './$types';

	let captcha: any;

	export let form: ActionData;
</script>

<svelte:head>
	<script src="https://js.hcaptcha.com/1/api.js" async defer></script>
</svelte:head>

<div class="flex flex-col justify-center items-center h-screen">
	<Heading tag="h3" class="text-center">Sign up</Heading>
	<form method="post" action="?/signup" class="w-1/3 space-y-2" use:enhance>
		<Label for="email" color="gray" class="block">Email</Label>
		<Input
			name="email"
			id="email"
			type="email"
			autofocus
			autocomplete
			required
			placeholder="Enter your email address"
		/>
		<Label for="password" color="gray" class="block">Password</Label>
		<Input
			name="password"
			id="password"
			type="password"
			autocomplete
			required
			placeholder="Enter your password"
		/>
		{#if form?.error}
			<Helper class="my-2" color="red"
				><span class="font-semibold">Uh oh!</span> {form?.error}.</Helper
			>
		{/if}
		<div
			bind:this={captcha}
			class="h-captcha"
			data-sitekey="f9b8f5aa-31e8-4ac1-807a-4912e25a66be"
		/>
		<Button type="submit" class="my-2">Sign up</Button>
	</form>
</div>
