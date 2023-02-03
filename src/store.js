import { toHandlers } from "vue";
import { createStore } from "vuex";

const store = createStore({
	state: {
		request: JSON.parse(sessionStorage.getItem("request")) ?? null,
		selectedBookingSlot: JSON.parse(sessionStorage.getItem("selectedBookingSlot")) ?? {
			date: null,
			consultant: null,
			time: null,
		},
		errorDialog: {
			visible: false,
			message: null
		},
		routeLoaded: false
	},
	mutations: {
		setRequest(state, payload) {
			state.request = payload;
			sessionStorage.setItem("request", JSON.stringify(state.request));
		},
		updateRequest(state, payload) {
			Object.assign(state.request, payload);
			sessionStorage.setItem("request", JSON.stringify(state.request));
		},
		updateBookingSlot(state, payload) {
			Object.assign(state.selectedBookingSlot, payload);
			sessionStorage.setItem("selectedBookingSlot", JSON.stringify(state.selectedBookingSlot));
		},
		openErrorDialog(state, payload) {
			state.routeLoaded = true;
			state.errorDialog.visible = true;
			state.errorDialog.message = payload ?? null;
		},
		closeErrorDialog(state) {
			state.errorDialog.visible = false;
			state.errorDialog.message = null;
		},
		routeLoaded(state, payload) {
			state.routeLoaded = payload;
		},
	}
});

export default store;