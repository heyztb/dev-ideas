<script>
	import { Heading, P, Card, Button } from 'flowbite-svelte';
</script>

<div id="pricing" class="flex flex-col justify-center items-center my-32 h-1/3">
	<Heading tag="h1" class="text-center mb-4">Pricing</Heading>
	<div class="grid grid-flow-row grid-cols-1 md:grid-cols-2">
		<Card padding="xl" class="m-4">
			<h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Early bird</h5>
			<div class="flex items-baseline text-gray-900 dark:text-white">
				<span class="text-3xl font-semibold">$</span>
				<span class="text-5xl font-extrabold tracking-tight">0</span>
				<span class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/month</span>
			</div>
			<!-- List -->
			<ul class="my-7 space-y-4">
				<li class="flex space-x-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6 text-blue-600 dark:text-blue-500"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
						>Post from your account</span
					>
				</li>
				<li class="flex space-x-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6 text-blue-600 dark:text-blue-500"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
						>Share content to multiple subreddits</span
					>
				</li>
				<li class="flex space-x-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6 text-blue-600 dark:text-blue-500"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
						>Collect and respond to feedback</span
					>
				</li>
				<li class="flex space-x-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6 text-blue-600 dark:text-blue-500"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
						>Collect metrics for your posts</span
					>
				</li>
				<li class="flex space-x-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6 text-blue-600 dark:text-blue-500"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
						>Early bird bragging rights</span
					>
				</li>
			</ul>
			<Button gradient href="/signup" class="w-full">Sign up</Button>
		</Card>
		<Card padding="xl" class="m-4">
			<h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Supporter</h5>
			<div class="flex items-baseline text-gray-900 dark:text-white">
				<span class="text-3xl font-semibold">$</span>
				<span class="text-5xl font-extrabold tracking-tight">30</span>
				<span class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/month</span>
			</div>
			<!-- List -->
			<ul class="my-7 space-y-4">
				<li class="flex space-x-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6 text-blue-600 dark:text-blue-500"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
						>Everything from the early bird plan</span
					>
				</li>
				<li class="flex space-x-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6 text-blue-600 dark:text-blue-500"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
						>Test new features as we grow</span
					>
				</li>
				<li class="flex space-x-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6 text-blue-600 dark:text-blue-500"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
						>Feedback and support priority</span
					>
				</li>
				<li class="flex space-x-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6 text-blue-600 dark:text-blue-500"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span class="text-base font-normal leading-tight text-gray-500">Supporter bragging rights</span>
				</li>
				<li class="flex space-x-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6 text-blue-600 dark:text-blue-500"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"
						>My undying gratitude</span
					>
				</li>
			</ul>
			<Button gradient href="/signup" class="w-full">Sign up</Button>
		</Card>
	</div>
</div>
