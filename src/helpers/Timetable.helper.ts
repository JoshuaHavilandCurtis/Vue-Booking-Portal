import moment, { Moment } from "moment";
import "moment-timezone";
import TimetableTime from "@/models/TimetableTime.interface";
import TimetableData from "@/models/TimetableData.interface";
import TimetableSlot from "@/models/TimetableSlot.interface";
import { Slot } from "@/models/api/SlotsResponse.api.interface";
import Request from "@/models/Request.interface";
import RequestItem from "@/models/RequestItem.interface";
import $api from "@/services/api.service";

export default class Timetable {

	/** Handles data to be displayed on the timetable */

	loaded = false;
	data: TimetableData | null = null;
	startDate!: Moment;
	endDate!: Moment;
	presentMoment = moment().tz("Europe/London"); //this does not get re-evaluated. default timezone has been set to London

	constructor(
		public startDay: number,
		public endDay: number,
		public times: TimetableTime[]
	) {}

	init() {
		this.startDate = this.presentMoment.clone().day(this.startDay).startOf("day");
		this.endDate = this.presentMoment.clone().day(this.endDay).startOf("day");
	}


	async loadCurrentWeek(request: Request, requestItem: RequestItem) {
		const startDate = this.presentMoment.clone().day(this.startDay).startOf("day");
		const endDate = this.presentMoment.clone().day(this.endDay).startOf("day");

		//TODO --- incredibly dodgy
		const biggestTimeData = Math.max.apply(null, this.times.map(time => parseFloat(`${time.hour}.${time.minute}`))).toString().split(".").map(stringTime => parseInt(stringTime));
		const lastMomentInTimetable = this.endDate.clone().set({ hour: biggestTimeData[0], minute: biggestTimeData[1] });

		if (this.presentMoment.isSameOrAfter(lastMomentInTimetable)) {
			startDate.add(1, "weeks");
			endDate.add(1, "weeks");
		}

		await this.setTimetableData(request, requestItem, startDate, endDate);
	}


	async loadNextWeek(request: Request, requestItem: RequestItem) {
		const startDate = this.startDate.clone().add(1, "weeks").startOf("day");
		const endDate = this.endDate.clone().add(1, "weeks").startOf("day");
		await this.setTimetableData(request, requestItem, startDate, endDate);
	}
		

	async loadPreviousWeek(request: Request, requestItem: RequestItem) {
		const startDate = this.startDate.clone().subtract(1, "weeks").startOf("day");
		const endDate = this.endDate.clone().subtract(1, "weeks").startOf("day");
		await this.setTimetableData(request, requestItem, startDate, endDate);
	}


	private async setTimetableData(request: Request, requestItem: RequestItem, startDate: Moment, endDate: Moment) {
		this.loaded = false;

		this.startDate = startDate;
		this.endDate = endDate;

		//get id of the item we want to get slots for
		const id = request.type === "centre" ? requestItem.selectedSubspecialtyId : request.id;

		this.data = await this.createTimetableData(id, this.startDate, this.endDate);

		this.loaded = true;
	}


	private async createTimetableData(id: number, startDate: Moment, endDate: Moment) {
		const data: TimetableData = { columns: new Array<TimetableSlot[]>(), columnLabels: new Array<string>(), rowLabels: new Array<string>() };
		
		const slots = await $api.getSlots(id, startDate).catch(() => { throw new Error("Provided id is not valid!") });

		const slotToMoment = (slot: Slot) => moment(`${slot.SlotDate} ${slot.StartTime}`, "YYYY-MM-DD HH:mm:ss");

		let date = startDate.clone();
		while (date.isSameOrBefore(endDate)) {
			const column: TimetableSlot[] = [];

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