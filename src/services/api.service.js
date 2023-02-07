import axios from "axios";
import apiConfig from "../api.config";

class ApiService {
	constructor() {}

	/* public methods */

	/* get item */

	async getItemByRequest(request) {
		switch (request.type) {
			case "consultant": return await this.#getItemById.consultant(request.id);
			case "test": return await this.#getItemById.test(request.id);
			case "treatment": return await this.#getItemById.treatment(request.id);
			case "condition": return await this.#getItemById.condition(request.id);
			case "centre": return await this.#getItemById.centre(request.id);
			default: return null;
		}
	}

	/* get entries */

	async getAvailableEntriesByRequest(request, startDate, endDate) {
		switch (request.type) {
			case "consultant": return await this.#getAvailableEntriesByRequest.consultant(request.id, startDate, endDate);
			case "test": return await this.#getAvailableEntriesByRequest.test(request.id, startDate, endDate);
			case "treatment": return await this.#getAvailableEntriesByRequest.treatment(request.id, startDate, endDate);
			case "condition": return await this.#getAvailableEntriesByRequest.condition(request.id, startDate, endDate);
			case "centre": return await this.#getAvailableEntriesByRequest.subspecialty(request.selectedSubspecialtyId, startDate, endDate);
			default: return null;
		}
	}

	/* get intervals */
	
	async getAvailableSlotsByRequest(request, date) {
		switch (request.type) {
			case "consultant": return await this.#getAvailableSlotsByRequest.consultant(request.id, date);
			case "test": return await this.#getAvailableSlotsByRequest.test(request.id, date);
			case "treatment": return await this.#getAvailableSlotsByRequest.treatment(request.id, date);
			case "condition": return await this.#getAvailableSlotsByRequest.condition(request.id, date);
			case "centre": return await this.#getAvailableSlotsByRequest.subspecialty(request.selectedSubspecialtyId, date);
			default: return null;
		}
	}

	/* get consultants */
	async getAvailableConsultantsByRequest(request, date) {
		switch (request.type) {
			case "consultant": return await this.#getAvailableConsultantsByRequest.consultant(request.id, date);
			case "test": return await this.#getAvailableConsultantsByRequest.test(request.id, date);
			case "treatment": return await this.#getAvailableConsultantsByRequest.treatment(request.id, date);
			case "condition": return await this.#getAvailableConsultantsByRequest.condition(request.id, date);
			case "centre": return await this.#getAvailableConsultantsByRequest.subspecialty(request.selectedSubspecialtyId, date);
			default: return null;
		}
	}


	/* private methods/properties */

	#getItemById = {
		async consultant(id) {
			const response = await axios.get(apiConfig.getConsultantById);
			return response.data;
		},
		async test(id) {
			const response = await axios.get(apiConfig.getTestById);
			return response.data;
		},
		async treatment(id) {
			const response = await axios.get(apiConfig.getTreatmentById);
			return response.data;
		},
		async condition(id) {
			const response = await axios.get(apiConfig.getConditionById);
			return response.data;
		},
		async centre(id) {
			const response = await axios.get(apiConfig.getCentreById);
			return response.data;
		}
	}


	#getAvailableEntriesByRequest = {
		async consultant(id, startDate, endDate) {
			const response = await axios.get(apiConfig.getTimetableEntries);
			return response.data;
		},
		async test(id, startDate, endDate) {
			const response = await axios.get(apiConfig.getTimetableEntries);
			return response.data;
		},
		async treatment(id, startDate, endDate) {
			const response = await axios.get(apiConfig.getTimetableEntries);
			return response.data;
		},
		async condition(id, startDate, endDate) {
			const response = await axios.get(apiConfig.getTimetableEntries);
			return response.data;
		},
		async subspecialty(id, startDate, endDate) {
			const response = await axios.get(apiConfig.getTimetableEntries);
			return response.data;
		}
	}


	#getAvailableSlotsByRequest = {
		async consultant(id, date) {
			const response = await axios.get(apiConfig.getAvailableSlots);
			return response.data;
		},
		async test(id, date) {
			const response = await axios.get(apiConfig.getAvailableSlots);
			return response.data;
		},
		async treatment(id, date) {
			const response = await axios.get(apiConfig.getAvailableSlots);
			return response.data;
		},
		async condition(id, date) {
			const response = await axios.get(apiConfig.getAvailableSlots);
			return response.data;
		},
		async subspecialty(id, date) {
			const response = await axios.get(apiConfig.getAvailableSlots);
			return response.data;
		}
	}

	#getAvailableConsultantsByRequest = {
		async consultant(id, date) {
			const response = await axios.get(apiConfig.getAvailableConsultants);
			return response.data;
		},
		async test(id, date) {
			const response = await axios.get(apiConfig.getAvailableConsultants);
			return response.data;
		},
		async treatment(id, date) {
			const response = await axios.get(apiConfig.getAvailableConsultants);
			return response.data;
		},
		async condition(id, date) {
			const response = await axios.get(apiConfig.getAvailableConsultants);
			return response.data;
		},
		async subspecialty(id, date) {
			const response = await axios.get(apiConfig.getAvailableConsultants);
			return response.data;
		}
	}
}

const apiService = new ApiService();
export default apiService;