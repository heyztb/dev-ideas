<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { Card, Button, Label, Input, Helper, Select } from 'flowbite-svelte';
	import { afterUpdate } from 'svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
	let selected: string;
	let plans = [
		{value: "free", name:"Early bird"},
		{value: "supporter", name:"Supporter"},
	]

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

<div class="flex justify-center items-center h-screen">
	<Card class="md:w-full">
		<form class="flex flex-col space-y-6" method="post" action="?/signup" use:enhance>
			<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Sign up</h3>
			<Label class="space-y-2">
				<span>Email</span>
				<Input type="email" name="email" placeholder="name@company.com" required />
			</Label>
			<Label class="space-y-2">
				<span>Your password</span>
				<Input type="password" name="password" placeholder="••••••••" required />
			</Label>
			<Label class="space-y-2">
				<span>Confirm your password</span>
				<Input type="password" name="confirm-password" placeholder="••••••••" required />
			</Label>
			<Label class="space-y-2">
				<span>Select your plan</span>
				<Select bind:value={selected} items={plans} name="plan"/>
			</Label>
			<div class="h-captcha" data-sitekey="f9b8f5aa-31e8-4ac1-807a-4912e25a66be" />
			{#if form?.error}
				<Helper class="my-2" color="red"
					><span class="font-semibold">Uh oh!</span> {form?.error}.</Helper
				>
			{/if}
			{#if form?.message}
				<Helper class="my-2" color="green">{form?.message}</Helper>
			{/if}
			<Button gradient type="submit" class="w-full">Sign up</Button>
			<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
				Already have an account? <a href="/login" class="text-blue-700 hover:underline dark:text-blue-500"
					>Log in</a
				>
			</div>
		</form>
	</Card>
</div>
