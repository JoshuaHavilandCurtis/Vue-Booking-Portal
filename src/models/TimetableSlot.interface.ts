import { Moment } from "moment";

export default interface TimetableSlot {
	date: Moment,
	valid: boolean,
	available: boolean
}