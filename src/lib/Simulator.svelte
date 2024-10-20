<script>
	import RenderCircuit from "../RenderCircuit.svelte";
	import { Power, Signal, Circuit, Wire, Switch } from "./circuit";

	export let circuit;
</script>

{#if circuit}
	{#each circuit.other.filter((d) => d.name === "switch") as o, i}
		<div
			style="display: flex; gap: 5px; align-items: center; margin-right: 10px;"
		>
			<button
				on:click={() => {
					o.on = !o.on;
					circuit.reset();
					circuit.simulate();
				}}>{o.name} {i}</button
			>
			<div
				style="height: 10px; width: 10px; background: {o.on
					? 'steelblue'
					: 'crimson'}"
			></div>
			{o.on ? "on (1)" : "off (0)"}
		</div>
	{/each}
	<div style="display: flex; gap: 5px; align-items: center;">
		Output Signal <div
			style="height: 10px; width: 10px; background: {circuit.signal
				.data === 1
				? 'steelblue'
				: 'crimson'}"
		></div>
		{circuit.signal.data === 1 ? "on (1)" : "off (0)"}
	</div>
{/if}
<RenderCircuit {circuit} />
