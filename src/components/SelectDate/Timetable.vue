<template>
	<section class="timetable">
		<div class="timetable__row-labels">
			<span class="timetable__row-labels__item" v-if="data === null" v-for="placeholderLabel in placeholderRows ?? 0" :key="placeholderLabel">...</span>
			<span class="timetable__row-labels__item" v-else v-for="rowLabel in data.rowLabels" :key="rowLabel">{{ rowLabel }}</span>
		</div>
		<div class="timetable__data__wrapper">
			<div class="timetable__column-labels">
				<span class="timetable__column-labels__item" v-if="data === null" v-for="placeholderLabels in placeholderColumns ?? 0" :key="placeholderLabels">...</span>
				<span class="timetable__column-labels__item" v-else v-for="columnLabel in data.columnLabels" :key="columnLabel">{{ columnLabel }}</span>
			</div>
			<div class="timetable__data">
				<div class="timetable__data__column" v-if="data === null" v-for="placeholderColumn in placeholderColumns" :key="placeholderColumn">
					<div class="timetable__data__column__slot__wrapper" v-for="placeholderRow in placeholderRows" :key="placeholderRow">
						<span class="timetable__data__column__slot" :class="{ invalid: true }"></span>
					</div>
				</div>

				<div class="timetable__data__column" v-else v-for="column in data.columns">
					<div class="timetable__data__column__slot__wrapper" v-for="slot in column" :key="slot.date.toString()">
						<span class="timetable__data__column__slot" @click="handleSlotClicked(slot)" :class="{ invalid: ! slot.valid, available: slot.valid && slot.available }"></span>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import StoreState from "@/models/StoreState.interface";

import TimetableSlot from "@/models/TimetableSlot.interface";
import TimetableData from "@/models/TimetableData.interface";


/* DATA */

const $store = useStore<StoreState>();
const $router = useRouter();

defineProps<{
	placeholderRows: number,
	placeholderColumns: number,
	data: TimetableData
}>();


/* METHODS */

const handleSlotClicked = (slot: TimetableSlot) => {
	if (! slot.valid || ! slot.available) return;

	$store.commit("updateBooking", { date: slot.date });
	$router.push({ path: "/time" });
};
</script>

<style lang="scss">
@import "@/scss/components/SelectDate/Timetable";
</style>