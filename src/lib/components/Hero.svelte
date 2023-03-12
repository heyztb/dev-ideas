<script>
	import { Heading, P, Input, Label, Button } from 'flowbite-svelte';
	import Benefits from './Benefits.svelte';
</script>

<div class="flex flex-col justify-center items-center my-32 h-1/3">
	<Heading tag="h1" class="mb-4 text-center" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
		>Effortlessly boost <Benefits /> <br />with Reddit automation</Heading
	>
	<P class="text-center mb-6 text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
		>Grow your brand by leveraging automation to share to multiple subreddits, simultaneously.</P
	>
	<Button gradient href='/login'>Get started for free</Button>
	<P class="text-center text-xs mt-1" color="text-gray-500">Cancel anytime</P>
</div>
