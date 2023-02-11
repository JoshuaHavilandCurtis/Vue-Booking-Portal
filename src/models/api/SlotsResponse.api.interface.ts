export default interface SlotsResponse {
	Data: {
		Slots: {
			Resources: {
				Slot: Slot[]
			}[]
		}
	}
}

export interface Slot {
	SlotDate: string,
	StartTime: string
}