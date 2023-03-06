<script>
	import { Heading, P, Card, Button } from 'flowbite-svelte';

	let features = [
		{
			title: 'Multi-Subreddit Sharing',
			description: 'Select multiple subreddits to share your content to simultaneously'
		},
		{
			title: 'Metrics Tracking',
			description:
				'Track post and comment metrics, including upvotes, downvotes, awards, and more'
		},
		{
			title: 'Feedback Collection',
			description:
				'Automatically collect and respond to comments and feedback from one dashboard'
		},
		// {
		// 	title: 'Sentiment Analysis',
		// 	description:
		// 		'Get deeper insights into how your content is being received by different communities'
		// },
		// {
		// 	title: 'Niche Analysis',
		// 	description:
		// 		'Subreddit rankings for different niches, enabling users to identify the most active and engaged communities related to their content'
		// },
		// {
		// 	title: 'Scheduling',
		// 	description:
		// 		'Users can schedule their posts to be shared on selected subreddits at a particular date and time'
		// },
	];
</script>

<div id="features" class="flex flex-col justify-center items-center my-32 h-1/3">
	<Heading tag="h1" class="text-center mb-4">What we do</Heading>
	<div class="grid grid-flow-row-dense grid-cols-1 md:grid-cols-3">
	{#each features as { title, description }}
		<Card class="m-2">
		  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
		  <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
		   	{description} 
		  </p>
		</Card>	
	{/each}
	</div>
</div>
