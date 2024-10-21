<script>
	import { OUTPUT, INPUT } from "./circuit";
	export let func;
</script>

<div>0,0 → {OUTPUT(func(INPUT(0), INPUT(0)))}</div>
<div>0,1 → {OUTPUT(func(INPUT(0), INPUT(1)))}</div>
<div>1,0 → {OUTPUT(func(INPUT(1), INPUT(0)))}</div>
<div>1,1 → {OUTPUT(func(INPUT(1), INPUT(1)))}</div>
