<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';

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
</script>

{#key currentBenefit}
	<span
		in:fly={{
			y: -100,
			duration: 600,
			easing: quadInOut
		}}
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
