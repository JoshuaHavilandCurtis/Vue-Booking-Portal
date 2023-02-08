import { toHandlers } from "vue";
import { createStore } from "vuex";
import moment from "moment";
import "moment-timezone";

const bookingDateParser = (booking) => {
	return booking === null ? null : {
		...booking,
		date: booking.date === undefined ? undefined : moment(booking.date),
		time: booking.time === undefined ? undefined : moment(booking.time),
	};
}

const store = createStore({
	state: {
		request: JSON.parse(sessionStorage.getItem("request")) ?? null,
		requestItem: JSON.parse(sessionStorage.getItem("requestItem")) ?? null,
		booking: bookingDateParser(JSON.parse(sessionStorage.getItem("booking"))) ?? null,
		errorDialog: {
			visible: false,
			message: null
		}
	},
	mutations: {
		updateRequest(state, payload) {
			if (state.request === null) {
				state.request = payload;
			} else {
				Object.assign(state.request, payload);
			}
			sessionStorage.setItem("request", JSON.stringify(state.request));
		},
		updateRequestItem(state, payload) {
			if (state.requestItem === null) {
				state.requestItem = payload;
			} else {
				Object.assign(state.requestItem, payload);
			}
			sessionStorage.setItem("requestItem", JSON.stringify(state.request));
		},
		updateBooking(state, payload) {
			if (state.booking === null) {
				state.booking = payload;
			} else {
				Object.assign(state.booking, payload);
			}
			sessionStorage.setItem("booking", JSON.stringify(state.booking));
		},
		openErrorDialog(state, payload) {
			state.errorDialog.visible = true;
			state.errorDialog.message = payload ?? null;
		},
		closeErrorDialog(state) {
			state.errorDialog.visible = false;
			state.errorDialog.message = null;
		}
	}
});

export default store;