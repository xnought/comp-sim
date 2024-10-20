export class Switch {
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
export class Power {
	constructor() {
		this.in = [];
		this.out = [];
		this.data = 0;
		this.name = "power";
	}
}
export class Signal {
	constructor() {
		this.in = [];
		this.out = [];
		this.data = 0;
		this.name = "signal";
	}
}
export class Wire {
	constructor() {
		this.in = [];
		this.out = [];
		this.data = 0;
		this.name = "wire";
	}
}

export class ElectricalCircuit {
	constructor(source, signal, other) {
		this.source = source;
		this.signal = signal;
		this.other = other;
	}
	resetNodeIds() {
		this.signal.nodeId = undefined;
		for (const o of this.other) {
			o.nodeId = undefined;
		}
		this.source.nodeId = undefined;
	}
	reset() {
		this.signal.data = 0;
		this.signal.nodeId = undefined;
		for (const o of this.other) {
			o.data = 0;
			o.closest = Infinity;
			o.nodeId = undefined;
		}
		this.source.nodeId = undefined;
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
			return (node instanceof Switch ? 0 : 1) + Math.min(...distances);
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

export function simpleNotCompleteCircuit() {
	const battery = new Power();
	const light = new Signal();
	const w1 = new Wire();
	const circuit = new ElectricalCircuit(battery, light, [w1]);

	circuit.connect(battery, w1);
	circuit.connect(w1, light);

	circuit.simulate();
	return circuit;
}

export function simpleSwitch() {
	const battery = new Power();
	const light = new Signal();
	const w1 = new Wire();
	const s = new Switch();
	const w2 = new Wire();

	const circuit = new ElectricalCircuit(battery, light, [w1, s, w2]);
	circuit.connect(battery, s);
	circuit.connect(s, w1);
	circuit.connect(w1, light);
	circuit.connect(light, w2);
	circuit.connect(w2, battery);

	s.switchOn();
	circuit.simulate();
	return circuit;
}

export function notGate() {
	const battery = new Power();
	const light = new Signal();
	const wires = Array(2)
		.fill(0)
		.map(() => new Wire());
	const s = new Switch();

	const circuit = new ElectricalCircuit(battery, light, [...wires, s]);

	circuit.connect(battery, wires[0]);
	circuit.connect(wires[0], light);
	circuit.connect(light, wires[1]);
	circuit.connect(wires[1], battery);
	circuit.connect(wires[0], s);
	circuit.connect(s, wires[1]);

	circuit.simulate();

	return circuit;
}

export function nandGate(a = true, b = true) {
	const battery = new Power();
	const light = new Signal();
	const wires = Array(4)
		.fill(0)
		.map(() => new Wire());
	const switches = Array(2)
		.fill(0)
		.map(() => new Switch());

	const circuit = new ElectricalCircuit(battery, light, [
		...wires,
		...switches,
	]);

	circuit.connect(battery, wires[0]);
	circuit.connect(wires[0], light);
	circuit.connect(light, wires[1]);
	circuit.connect(wires[1], battery);
	circuit.connect(wires[0], switches[0]);
	circuit.connect(switches[0], switches[1]);
	circuit.connect(switches[1], wires[1]);

	if (!a) switches[0].switchOff();
	if (!b) switches[1].switchOff();
	circuit.simulate();

	return circuit;
}

export function notFromNand() {
	const battery = new Power();
	const light = new Signal();
	const wires = Array(4)
		.fill(0)
		.map(() => new Wire());
	const switches = Array(2)
		.fill(0)
		.map(() => new Switch());

	const circuit = new ElectricalCircuit(battery, light, [
		...wires,
		...switches,
	]);

	circuit.connect(battery, wires[0]);
	circuit.connect(wires[0], light);
	circuit.connect(light, wires[1]);
	circuit.connect(wires[1], battery);
	circuit.connect(wires[0], switches[0]);
	circuit.connect(switches[0], switches[1]);
	circuit.connect(switches[1], wires[1]);

	circuit.simulate();

	return circuit;
}

export class NANDGate {
	constructor() {
		// simulation takes longer and uses electrical simulation
		this.battery = new Power();
		this.light = new Signal();
		this.wires = Array(4)
			.fill(0)
			.map(() => new Wire());
		this.switches = Array(2)
			.fill(0)
			.map(() => new Switch());
		this.circuit = new ElectricalCircuit(this.battery, this.light, [
			...this.wires,
			...this.switches,
		]);
		this.circuit.connect(this.battery, this.wires[0]);
		this.circuit.connect(this.wires[0], this.light);
		this.circuit.connect(this.light, this.wires[1]);
		this.circuit.connect(this.wires[1], this.battery);
		this.circuit.connect(this.wires[0], this.switches[0]);
		this.circuit.connect(this.switches[0], this.switches[1]);
		this.circuit.connect(this.switches[1], this.wires[1]);
	}
	call(a, b) {
		this.circuit.reset();
		this.switches[0].on = a;
		this.switches[1].on = b;
		this.circuit.simulate();
		return this.circuit.signal.data;
	}
}

const nandgate = new NANDGate();
export function INPUT(a) {
	return { name: "INPUT", in: a, value: a };
}
export function NAND(a, b) {
	return { name: "NAND", in: [a, b], value: nandgate.call(a.value, b.value) };
}
export function NOT(a) {
	const repr = NAND(a, a);
	return { name: "NOT", in: a, out: repr, value: repr.value };
}
export function AND(a, b) {
	const repr = NOT(NAND(a, b));
	return { name: "AND", in: [a, b], out: repr, value: repr.value };
}
export function OR(a, b) {
	const repr = NAND(NOT(a), NOT(b));
	return { name: "OR", in: [a, b], out: repr, value: repr.value };
}
export function XOR(a, b) {
	const repr = AND(OR(a, b), NAND(a, b));
	return { name: "XOR", in: [a, b], out: repr, value: repr.value };
}

export function OUTPUT(obj) {
	return obj.value;
}
export function OUTPUTFULL(obj) {
	return obj.value;
}

export function HALFADDER(a, b) {
	// 0+1 -> 1, c0
	// 1+0 -> 1, c0
	// 0+1 -> 1, c0
	// 1+1 -> 1, c1
	const res = XOR(a, b);
	const outcarry = AND(a, b);
	return [
		{
			name: "HALFADDER",
			in: [a, b],
			out: res,
			value: res.value,
		},
		{
			name: "HALFADDER_CARRY",
			in: [a, b],
			out: outcarry,
			value: outcarry.value,
		},
	];
}

export function FULLADDER(a, b, carry) {
	const res = XOR(XOR(a, b), carry);
	const outcarry = OR(OR(AND(a, b), AND(a, carry)), AND(b, carry));
	return [
		{
			name: "FULLADDER",
			in: [a, b, carry],
			out: res,
			value: res.value,
		},
		{
			name: "FULLADDER_CARRY",
			in: [a, b, carry],
			out: outcarry,
			value: outcarry.value,
		},
	];
}

export function NBITADDER(as, bs) {
	const n = as.length;
	let result = Array(n);
	const start = HALFADDER(as[n - 1], bs[n - 1]);
	result[n - 1] = start;
	for (let i = n - 2; i >= 0; i--) {
		const a = as[i];
		const b = bs[i];
		const outcarry = result[i + 1][1];
		const out = FULLADDER(a, b, outcarry);
		result[i] = out;
	}
	return result;
}

export function NBITADDEROUTPUT(o) {
	return [o.map((d) => d[0].value), o[0][1].value]; // [0] is output bits, [1] is carry bit
}
