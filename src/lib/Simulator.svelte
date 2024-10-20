<script>
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
		constructor(source, signal) {
			this.source = source;
			this.signal = signal;
		}
		connect(a, b) {
			a.out.push(b);
			b.in.push(a);
		}
		simulate() {
			function flow(node) {
				node.data = 1;
				console.log(node.name);
				for (const connected of node.out) {
					if (connected instanceof Power) continue;
					flow(connected);
				}
			}
			flow(this.source);
		}
	}

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
</script>

<div><!-- put stuff here --></div>

<style>
	/*  put stuff here */
</style>
