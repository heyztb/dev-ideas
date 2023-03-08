<script lang="ts">
	import { enhance } from '$app/forms';
	import { Card, Button, Label, Input, Helper } from 'flowbite-svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="flex justify-center items-center h-screen">
	<Card class="md:w-full">
		<form class="flex flex-col space-y-6" method="post" action="?/updatepassword" use:enhance>
			<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Update password</h3>
			<Label class="space-y-2">
				<span>New password</span>
				<Input type="password" name="password" placeholder="••••••••" required />
			</Label>
			<Label class="space-y-2">
				<span>Confirm new password</span>
				<Input type="password" name="confirm-password" placeholder="••••••••" required />
			</Label>
			{#if form?.error}
				<Helper class="my-2" color="red"
					><span class="font-semibold">Uh oh!</span> {form?.error}.</Helper
				>
			{/if}
			<Button gradient type="submit" class="w-full">Update password</Button>
		</form>
	</Card>
</div>
