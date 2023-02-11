<template>
	<section class="slot-selector">
		<h1>Please select a slot</h1>
		<ul class="slot-selector__list" v-if="slots.length > 0">
			<li v-for="slot in slots" :key="slot.toString()">{{ slot.format("HH:mm a") }}</li>
		</ul>
	</section>
</template>

<script setup lang="ts">
import { Moment } from "moment";

defineProps<{
	slots: Moment[]
}>();
</script>