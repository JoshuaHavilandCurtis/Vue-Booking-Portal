import TimetableSlot from "@/models/TimetableSlot.interface";

export default interface TimetableData {
	columnLabels: string[],
	rowLabels: string[],
	columns: TimetableSlot[][]
}