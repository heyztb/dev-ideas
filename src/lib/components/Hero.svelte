<script>
	import { Heading, P, Input, Label, Button } from 'flowbite-svelte';
	import Benefits from './Benefits.svelte';
</script>

<div class="text-center mx-auto my-52 w-full md:w-[60%] h-1/3">
	<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
		>Effortlessly boost <Benefits /> <br />with Reddit automation</Heading
	>
	<P class="text-center mb-6 text-lg lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400"
		>Grow your brand by leveraging automation to share to multiple subreddits, simultaneously.</P
	>

	<!-- Begin Mailchimp Signup Form -->
	<div id="mc_embed_signup">
		<form
			action="https://dev.us9.list-manage.com/subscribe/post?u=54ff2206894fd2311e306bdd1&amp;id=e0ebc63580&amp;f_id=00e33ae1f0"
			method="post"
			id="mc-embedded-subscribe-form"
			name="mc-embedded-subscribe-form"
			target="_self"
		>
			<div id="mc_embed_signup_scroll">
				<Heading tag="h4" class="mb-2"
					>Drop your email below to get notified when we launch!</Heading
				>
				<div class="mc-field-group space-y-2 mx-auto w-2/3">
					<Input type="email" placeholder="john@appleseed.org" name="EMAIL" id="mce-EMAIL" required>
						<svg
							slot="right"
							aria-hidden="true"
							class="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
							><path
								d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
							/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg
						>
					</Input>
				</div>
				<div id="mce-responses" class="clear foot">
					<div class="response" id="mce-error-response" style="display:none" />
					<div class="response" id="mce-success-response" style="display:none" />
				</div>
				<!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
				<div style="position: absolute; left: -5000px;" aria-hidden="true">
					<input type="text" name="b_54ff2206894fd2311e306bdd1_e0ebc63580" tabindex="-1" value="" />
				</div>
				<div class="optionalParent">
					<div class="clear foot my-4">
						<Button
							type="submit"
							value="Subscribe"
							name="subscribe"
							id="mc-embedded-subscribe"
							class="w-32 text-g font-semibold"
						>
							Subscribe
						</Button>
					</div>
				</div>
			</div>
		</form>
	</div>

	<!--End mc_embed_signup-->
</div>
