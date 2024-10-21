<script>
	import RenderCircuit from "../RenderCircuit.svelte";
	import { Power, Signal, ElectricalCircuit, Wire, Switch } from "./circuit";

	export let circuit;
	export let sameSignals = false;
	let toggleSame = true;
	function switchAll() {
		for (const c of circuit.other.filter((d) => d.name === "switch")) {
			if (toggleSame) {
				c.switchOn();
			} else {
				c.switchOff();
			}
		}
	}
</script>

{#if circuit}
	{#if sameSignals}
		<div
			style="display: flex; gap: 5px; align-items: center; margin-right: 10px;"
		>
			<button
				on:click={() => {
					toggleSame = !toggleSame;
					switchAll();
					circuit.reset();
					circuit.simulate();
					circuit = circuit;
				}}>switch all</button
			>
			<div
				style="height: 10px; width: 10px; background: {toggleSame
					? 'steelblue'
					: 'crimson'}"
			></div>
			{toggleSame ? "on (1)" : "off (0)"}
		</div>
	{:else}
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
	{/if}
	<div style="display: flex; gap: 5px; align-items: center;">
		Output Signal <div
			style="height: 10px; width: 10px; background: {circuit.signal
				.data === 1
				? 'steelblue'
				: 'crimson'}"
		></div>
		{circuit.signal.data === 1 ? "on (1)" : "off (0)"}
	</div>
	<RenderCircuit {circuit} />
{/if}
