<template>
	<container class="select-date fadein my-3" v-if="$store.state.request !== null && $store.state.requestItem !== null && timetableData !== null">

		<div class="row mb-4">
			<select-date-header :requestType="$store.state.request.type" :requestItem="$store.state.requestItem"></select-date-header>
		</div>

		<div class="row">
			<span class="select-date__date-range row justify-content-center">Date range: {{ startDate.format("YYYY-MM-DD") }} to {{ endDate.clone().subtract(1, "milliseconds").format("YYYY-MM-DD") }}</span>
		</div>
	
		<div class="row">
			<div class="col-2 d-flex justify-content-center align-items-center">
				<button class="select-date__load-previous" ref="renderPreviousWeekButton" @click="renderPreviousWeek()" v-if="startDate.clone().day(1) >= presentMoment.clone().day(1)">Previous week</button>
			</div>

			<div class="col-8 d-flex position-relative">
				<timetable :placeholderRows="times.length" :placeholderColumns="endDay - startDay + 1" :data="timetableData"></timetable>
				<loading-wheel class="fill-container" :class="{ loaded }"></loading-wheel>
			</div>

			<div class="col-2 d-flex justify-content-center align-items-center">
				<button class="select-date__load-next" ref="renderNextWeekButton" @click="renderNextWeek()">Next week</button>
			</div>
		</div>

	</container>
	<loading-wheel v-else class="fill-container"></loading-wheel>
</template>

<script>
import moment from "moment";
import "moment-timezone";


export default {
	beforeCreate() {
		this.$store.commit("updateRequest", null);
		this.$store.commit("updateRequestItem", null);
		this.$store.commit("updateBooking", null);
	},
	async created() {
		await this.setStoredInfo();
		this.renderCurrentWeek();
	},
	data() {
		return {
			startDay: 1, //monday
			endDay: 5, //friday
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
			timetableData: null,
			loaded: false
		}
	},
	methods: {

		async setStoredInfo() {
			let request, requestItem;

			try {
				//get request from url params
				request = this.$request.getRequest(this.$route.params);
				//then get request item from umbraco api
				requestItem = await this.$request.getRequestItem(request);
			} catch (e) {
				this.$store.commit("openErrorDialog", e);
				throw e;
			}

			this.$store.commit("updateRequest", request);
			this.$store.commit("updateRequestItem", requestItem)
		},

		renderCurrentWeek() {
			const startDate = this.presentMoment.clone().day(this.startDay).startOf("day");
			const endDate = this.presentMoment.clone().day(this.endDay).startOf("day");

			//TODO --- incredibly dodgy
			const biggestTimeData = Math.max.apply(null, this.times.map(time => `${time.hour}.${time.minute}`)).toString().split(".").map(stringTime => parseInt(stringTime));
			const lastMomentInTimetable = endDate.clone().set({ hour: biggestTimeData[0], minute: biggestTimeData[1] });

			if (this.presentMoment.isSameOrAfter(lastMomentInTimetable)) {
				startDate.add(1, "weeks");
				endDate.add(1, "weeks");
			}

			this.setTimetableData(startDate, endDate);
		},
		async renderNextWeek() {
			this.$refs.renderNextWeekButton.disabled = true;

			const startDate = this.startDate.clone().add(1, "weeks").startOf("day");
			const endDate = this.endDate.clone().add(1, "weeks").startOf("day");
			await this.setTimetableData(startDate, endDate);

			this.$refs.renderNextWeekButton.disabled = false;
		},
		async renderPreviousWeek() {
			this.$refs.renderPreviousWeekButton.disabled = true;
			
			const startDate = this.startDate.clone().subtract(1, "weeks").startOf("day");
			const endDate = this.endDate.clone().subtract(1, "weeks").startOf("day");
			await this.setTimetableData(startDate, endDate);

			this.$refs.renderPreviousWeekButton.disabled = false;
		},

		async setTimetableData(startDate, endDate) {
			this.loaded = false;

			this.startDate = startDate;
			this.endDate = endDate;

			try {
				this.timetableData = await this.createTimetableData(this.startDate, this.endDate);
			} catch (e) {
				this.$store.commit("openErrorDialog", "Failed to generate timetable data - the provided ID is probably bad!");
				throw e;
			}

			this.loaded = true;
		},

		async createTimetableData(startDate, endDate) {
			const data = { columns: [], columnLabels: [], rowLabels: [] };
			const slots = await this.$api.getSlots(this.$store.state.request.type === "centre" ? this.$store.state.requestItem.selectedSubspecialtyId : this.$store.state.request.id, startDate);

			const slotToMoment = (slot) => moment(`${slot.SlotDate} ${slot.StartTime}`, "YYYY-MM-DD HH:mm:ss");

			let date = startDate.clone();
			while (date.isSameOrBefore(endDate)) {
				const column = [];

				for (const time of this.times) {
					const datetime = date.clone().set({ hour: time.hour, minute: time.minute, second: 0, millisecond: 0 });

					column.push({
						date: datetime,
						valid: datetime > this.presentMoment,
						available: slots.some(slot => {
							const slotMoment = slotToMoment(slot);
							return slotMoment.isSameOrAfter(datetime) && slotMoment.isBefore(datetime.clone().add(1, "hours"))
						})
					});
				}

				data.columns.push(column);
				data.columnLabels.push(date.format("dddd").substring(0, 3));

				date.add(1, "days");
			}

			data.rowLabels = this.times.map(time => moment().set({ hour: time.hour, minute: time.minute, second: 0, millisecond: 0 }).format("HH:mm"));

			return data;
		}

	}
}
</script>

<style lang="scss">
@import "@/scss/views/select-date.scss";
</style>