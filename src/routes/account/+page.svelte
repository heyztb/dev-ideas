<script lang="ts">
	import { Card, Avatar, Button, Modal, Label, Input, Helper, P } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import type { ActionData } from './$types';
	import { afterUpdate } from 'svelte';
	import { error } from '@sveltejs/kit';
	import { browser } from '$app/environment';

	const billing_url = 'https://billing.stripe.com/p/login/9AQ7vW8AK14gc6cbII';
	const prefilled_billing_url = `https://billing.stripe.com/p/login/9AQ7vW8AK14gc6cbII?prefilled_email=${escape(
		$page.data.account.email
	)}`;

  let showModal = false;
  const toggleModal = () => {
    showModal = !showModal;
  };

  export let form: ActionData;
  afterUpdate(() => {
    setTimeout(() => {
      if (browser) {
        if (form?.message) {
          form.message = ''
        }

        if (form?.error) {
          form.error = ''
        }
      }
    }, 3000)
  })
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
        </P>
      {/if}
			<span class="text-sm text-gray-500 dark:text-gray-400">{$page.data.account.plan} Member</span>
			<div class="flex flex-col space-y-4">
				{#if $page.data.account.email}
					<Button size="sm" href={prefilled_billing_url}>Manage billing</Button>
				{:else}
					<Button size="sm" href={billing_url}>Manage billing</Button>
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
								value={$page.data.account.email}
								required
							/>
						</Label>
						<Button type="submit" class="w-full">Update your account</Button>
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
