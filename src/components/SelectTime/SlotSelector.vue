<template>
	<section class="slot-selector">
		<ul class="slot-selector__list" v-if="slots.length > 0">
			<li class="button button-dark" v-for="slot in slots" :key="slot.toString()">{{ slot.format("HH:mm a") }}</li>
		</ul>
	</section>
</template>

<script setup lang="ts">
import { Moment } from "moment";

defineProps<{
	slots: Moment[]
}>();
</script>

<style lang="scss">
@import "@/scss/components/SelectTime/SlotSelector";
</style>