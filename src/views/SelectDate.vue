<template>
	<container class="select-date fadein my-3" v-if="$store.state.request !== null && startDate !== null && endDate !== null">

		<div class="row mb-4">
			<select-date-header></select-date-header>
		</div>

		<div class="row">
			<span class="select-date__date-range row justify-content-center">Date range: {{ startDate.format("YYYY-MM-DD") }} to {{ endDate.clone().subtract(1, "milliseconds").format("YYYY-MM-DD") }}</span>
		</div>
	
		<div class="row">
			<div class="col-2 d-flex justify-content-center align-items-center">
				<button class="select-date__load-previous" @click="renderPreviousWeek" v-if="startDate.clone().day(1) >= presentMoment.clone().day(1)">Previous week</button>
			</div>

			<div class="col-8 d-flex position-relative">
				<timetable :timetableData="timetableData"></timetable>
				<loading-wheel class="fill-container" :class="{ loaded }"></loading-wheel>
			</div>

			<div class="col-2 d-flex justify-content-center align-items-center">
				<button class="select-date__load-next" @click="renderNextWeek">Next week</button>
			</div>
		</div>

	</container>
</template>

<script>
import moment from "moment";
import "moment-timezone";


export default {
	beforeCreate() {
		//reset the request object here
		this.$store.commit("setRequest", null);
	},
	async created() {
		await this.getAndSetRequest(); //get the request from the url params and set the request object
		this.renderCurrentWeek();
	},
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
			loaded: false
		}
	},
	methods: {

		async getAndSetRequest() {
			let request;
			try {
				request = await this.$request.getRequest(this.$route.params);
			} catch (e) {
				this.$store.commit("openErrorDialog", e);
				console.error(e);
				return;
			}
			
			this.$store.commit("setRequest", request);
		},

		/* mutable methods */

		renderCurrentWeek() {
			//TODO --- check if current day is outside of the days we want to render (saturday, sunday). if true, then render the next week (otherwise all nodes will be gray)...
			//also check the time, as all nodes can be gray if its past the final time but not the final day...
			const startDate = this.presentMoment.clone().day(1).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
			const endDate = startDate.clone().add(5, "days");
			this.setTimetableData(startDate, endDate);
		},
		renderNextWeek() {
			const startDate = this.startDate.clone().add(1, "weeks");
			const endDate = startDate.clone().add(5, "days");
			this.setTimetableData(startDate, endDate);
		},
		renderPreviousWeek() {
			const startDate = this.startDate.clone().subtract(1, "weeks");
			const endDate = startDate.clone().add(5, "days");
			this.setTimetableData(startDate, endDate);
		},

		async setTimetableData(startDate, endDate) {
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
@import "@/scss/views/select-date.scss";
</style>