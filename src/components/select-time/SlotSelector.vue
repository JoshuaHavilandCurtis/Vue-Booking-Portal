<template>
	<section class="slot-selector">
		<h1>Please select a slot</h1>
		<ul class="slot-selector__list" v-if="slots.length > 0">
			<li v-for="slot in slots" :key="slot">{{ slot.format("HH:mm a") }}</li>
		</ul>
	</section>
</template>

<script>
import moment from "moment";
import "moment-timezone";

export default {
    props: ["slots"]
}
</script>