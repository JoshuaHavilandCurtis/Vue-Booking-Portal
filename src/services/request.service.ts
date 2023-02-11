import Request, { RequestType } from "@/models/Request.interface";
import { reactive } from "vue";
import { RouteParams } from "vue-router";
import apiService from "./api.service";

export class RequestService {

	/** Serivce to handle the request information */

	validTypes = ["consultant", "test", "treatment", "condition", "centre"];

	constructor() {}


	getRequest(routeParams: RouteParams) {
		const id = parseInt(routeParams.id.toString());
		const type = routeParams.type.toString();

		if (! this.validTypes.includes(type) || isNaN(id)) throw new Error("URL params are not valid!");

		const request: Request = { type: type as RequestType, id };

		return request;
	}


	async getRequestItem(request: Request) {
		const requestItem = await apiService.getItem(request).catch(() => { throw new Error("Request is not valid!") });
		
		if (request.type === "centre") requestItem.selectedSubspecialtyId = requestItem.subspecialties[0].id; //select first subspecialty

		return requestItem;
	}

}

const $request = new RequestService();
export default reactive($request);