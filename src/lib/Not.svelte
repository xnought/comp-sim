<script>
	let signal = false;
</script>

<div style="display: flex;  width: 500px;">
	<div>+power-</div>
	<span style="color: {!signal ? 'yellow' : 'rgba(255,255,255,0.5)'};">
		<span style="color: yellow;">-------------</span><span
			>------------</span
		>Light Bulb
	</span>
</div>
<div style="width: 300px;">
	<div class="w">
		<div style="color: yellow;">|</div>
		<div style="color: {signal ? 'yellow' : 'rgba(255,255,255,0.5)'};">
			|
		</div>
		<div style="color: {!signal ? 'yellow' : 'rgba(255,255,255,0.5)'};">
			|
		</div>
	</div>
	<div class="w">
		<div style="color: yellow;">|</div>
		<div style="color: {signal ? 'yellow' : 'rgba(255,255,255,0.5)'};">
			<div style="position: relative;">
				<button
					style="position: absolute; left: -70px;"
					on:click={() => (signal = !signal)}
					>switch
				</button>
				{signal ? "|" : "/"}
			</div>
		</div>
		<div style="color: {!signal ? 'yellow' : 'rgba(255,255,255,0.5)'};">
			|
		</div>
	</div>
	<div class="w">
		<div style="color: yellow;">|</div>
		<div style="color: {signal ? 'yellow' : 'rgba(255,255,255,0.5)'};">
			|
		</div>
		<div style="color: {!signal ? 'yellow' : 'rgba(255,255,255,0.5)'};">
			|
		</div>
	</div>
	<div>
		<span style="color: yellow;">---------------------</span><span
			style="color: {!signal ? 'yellow' : 'rgba(255,255,255,0.5)'};"
			>--------------------</span
		>
	</div>
</div>

<style>
	.w {
		display: flex;
		justify-content: space-between;
	}
</style>
