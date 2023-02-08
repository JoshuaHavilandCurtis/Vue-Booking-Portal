<template>
	<section class="timetable">
		<div class="timetable__row-labels">
			<span class="timetable__row-labels__item" v-if="data === null" v-for="placeholderLabel in placeholderRows ?? 0" :key="placeholderLabel">...</span>
			<span class="timetable__row-labels__item" v-else v-for="rowLabel in data.rowLabels" :key="rowLabel">{{ rowLabel }}</span>
		</div>
		<div class="timetable__data__wrapper">
			<div class="timetable__column-labels">
				<span class="timetable__column-labels__item" v-if="data === null" v-for="placeholderLabel in placeholderColumns ?? 0" :key="placeholderLabel">...</span>
				<span class="timetable__column-labels__item" v-else v-for="columnLabel in data.columnLabels" :key="columnLabel">{{ columnLabel }}</span>
			</div>
			<div class="timetable__data">
				<div class="timetable__data__column" v-if="data === null" v-for="placeholderColumn in placeholderColumns" :key="placeholderColumn">
					<span class="timetable__data__column__slot" v-for="placeholderRow in placeholderRows" :key="placeholderRow" :class="{ invalid: true }"></span>
				</div>

				<div class="timetable__data__column" v-else v-for="column in data.columns" :key="column">
					<span class="timetable__data__column__slot" v-for="slot in column" :key="slot" @click="handleSlotClicked(slot)" :class="{ invalid: ! slot.valid, available: slot.valid && slot.available }"></span>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import moment from "moment";
import "moment-timezone";

export default {
	props: ["placeholderRows", "placeholderColumns", "data"],
	methods: {
		handleSlotClicked(slot) {
			if (! slot.valid || ! slot.available) return;

			this.$store.commit("updateBooking", { date: slot.date });
			this.$router.push({ path: "/time" });
		}
	}
}

</script>

<style lang="scss">
@import "@/scss/components/select-date/timetable";
</style>