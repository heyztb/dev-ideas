<script lang="ts">
	import { Heading, Label, Input, Helper, Button } from 'flowbite-svelte';
	import { afterUpdate } from 'svelte';

	type signupData = {
		email: string;
		password: string;
	};

	type errorData = {
		message?: string;
	};

	let error: errorData = {};

	afterUpdate(() => {
		setTimeout(() => {
			if (error.message) {
				error.message = undefined;
			}
		}, 3500);
	});

	const handleSubmit = async (event: any) => {
		error = {};
		const formData = new FormData(event.target);

		const email: string = formData.get('email')?.toString() ?? '';
		const password: string = formData.get('password')?.toString() ?? '';

		const data: signupData = {
			email,
			password
		};

		const body = new URLSearchParams(data);
		const response: Response = await fetch('/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body
		});

		if (!response.ok) {
			event.target.reset();
			const respBody = await response.json();
			error['message'] = respBody['message'];
			return;
		}
	};
</script>

<svelte:head>
	<script src="https://js.hcaptcha.com/1/api.js" async defer></script>
</svelte:head>

<div class="flex flex-col justify-center items-center h-screen">
	<Heading tag="h3" class="text-center">Sign up</Heading>
	<form on:submit|preventDefault={handleSubmit} method="post" class="w-1/3 space-y-2">
		<Label for="email" color="gray" class="block">Email</Label>
		<Input
			id="email"
			type="email"
			autofocus
			autocomplete
			required
			placeholder="Enter your email address"
		/>
		<Label for="password" color="gray" class="block">Password</Label>
		<Input
			id="password"
			type="password"
			autocomplete
			required
			placeholder="Enter your email address"
		/>
		{#if error.message}
			<Helper class="my-2" color="red"
				><span class="font-medium">Uh oh!</span> {error.message}</Helper
			>
		{/if}
		<div class="h-captcha " data-sitekey="f9b8f5aa-31e8-4ac1-807a-4912e25a66be" />
		<Button type="submit" disabled={error.message} class="my-2">Sign up</Button>
	</form>
</div>
