import apiService from "./api.service";

class RequestService {
	constructor() {}

	getRequest(routeParams) {
		const request = { type: routeParams?.type ?? null, id: routeParams?.id ?? null };
		if (! this.validateRequest(request)) throw new Error("URL is not valid!");
		
		return request;
	}

	async getRequestItem(request) {
		let requestItem;
		try {
			requestItem = await apiService.getItem(request);
		} catch (e) {
			throw "Request is not valid!";
		}
		
		if (request.type === "centre") requestItem.selectedSubspecialtyId = requestItem.subspecialties[0].id; //first subspecialty

		return requestItem;
	}
	
	validateRequest(request) {
		if (request.type === null || request.id === null) return false;

		switch (request.type) {
			case "consultant": return true;
			case "test": return true;
			case "treatment": return true;
			case "condition": return true;
			case "centre": return true;
			default: return false;
		}
	}

}

const requestService = new RequestService();
export default requestService;