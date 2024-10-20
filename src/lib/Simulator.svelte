<script>
	class Switch {
		constructor() {
			this.in = [];
			this.out = [];
			this.data = 0;
			this.name = "switch";
			this.on = true;
		}
		switchOn() {
			this.on = true;
		}
		switchOff() {
			this.on = false;
		}
	}
	class Power {
		constructor() {
			this.in = [];
			this.out = [];
			this.data = 0;
			this.name = "power";
		}
	}
	class Signal {
		constructor() {
			this.in = [];
			this.out = [];
			this.data = 0;
			this.name = "signal";
		}
	}
	class Wire {
		constructor() {
			this.in = [];
			this.out = [];
			this.data = 0;
			this.name = "wire";
		}
	}

	class Circuit {
		constructor(source, signal, other) {
			this.source = source;
			this.signal = signal;
			this.other = other;
		}
		reset() {
			this.signal.data = 0;
			for (const o of this.other) {
				o.data = 0;
				o.closest = Infinity;
			}
		}
		precomputeDistances() {
			// I could iterate over each node and ask, what is your distance till the battery?
			// or I could start from the battery and
			function closest(node) {
				if (node instanceof Power) return 0;
				if (node instanceof Switch && !node.on) return Infinity;
				if (node.out.length === 0) return Infinity;
				let distances = [];
				for (const c of node.out) {
					distances.push(closest(c));
				}
				return (
					(node instanceof Switch ? 0 : 1) + Math.min(...distances)
				);
			}
			for (const n of this.other) {
				n.closest = closest(n);
			}
			this.signal.closest = closest(this.signal);
		}
		connect(a, b) {
			a.out.push(b);
			b.in.push(a);
		}
		simulate() {
			function flow(node) {
				if (node.in.length === 0) return;
				if (node instanceof Switch && !node.on) return;
				if (node.out.length === 0) return;

				// signal
				node.data = 1;

				// propagate shortest path
				let minNode = node.out[0];
				for (const connected of node.out) {
					if (connected instanceof Power) continue;
					if (connected.closest <= minNode.closest) {
						minNode = connected;
					}
				}
				if (minNode instanceof Power) return;
				flow(minNode);
			}
			this.reset();
			this.precomputeDistances();
			flow(this.source);
		}
	}

	function simpleCircuit() {
		const battery = new Power();
		const light = new Signal();
		const circuit = new Circuit(battery, light);

		const w1 = new Wire();
		const w2 = new Wire();

		circuit.connect(battery, w1);
		circuit.connect(w1, light);
		circuit.connect(light, w2);
		circuit.connect(w2, battery);

		circuit.simulate();
		console.log(light.data);
	}

	function simpleNotCompleteCircuit() {
		const battery = new Power();
		const light = new Signal();
		const circuit = new Circuit(battery, light);

		const w1 = new Wire();

		circuit.connect(battery, w1);
		circuit.connect(w1, light);

		circuit.simulate();
		console.log(light.data);
	}

	function simpleSwitch() {
		const battery = new Power();
		const light = new Signal();
		const w1 = new Wire();
		const s = new Switch();
		const w2 = new Wire();

		const circuit = new Circuit(battery, light, [w1, s, w2]);
		circuit.connect(battery, s);
		circuit.connect(s, w1);
		circuit.connect(w1, light);
		circuit.connect(light, w2);
		circuit.connect(w2, battery);

		console.log("switch on");
		s.switchOn();
		circuit.simulate();
		console.log(light.data);

		circuit.reset();

		console.log("switch off");
		s.switchOff();
		circuit.simulate();
		console.log(light.data);
	}

	function notGate() {
		const battery = new Power();
		const light = new Signal();
		const wires = Array(7)
			.fill(0)
			.map(() => new Wire());
		const s = new Switch();

		const circuit = new Circuit(battery, light, [...wires, s]);
		circuit.connect(battery, wires[0]);

		// top horizontal
		circuit.connect(wires[0], wires[1]);
		circuit.connect(wires[1], light);
		circuit.connect(light, wires[2]);

		// right vertical
		circuit.connect(wires[2], wires[3]);

		// bottom horizontal
		circuit.connect(wires[3], wires[4]);
		circuit.connect(wires[4], wires[5]);

		// left vertical
		circuit.connect(wires[5], battery);

		// switch vertical in the middle
		circuit.connect(wires[0], wires[6]);
		circuit.connect(wires[6], s);
		circuit.connect(s, wires[4]);

		// console.log("switch on");
		// s.switchOn();
		// circuit.simulate();
		// console.log(light.data);

		// circuit.reset();

		console.log("switch on");
		s.switchOn();
		circuit.simulate();
		console.log(light.data);
	}
	notGate();
</script>

<div><!-- put stuff here --></div>

<style>
	/*  put stuff here */
</style>
