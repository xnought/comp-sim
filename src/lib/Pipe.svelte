<script>
	let signal = false;
</script>

<div style="display: flex;  width: 500px;">
	<div>
		<button on:click={() => (signal = !signal)}>power switch </button>
		<span style="background: {signal ? 'steelblue' : 'red'};">
			{signal ? "on" : "off"}
		</span>
	</div>
	<span style="color: {signal ? 'yellow' : 'rgba(255,255,255,0.5)'};">
		-----------------------------Light Bulb
	</span>
</div>

<style>
	/*  put stuff here */
</style>
