import { createStore } from "vuex";
import moment from "moment";
import "moment-timezone";
import StoreState from "./models/StoreState.interface";
import Request from "./models/Request.interface";
import Booking from "./models/Booking.interface";
import RequestItem from "./models/RequestItem.interface";


// Helper functions

const sessionStorageParser = {
	get(key: string) {
		const item = sessionStorage.getItem(key);
		return item === null ? null : JSON.parse(item);
	},
	set(key: string, item: any) {
		return sessionStorage.setItem(key, JSON.stringify(item));
	}
};

const formatBooking = (unformattedBooking: any) => {
	if (unformattedBooking === null) return null;

	const parsedBooking: Booking = {
		...unformattedBooking,
		date: unformattedBooking.date === undefined ? undefined : moment(unformattedBooking.date),
		time: unformattedBooking.time === undefined ? undefined : moment(unformattedBooking.time),
	};

	return parsedBooking;
}


// Store

export default createStore<StoreState>({
	state: {
		request: sessionStorageParser.get("request") ?? null,
		requestItem: sessionStorageParser.get("requestItem") ?? null,
		booking: formatBooking(sessionStorageParser.get("booking")) ?? null
	},
	mutations: {
		updateRequest(state, payload: Request | Partial<Request>) {
			if (state.request === null) {
				state.request = payload as Request;
			} else {
				Object.assign(state.request, payload);
			}
			sessionStorageParser.set("request", state.request);
		},
		updateRequestItem(state, payload: RequestItem | Partial<RequestItem>) {
			if (state.requestItem === null) {
				state.requestItem = payload as RequestItem;
			} else {
				Object.assign(state.requestItem, payload);
			}
			sessionStorageParser.set("requestItem", state.requestItem);
		},
		updateBooking(state, payload: Booking | Partial<Booking>) {
			if (state.booking === null) {
				state.booking = payload as Booking;
			} else {
				Object.assign(state.booking, payload);
			}
			sessionStorageParser.set("booking", state.booking);
		}
	}
});