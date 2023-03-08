<script lang="ts">
	import { enhance } from '$app/forms';
	import { Card, Button, Label, Input } from 'flowbite-svelte';
</script>

<div class="flex justify-center items-center h-screen">
	<Card class="md:w-full">
		<form class="flex flex-col space-y-6" method="post" action="?/createprofile" use:enhance>
			<h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Let's get some more info about you</h3>
			<Label class="space-y-2">
				<span>Name</span>
				<Input type="text" name="name" placeholder="John Smith" required autofocus />
			</Label>
			<Button gradient type="submit" class="w-full">Create profile</Button>
		</form>
	</Card>
</div>
