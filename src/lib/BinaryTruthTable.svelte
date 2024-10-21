<script>
	import { output, INPUT } from "./circuit";
	export let func;
</script>

<div>0,0 → {output(func(INPUT(0), INPUT(0)))}</div>
<div>0,1 → {output(func(INPUT(0), INPUT(1)))}</div>
<div>1,0 → {output(func(INPUT(1), INPUT(0)))}</div>
<div>1,1 → {output(func(INPUT(1), INPUT(1)))}</div>
