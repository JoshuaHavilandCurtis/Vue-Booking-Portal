<template>
	<container class="timetable">
		<div class="timetable__header mb-4">
			<span class="timetable__header__message"  v-if="$store.state.request.type !== 'centre'">{{ $store.state.request.item.message }}</span>
			<template v-else>
				<span class="timetable__header__message">Book a time slot with a</span>
				<select class="timetable__header__centre-selector" @change="handleSelectCentreChanged($event)">
					<option v-for="subspecialty in $store.state.request.item.subspecialties" :key="subspecialty" :value="subspecialty.id">{{ subspecialty.name }}</option>
				</select>
			</template>
		</div>

		<div class="timetable__content">
			<span class="row justify-content-center">Date range: {{ startDate.format("YYYY-MM-DD") }} to {{ endDate.clone().subtract(1, "milliseconds").format("YYYY-MM-DD") }}</span>
			<div class="row">
				<div class="col-2 d-flex justify-content-center align-items-center">
					<button class="timetable__content__load-previous" @click="renderPreviousWeek" v-if="startDate.clone().day(1) >= presentMoment.clone().day(1)">Previous week</button>
				</div>
				<div class="col-8 d-flex position-relative">
					<div class="timetable__content__row-labels">
						<span class="timetable__content__row-labels__item" v-for="rowLabel in timetableData.rowLabels" :key="rowLabel">{{ rowLabel }}</span>
					</div>
					<div class="w-100">
						<div class="timetable__content__column-labels">
							<span class="timetable__content__column-labels__item" v-for="columnLabel in timetableData.columnLabels" :key="columnLabel">{{ columnLabel }}</span>
						</div>
						<div class="timetable__content__data">
							<div class="timetable__content__data__column" v-for="column in timetableData.columns" :key="column">
								<span class="timetable__content__data__column__entry" v-for="entry in column" :key="entry" @click="handleEntryClicked(entry)" :class="{ invalid: ! entry.valid, available: entry.valid && entry.available }"></span>
							</div>
						</div>
					</div>
					<loading-wheel class="fill-container" :class="{ loaded }"></loading-wheel>
				</div>
				<div class="col-2 d-flex justify-content-center align-items-center">
					<button class="timetable__content__load-next" @click="renderNextWeek">Next week</button>
				</div>
			</div>
		</div>
	</container>
</template>

<script>
import moment from "moment";
import "moment-timezone";

export default {
	data() {
		return {
			times: [
				{ hour: 9, minute: 0 },
				{ hour: 10, minute: 0 },
				{ hour: 11, minute: 0 },
				{ hour: 12, minute: 0 },
				{ hour: 13, minute: 0 },
				{ hour: 14, minute: 0 },
				{ hour: 15, minute: 0 },
				{ hour: 16, minute: 0 }
			],
			presentMoment: moment().tz("Europe/London"), //this does not get re-evaluated. default timezone has been set to London
			startDate: null,
			endDate: null,
			timetableData: {
				rowLabels: [],
				columnLabels: [],
				columns: []
			},
			loaded: true
		}
	},
	created() {
		this.renderCurrentWeek();
	},
	methods: {

		/* mutable methods */

		handleSelectCentreChanged(ev) {
			const selectedOption = ev.target.value;
			this.$store.commit("updateRequest", { selectedSubspecialtyId: selectedOption });
			this.renderCurrentWeek();
		},

		renderCurrentWeek() {
			//TODO --- check if current day is outside of the days we want to render (saturday, sunday). if true, then render the next week (otherwise all nodes will be gray)...
			//also check the time, as all nodes can be gray if its past the final time but not the final day...
			const startDate = this.presentMoment.clone().day(1).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
			const endDate = startDate.clone().add(5, "days");
			this.updateTimetable(startDate, endDate);
		},
		renderNextWeek() {
			const startDate = this.startDate.clone().add(1, "weeks");
			const endDate = startDate.clone().add(5, "days");
			this.updateTimetable(startDate, endDate);
		},
		renderPreviousWeek() {
			const startDate = this.startDate.clone().subtract(1, "weeks");
			const endDate = startDate.clone().add(5, "days");
			this.updateTimetable(startDate, endDate);
		},


		async updateTimetable(startDate, endDate) {
			this.loaded = false;

			this.startDate = startDate;
			this.endDate = endDate;

			try {
				this.timetableData = await this.createTimetableData(this.startDate, this.endDate);
			} catch (e) {
				this.$store.commit("openErrorDialog");
				console.error(e);
				return;
			}

			this.loaded = true;
		},

		
		handleEntryClicked(entry) {
			if (! entry.valid || ! entry.available) return;

			this.$store.commit("updateBookingSlot", { date: entry.date });
			this.$router.push({ path: "/time" });
		},

		/* non mutable methods */

		async createTimetableData(startDate, endDate) {
			const timetableData = { columns: [], columnLabels: [], rowLabels: [] };
			const availableEntries = await this.$api.getAvailableEntriesByRequest(this.$store.state.request, startDate, endDate);

			let momentBeingChecked = startDate.clone();
			while (momentBeingChecked.isBefore(endDate)) {
				const column = [];

				for (const time of this.times) {
					momentBeingChecked.set({ hour: time.hour, minute: time.minute, second: 0, millisecond: 0 });

					column.push({
						date: momentBeingChecked.clone(), //must clone - vue binding explodes otherwise
						valid: momentBeingChecked > this.presentMoment,
						available: availableEntries.some(availableEntry => moment(availableEntry).isSame(momentBeingChecked)) //check if entry we are adding is marked as available
					});
				}

				timetableData.columns.push(column);
				timetableData.columnLabels.push(momentBeingChecked.format("dddd").substring(0, 3));

				momentBeingChecked.add(1, "days");
			}

			timetableData.rowLabels = this.times.map(time => moment().set({ hour: time.hour, minute: time.minute, second: 0, millisecond: 0 }).format("HH:mm"));

			return timetableData;
		}

	}
}

</script>

<style lang="scss">
@import "@/scss/components/timetable";
</style>