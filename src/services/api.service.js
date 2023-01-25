import axios from "axios";
import apiConfig from "../api.config";

class ApiService {
	constructor() {}

	/* public methods */

	/* get item */

	async getItemByRequest(request) {
		switch (request.type) {
			case "consultant":
				return await this.#getItemById.consultant(request.id);
			case "test":
				return await this.#getItemById.test(request.id);
			case "treatment":
				return await this.#getItemById.treatment(request.id);
			case "condition":
				return await this.#getItemById.condition(request.id);
			case "centre":
				return await this.#getItemById.centre(request.id);
			default:
				return null;
		}
	}

	/* get entries */

	async getAvailableEntriesByRequest(request, startDate, endDate) {
		switch (request.type) {
			case "consultant":
				return await this.#getAvailableEntriesByRequest.consultant(request.id, startDate, endDate);
			case "test":
				return await this.#getAvailableEntriesByRequest.test(request.id, startDate, endDate);
			case "treatment":
				return await this.#getAvailableEntriesByRequest.treatment(request.id, startDate, endDate);
			case "condition":
				return await this.#getAvailableEntriesByRequest.condition(request.id, startDate, endDate);
			case "centre":
				return await this.#getAvailableEntriesByRequest.subspecialty(request.selectedSubspecialtyId, startDate, endDate);
			default:
				return null;
		}
	}

	/* get intervals */
	
	async getAvailableIntervalsByRequest(request, date) {
		switch (request.type) {
			case "consultant":
				return await this.#getAvailableIntervalsByRequest.consultant(request.id, date);
			case "test":
				return await this.#getAvailableIntervalsByRequest.test(request.id, date);
			case "treatment":
				return await this.#getAvailableIntervalsByRequest.treatment(request.id, date);
			case "condition":
				return await this.#getAvailableIntervalsByRequest.condition(request.id, date);
			case "centre":
				return await this.#getAvailableIntervalsByRequest.subspecialty(request.selectedSubspecialtyId, date);
			default:
				return null;
		}
	}


	/* private methods/properties */

	#getItemById = {
		async consultant(id) {
			const response = await axios.get(apiConfig.getConsultantById);
			const consultant = response.data;
			return consultant;
		},
		async test(id) {
			const response = await axios.get(apiConfig.getTestById);
			const test = response.data;
			return test;
		},
		async treatment(id) {
			const response = await axios.get(apiConfig.getTreatmentById);
			const treatment = response.data;
			return treatment;
		},
		async condition(id) {
			const response = await axios.get(apiConfig.getConditionById);
			const condition = response.data;
			return condition;
		},
		async centre(id) {
			const response = await axios.get(apiConfig.getCentreById);
			const center = response.data;
			return center;
		}
	}


	#getAvailableEntriesByRequest = {
		async consultant(id, startDate, endDate) {
			const response = await axios.get(apiConfig.getTimetableEntries);
			const apiEntries = response.data.entries;
			return apiEntries;
		},
		async test(id, startDate, endDate) {
			const response = await axios.get(apiConfig.getTimetableEntries);
			const apiEntries = response.data.entries;
			return apiEntries;
		},
		async treatment(id, startDate, endDate) {
			const response = await axios.get(apiConfig.getTimetableEntries);
			const apiEntries = response.data.entries;
			return apiEntries;
		},
		async condition(id, startDate, endDate) {
			const response = await axios.get(apiConfig.getTimetableEntries);
			const apiEntries = response.data.entries;
			return apiEntries;
		},
		async subspecialty(id, startDate, endDate) {
			const response = await axios.get(apiConfig.getTimetableEntries);
			const apiEntries = response.data.entries;
			return apiEntries;
		}
	}


	#getAvailableIntervalsByRequest = {
		async consultant(id, date) {
			const response = await axios.get(apiConfig.getHourlyIntervals);
			const apiIntervals = response.data.intervals;
			return apiIntervals;
		},
		async test(id, date) {
			const response = await axios.get(apiConfig.getHourlyIntervals);
			const apiIntervals = response.data.intervals;
			return apiIntervals;
		},
		async treatment(id, date) {
			const response = await axios.get(apiConfig.getHourlyIntervals);
			const apiIntervals = response.data.intervals;
			return apiIntervals;
		},
		async condition(id, date) {
			const response = await axios.get(apiConfig.getHourlyIntervals);
			const apiIntervals = response.data.intervals;
			return apiIntervals;
		},
		async subspecialty(id, date) {
			const response = await axios.get(apiConfig.getHourlyIntervals);
			const apiIntervals = response.data.intervals;
			return apiIntervals;
		}
	}
}

const apiService = new ApiService();
export default apiService;