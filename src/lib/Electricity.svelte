<script>
	import BinaryTruthTable from "./BinaryTruthTable.svelte";
	import {
		nandGate,
		notFromNand,
		notGate,
		simpleNotCompleteCircuit,
		simpleSwitch,
		NANDGate,
		NAND,
		NOT,
		AND,
		OR,
		XOR,
		output,
		INPUT,
	} from "./circuit";
	import Gates from "./Gates.svelte";
	import Not from "./Not.svelte";
	import Pipe from "./Pipe.svelte";
	import Pipe2 from "./Pipe2.svelte";
	import Simulator from "./Simulator.svelte";

	function unary(name, func) {
		console.log(name);
		console.log("0 ->", output(INPUT(func(0))));
		console.log("1 ->", output(INPUT(func(1))));
	}
	unary("NOT", NOT);

	function binary(name, func) {
		console.log(name);
		console.log("0,0 ->", output(func(INPUT(0), INPUT(0))));
		console.log("1,0 ->", output(func(INPUT(1), INPUT(0))));
		console.log("0,1 ->", output(func(INPUT(0), INPUT(1))));
		console.log("1,1 ->", output(func(INPUT(1), INPUT(1))));
	}

	binary("NAND", NAND);
	binary("AND", AND);
	binary("OR", OR);
	binary("XOR", XOR);
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
			built in, and we just combine them to look nicer in our brain. This
			is a circular argument though because by definition we are
			describing electricity with boolean logic.
		</div>
		<div>
			To change up notation, here I'll have a graph where wires are also
			nodes and edges just show what is connected to what . Note that if
			there is a branch, two new wires are created. So the not gate in
			this notation looks like
			<Simulator circuit={notGate()} />
		</div>
		<div>
			Some of these wires can be merged, but again, I show branching (like
			the wire branching from the middle splits the top into two). Again,
			the edges aren't wires in this diagram, wires are separate nodes and
			conceptual connections are edges.
		</div>
		<div>
			<details>
				<summary class="neon" style="cursor: pointer; --color: lime;">
					In this same notation, you can represent the original
					circuits too
				</summary>
				Incomplete circuit:
				<Simulator circuit={simpleNotCompleteCircuit()} />

				One switch:
				<Simulator circuit={simpleSwitch()} />
			</details>
		</div>

		<div>
			<b class="neon" style:--color="violet">
				Now let's create the boolean gates which take in two inputs (two
				switches) and output a single signal.
			</b>
		</div>
		<div>
			It turns out that you can create any other logic gate by using a
			NAND gate (logical and not). This is weird. Think about the
			statement that anything computable can be represented as
			manipulation bits with NAND operations. Weird.
		</div>
		<div>
			So let's create a NAND gate. It looks like a combination of the AND
			gate and the NOT gate.
		</div>
		<div>
			<BinaryTruthTable func={NAND} />
		</div>
		<div>
			<b class="neon" style:--color="cyan">NAND Gate</b>: toggle to see
			outputs given inputs
			<Simulator circuit={nandGate()} />
		</div>
		<div>
			Like I said, it looks like a combination of the AND and NOT gate.
			It's really just adding another switch right after the first NOT
			switch.
		</div>
		<div>
			Note that it reverts to a NOT gate for the 0,0 and 1,1 example. So
			we can easily recreate a NOT gate from NAND by just feeding the same
			value in.
		</div>
		<div>
			<b class="neon" style:--color="red">NOT Gate</b> with NAND by
			copying signal to control both switches
			<Simulator circuit={nandGate()} sameSignals />
		</div>
		<div>
			<b class="neon" style:--color="lime">AND Gate</b> is just
			NOT(NAND(a, b)) -> AND(a,b). So I can combine the previous two
			circuits.
			<BinaryTruthTable func={AND} />
		</div>
	</details>
</div>
