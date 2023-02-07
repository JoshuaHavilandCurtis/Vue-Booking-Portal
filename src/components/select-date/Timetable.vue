<template>
	<section class="timetable">
		<div class="timetable__row-labels">
			<span class="timetable__row-labels__item" v-for="rowLabel in timetableData.rowLabels" :key="rowLabel">{{ rowLabel }}</span>
		</div>
		<div class="timetable__data__wrapper">
			<div class="timetable__column-labels">
				<span class="timetable__column-labels__item" v-for="columnLabel in timetableData.columnLabels" :key="columnLabel">{{ columnLabel }}</span>
			</div>
			<div class="timetable__data">
				<div class="timetable__data__column" v-for="column in timetableData.columns" :key="column">
					<span class="timetable__data__column__entry" v-for="entry in column" :key="entry" @click="handleEntryClicked(entry)" :class="{ invalid: ! entry.valid, available: entry.valid && entry.available }"></span>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import moment from "moment";
import "moment-timezone";

export default {
	props: ["timetableData"],
	methods: {
		handleEntryClicked(entry) {
			if (! entry.valid || ! entry.available) return;

			this.$store.commit("updateBooking", { date: entry.date });
			this.$router.push({ path: "/time" });
		}
	}
}

</script>

<style lang="scss">
@import "@/scss/components/select-date/timetable";
</style>