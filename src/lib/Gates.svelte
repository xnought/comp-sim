<script>
	import * as myc from "@apple/mycelium";
	import "@apple/mycelium/dist/style.css";

	export let gatesCircuit;
	export let width = 500;
	export let height = 500;

	function createNode(nodeId, on = false, signal = false) {
		let regOn = on ? "yellow" : "lightgrey";

		return new myc.ui.Node(
			nodeId,
			new myc.ui.VStack(
				// new myc.ui.Text("Object").with({ fontWeight: 600 }),
				new myc.ui.Text(nodeId)
			)
		)
			.with({
				backgroundColor: regOn,
			})
			.with({
				...(signal && {
					badge: {
						color: on ? "steelblue" : "crimson",
						text: on ? "1" : "0",
					},
				}),
			});
	}

	function addNode(network, id, on = false, regOn = false) {
		network.setNode(id, createNode(id, on, regOn));
	}
	function createMycNodes(network, circuit) {
		let wireCounter = 0;
		let switchCounter = 0;
		// recur down the graph to render
		function recur(node) {
			let on = false;
			let signal = false;
			if (node.name === "wire") {
				node.nodeId = `wire[${wireCounter}]`;
				wireCounter++;
			} else if (node.name === "switch") {
				node.nodeId = `switch[${switchCounter}]`;
				if (node.on) on = true;
				signal = true;
				switchCounter++;
			} else if (node.name === "signal") {
				node.nodeId = "signal";
				signal = true;
			} else {
				node.nodeId = "power";
				on = true;
			}
			if (node.data === 1) on = true;
			addNode(network, node.nodeId, on, signal);
			for (const c of node.out) {
				if (c.name === "power" || c.nodeId !== undefined) continue;
				recur(c);
			}
		}
		recur(circuit.source);
	}

	function createMycEdges(network, circuit) {
		// recur down the graph to render
		function recur(node) {
			for (const c of node.out) {
				network.setEdge(node.nodeId, c.nodeId);
				if (c.name === "power") continue;
				recur(c);
			}
		}
		recur(circuit.source);
	}
	let el;
	let viewer;
	// $: if (el) {
	// 	const network = new myc.Network();
	// 	circuit.resetNodeIds();
	// 	createMycNodes(network, circuit);
	// 	createMycEdges(network, circuit);
	// 	if (viewer) {
	// 		console.log(circuit);
	// 		viewer.setNetwork(network);
	// 	} else {
	// 		viewer = myc.NetworkViewer.create(network, el, {
	// 			showBreadcrumbs: false,
	// 			minimap: false,
	// 			watermark: false,
	// 			showResetView: false,
	// 		});
	// 	}
	// }
</script>

<div
	bind:this={el}
	style="width: {width}px; height: {height}px; outline: 1px dashed slateblue; border-radius: 3px;"
/>
