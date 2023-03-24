<script lang="ts">
	import { page } from '$app/stores'
	import { Heading } from 'flowbite-svelte';
</script>

<div id="dashboard" class="flex">
	<Heading tag="h2" class="mt-2 text-center md:text-left md:ml-4 md:mt-4">
		Welcome {$page.data.account.username}
	</Heading>
</div>