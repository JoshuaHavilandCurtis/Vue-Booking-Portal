import { toHandlers } from "vue";
import { createStore } from "vuex";

const store = createStore({
	state: {
		request: JSON.parse(sessionStorage.getItem("request")) ?? null,
		booking: JSON.parse(sessionStorage.getItem("booking")) ?? {
			date: null,
			time: null,
			consultant: null
		},
		errorDialog: {
			visible: false,
			message: null
		}
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
		updateBooking(state, payload) {
			Object.assign(state.booking, payload);
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