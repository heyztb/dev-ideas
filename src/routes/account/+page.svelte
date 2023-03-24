<script lang="ts">
	import { Card, Avatar, Button, Modal, Label, Input, Helper, P } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import type { ActionData } from './$types';
	import { afterUpdate } from 'svelte';
	import { browser } from '$app/environment';

	const encoded_email = encodeURIComponent($page.data.account.email);

	const payment_link = 'https://buy.stripe.com/aEU5myaWS1sigNybII';
	const prefilled_payment_link = `https://buy.stripe.com/aEU5myaWS1sigNybII?prefilled_email=${encoded_email}`;
	const prefilled_billing_url = `https://billing.stripe.com/p/login/9AQ7vW8AK14gc6cbII?prefilled_email=${encoded_email}`;

	let email = $page.data.account.email;
	let showModal = false;
	let emailError: string = '';

	const toggleModal = () => {
		showModal = !showModal;
	};

	const checkEmail = (event: MouseEvent) => {
		const email = $page.data.account.email;
		const email_verified = $page.data.account.email_verified;
		if (!email) {
			event.preventDefault();
			emailError = 'Please add and verify your email address to continue';
			toggleModal();
		}

		if (!email_verified) {
			event.preventDefault();
			emailError = 'Please verify your email first';
			toggleModal();
		}
	};

	export let form: ActionData;

	afterUpdate(() => {
		setTimeout(() => {
			if (browser) {
				if (form?.message) {
					form.message = '';
				}

				if (form?.error) {
					form.error = '';
				}
			}
		}, 3000);
	});
</script>

<div class="flex flex-col justify-center items-center w-screen h-full">
	<Card padding="xl" size="xl" class="my-32">
		{#if form?.error}
			<Helper color="red" class="text-center mb-4">
				<span>{form.error}</span>
			</Helper>
		{/if}
		{#if form?.message}
			<Helper color="green" class="text-center mb-4">
				<span>{form.message}</span>
			</Helper>
		{/if}
		<div class="flex flex-col items-center pb-4 space-y-2">
			<Avatar size="lg" src={$page.data.account.image} />
			<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
				{$page.data.account.username}
			</h5>
			{#if $page.data.account.email}
				<P class="text-xs" color="text-gray-500">
					{$page.data.account.email}
					{#if !$page.data.account.email_verified}
						<span>(unverified)</span>
					{/if}
				</P>
			{/if}
			<span class="text-sm text-gray-500 dark:text-gray-400">{$page.data.account.plan} member</span>
			<div class="flex flex-col space-y-4">
				{#if $page.data.account.plan === 'premium'}
					<Button on:click={checkEmail} size="sm" href={prefilled_billing_url}
						>Manage billing</Button
					>
				{:else if $page.data.account.email}
					<Button on:click={checkEmail} size="sm" href={prefilled_payment_link}
						>Upgrade account</Button
					>
				{:else}
					<Button on:click={checkEmail} size="sm" href={payment_link}>Upgrade account</Button>
				{/if}
				<Button size="sm" color="light" class="dark:text-white" on:click={toggleModal}
					>Update information</Button
				>
				<Modal bind:open={showModal} size="xs" autoclose={false} class="w-full">
					<form class="flex flex-col space-y-6" method="post" action="/account?/updateemail">
						<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">
							Update your account
						</h3>
						<Label class="space-y-2">
							<span>Email</span>
							<Input
								type="email"
								name="email"
								placeholder="name@company.com"
								bind:value={email}
								required
							/>
						</Label>
						{#if emailError}
							<Helper color="red" class="text-center mb-4">
								<span>{emailError}</span>
							</Helper>
						{/if}
						{#if email === $page.data.account.email && !$page.data.account.email_verified}
							<Button type="submit" class="w-full" color="light">Resend verification email</Button>
						{:else}
							<Button type="submit" class="w-full">Update your account</Button>
						{/if}
					</form>
				</Modal>
			</div>
		</div>
	</Card>
</div>

<style>
	span::first-letter {
		text-transform: capitalize;
	}
</style>
