import Request from "@/models/Request.interface";
import Booking from "@/models/Booking.interface";
import RequestItem from "@/models/RequestItem.interface";

export default interface StoreState {
	request: Request | null,
	requestItem: RequestItem | null,
	booking: Booking | null
}