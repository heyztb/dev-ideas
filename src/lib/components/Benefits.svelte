<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';
	import { quadIn, quadInOut } from 'svelte/easing';

	let benefits = ['traffic', 'sales', 'engagement', 'visibility', 'influence'];
	let currentBenefit: string = benefits[0];

	const switchBenefit = () => {
		let benefit = benefits.shift()!;
		currentBenefit = benefit;
		benefits.push(benefit);
	};

	let switchBenefitInterval: NodeJS.Timer;

	onMount(() => {
		switchBenefitInterval = setInterval(switchBenefit, 3000);
	});

	onDestroy(() => {
		if (switchBenefitInterval) {
			clearInterval(switchBenefitInterval);
		}
	});
</script>

{#key currentBenefit}
	<span
		in:fly={{
			y: 1000,
			duration: 800,
			easing: quadInOut
		}}
		class="h-full w-auto"
	>
		{currentBenefit}
	</span>
{/key}

<style>
	span {
		background: -webkit-linear-gradient(bottom, #5281ea, #1a56db);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
