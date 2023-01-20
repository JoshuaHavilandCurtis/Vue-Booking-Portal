import apiService from "./api.service";

class RequestService {
	constructor() {}

	async getRequest(routeParams) {
		if (routeParams.type === null || routeParams.id === null) throw "Request parameters are not set!"
		
		const request = { type: routeParams.type, id: routeParams.id };

		if (this.validateRequest(request) === false) throw "Request is not valid!";

		request.item = await apiService.getItemByRequest(request);
		if (request.type === "centre") request.selectedSubspecialtyId = request.item.subspecialties[0].id; //first subspecialty

		return request;
	}

	validateRequest(request) {
		switch (request.type) {
		case "consultant":
			return true;
		case "test":
			return true;
		case "treatment":
			return true;
		case "condition":
			return true;
		case "centre":
			return true;
		default:
			return false;
		}
	}

}

const requestService = new RequestService();
export default requestService;