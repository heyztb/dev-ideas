<script lang="ts">
	import { fly } from 'svelte/transition';

	let benefits = ['traffic', 'sales', 'engagement', 'visibility', 'influence'];
	// default the benefit shown to the first in our list
	let currentBenefit: string = benefits[0];

	function getBenefit() {
		let benefit = benefits.shift()!;
		currentBenefit = benefit;
		benefits.push(benefit);
	}

	setInterval(getBenefit, 3000);
</script>

<!-- TODO: Add animations! -->
<span>{currentBenefit}</span>

<style>
	span {
		background: -webkit-linear-gradient(bottom, #5281ea, #1a56db);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
