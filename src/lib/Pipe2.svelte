<script>
	let signal = false;
</script>

<div style="display: flex;  width: 500px;">
	<div>
		<button on:click={() => (signal = !signal)}> power switch </button>
		<span style="background: {signal ? 'lime' : 'red'};">
			{signal ? "on" : "off"}
		</span>
	</div>
	<span style="color: {signal ? 'yellow' : 'rgba(255,255,255,0.5)'};">
		<div>-----------------------------Light Bulb</div>
		<div>{"<"}-----------------------------|</div>
	</span>
</div>

<style>
	/*  put stuff here */
</style>
