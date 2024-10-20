<script>
	import Not from "./Not.svelte";
	import Pipe from "./Pipe.svelte";
	import Pipe2 from "./Pipe2.svelte";
	import Simulator from "./Simulator.svelte";
</script>

<div>
	<details open>
		<summary class="neon" style="cursor: pointer; --color: lime;"
			><b>Electrical Sim</b></summary
		>
		<div>
			I want to simulate the basic properties of electricity here. I want
			to show that I can create universal boolean logic gates simply by
			modulating electricity.
		</div>
		<div>
			<b class="neon" style="--color: cyan;">Question:</b> Why is electricity
			good at representing info?
		</div>
		<div>
			Electricity can be modeled similar to the flow of water (although
			the analogy breaks down in key places). But the point is we can
			propagate a signal over a wire (or pipe).
		</div>
		<div>
			Simply put, I can have a wire where a signal travels down. Depending
			on the material we can change how this signal gets sent (speed,
			power, ...).
		</div>
		<div>
			<div>
				<b class="neon" style="--color: orange;">Example</b>: using a
				pipe, I could send a signal down a wire to do something at the
				other end. For modeling purposes, this happens instantly.
			</div>
			<Pipe />
		</div>
		<div>
			Now it actually aint this simple. Given I have an electrical signal,
			the electrons don't just bend to my will.
		</div>
		<div>
			<b class="neon" style="--color: red;"
				>So How do I coax the electrons to signal?</b
			>: A quick simple model for getting an electron to do what you want
			is with + and -. Just think of these as two signals. Electrons are
			made up of the - signal and will actively want to move towards +
			signals.
		</div>
		<div>
			In other words, at my example above, I needed the switch side to
			somehow ejects - electrons and have the lightbulb have + that the -
			electrons can move towards. One such way to make the lightbulb +
			like is to remove as many electrons from the lightbulb so that the
			electrons want to move there.
		</div>
		<div>
			This is unfeasible since it also costs energy to do that. Instead,
			leverage the fact that we are ejecting electrons from the switch. In
			other words, as we remove - from the switch, it itself will become +
			like.
		</div>
		<div>
			In other words, complete the circuit so to speak. Just add another
			wire that goes past the signal destination (light bulb) back to the
			source.
			<Pipe2 />
		</div>
		<div>
			Note that this only works if the power source stops electrons from
			flowing backwards. This lets the electrons flow over the longer path
			to reach the ++ part of it instead of just staying in the power
			source.
		</div>
		<div>
			<b class="neon" style:--color="deeppink"
				>Can we encode interesting operations in this simple system?</b
			>: for example, can we encode a few boolean logic gate? If so, then
			we could reconstruct another other logic gate and compute anything
			(also worth revisiting deeply later).
		</div>
		<div>
			<b class="neon" style:--color="fuchsia">Not Gate</b>
			<Not />
		</div>
		<div>
			When the switch is off, the output signal is on. But when the switch
			is on the output signal is off. This is because electricity will
			find the shortest path to the + signal. So most of the electrons
			will find there way down the signal once we turn on the switch.
		</div>
		<div>
			The funny thing is, you can see why electricity represents boolean
			operations so well. In my visualization, to show the property that
			electricity takes the shorter path requires boolean operations in
			the code itself. So it's almost like nature has those properties
			built in, and we just combine them to look nicer in our brain.
		</div>
		<div>
			This is not feasible to show larger circuits due to how manual the
			code process was. So first let me change what I have into a
			functional circuit renderer.
		</div>
		<div>
			battery(neg=switch(bulbA), pos=bulbA) which renders to the first one
		</div>
		<div>
			batter(neg=wire(switch(), bulbA), pos=bulbA) which renders to the
			not gate
		</div>
		<div>Simulator... <Simulator /></div>
	</details>
</div>
