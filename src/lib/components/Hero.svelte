<script>
	import { Heading, P, Button } from 'flowbite-svelte';
	import Benefits from './Benefits.svelte';
</script>

<div class="text-center mx-auto my-52 w-full md:w-[60%] h-1/3">
	<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
		>Effortlessly boost <Benefits /> <br />with Reddit automation</Heading
	>
	<P class="text-center mb-6 text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
		>Grow your brand by leveraging automation to share to multiple subreddits, simultaneously.</P
	>
	<Button href="#features"
		>Try it for free
		<svg
			class="ml-2 -mr-1 w-5 h-5"
			fill="currentColor"
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
			><path
				fill-rule="evenodd"
				d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
				clip-rule="evenodd"
			/></svg
		>
	</Button>
</div>
