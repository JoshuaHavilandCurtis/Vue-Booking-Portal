<template>
	<container>
		<div class="timetable">
			<span class="row justify-content-center">Date range: {{ startDate.format("YYYY-MM-DD") }} to {{ endDate.clone().subtract(1, "milliseconds").format("YYYY-MM-DD") }}</span>

			<div class="row">

				<div class="col-2 d-flex justify-content-center align-items-center">
					<button class="timetable--load-previous" @click="renderPreviousWeek" v-if="startDate.clone().isoWeekday(1) >= presentMoment.clone().isoWeekday(1)">Previous week</button>
				</div>
		
				<div class="col-8 d-flex">
		
					<div class="timetable--row-labels">
						<span class="timetable--row-labels-item" v-for="rowLabel in timetableData.rowLabels" :key="rowLabel">{{ rowLabel.text }}</span>
					</div>
			
					<div class="w-100">
						<div class="timetable--column-labels">
							<span class="timetable--column-labels-item" v-for="columnLabel in timetableData.columnLabels">{{ columnLabel.text }}</span>
						</div>
				
						<div class="timetable--data">
							<div class="timetable--data-column" v-for="column in timetableData.columns">
								<span class="timetable--data-entry" :key="entry" v-for="entry in column" @click="handleEntryClicked(entry)" :class="{ invalid: entry.valid === false, available: entry.valid === true && entry.available === true }"></span>
							</div>

							<loading-wheel class="fill-container" :class="{ loaded }"></loading-wheel>
						</div>
					</div>

				</div>
		
				<div class="col-2 d-flex justify-content-center align-items-center">
					<button class="timetable--load-next" @click="renderNextWeek">Next week</button>
				</div>

			</div>
		</div>
	</container>
</template>

<script>
import moment from "moment";
import "moment-timezone";
import axios from "axios";

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
	methods: {

		/* mutable methods */

		renderCurrentWeek() {
			//TODO --- check if current day is outside of the days we want to render (saturday, sunday). if true, then render the next week (otherwise all nodes will be gray)...
			//also check the time, as all nodes can be gray if its past the final time but not the final day...
			const startDate = this.presentMoment.clone().isoWeekday(1).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
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
			this.$store.commit("markRouteAsLoaded");
		},
		handleEntryClicked(entry) {
			if (entry.valid === false || entry.available === false) return;

			this.$store.commit("updateBookingSlot", { date: entry.date });
			this.$router.push({ path: "/input-details" });
		},

		/* non mutable methods */

		async createTimetableData(startDate, endDate) {
			const timetableData = { columns: [], columnLabels: [], rowLabels: [] };

			//get the available entries from api
			const availableEntries = await this.$api.getAvailableEntriesByRequest(this.$store.state.request, startDate, endDate);

			let rowLabelsSet = false;
			let currentMoment = startDate.clone();

			while (currentMoment.isBefore(endDate) === true) {
				const column = [];

				//for every preset time we have defined
				for (const time of this.times) {
					//set date's time to current time
					currentMoment.set({ hour: time.hour, minute: time.minute, second: 0, millisecond: 0 });

					if (rowLabelsSet === false) {
						//add row label to timetable row labels
						timetableData.rowLabels.push({
							text: currentMoment.format("HH:mm")
						});
					}

					//add entry to column
					column.push({
						date: currentMoment.clone(), //must clone - vue binding explodes otherwise
						valid: currentMoment > this.presentMoment ? true : false,
						//check if the entry we are adding is one of the available entries from the api
						available: availableEntries.find(availableEntry => moment(availableEntry).isSame(currentMoment)) !== undefined
					});
				}

				//add column to timetable columns
				timetableData.columns.push(column);

				rowLabelsSet = true;
	
				//add column label to timetable column labels
				timetableData.columnLabels.push({
					text: currentMoment.format("dddd").substring(0, 3)
				});

				//increment date by 1 day
				currentMoment.add(1, "days");
			}

			return timetableData;
		}

	},
	created() {
		this.renderCurrentWeek();
	}
}

</script>

<style lang="scss">
@import "@/scss/components/timetable";
</style>