import ConsultantsResponse from "@/models/api/ConsultantsResponse.interface";
import SlotsResponse from "@/models/api/SlotsResponse.api.interface";
import Request from "@/models/Request.interface";
import { Moment } from "moment";
import { reactive } from "vue";
import apiConfig from "../api.config";

export class ApiService {

	/** Service to handle api functionality */

	constructor() {}


	async getItem(request: Request) {
		let response;

		switch (request.type) {
			case "consultant": 
				response = await fetch(apiConfig.umbraco.getConsultantById);
				break;
			case "test": 
				response = await fetch(apiConfig.umbraco.getTestById);
				break;
			case "treatment": 
				response = await fetch(apiConfig.umbraco.getTreatmentById);
				break;
			case "condition": 
				response = await fetch(apiConfig.umbraco.getConditionById);
				break;
			case "centre": 
				response = await fetch(apiConfig.umbraco.getCentreById);
				break;
			default: return null;
		}

		return response.json();
	}


	async getRelevantConsultants(request: Request) {
		let response;

		switch (request.type) {
			case "consultant":
				response = await fetch(apiConfig.umbraco.getRelevantConsultants);
				break;
			case "test":
				response = await fetch(apiConfig.umbraco.getRelevantConsultants);
				break;
			case "treatment":
				response = await fetch(apiConfig.umbraco.getRelevantConsultants);
				break;
			case "condition":
				response = await fetch(apiConfig.umbraco.getRelevantConsultants);
				break;
			case "centre":
				response = await fetch(apiConfig.umbraco.getRelevantConsultants); //request.selectedSubspecialtyId !!!!!
				break;
		}

		const data: ConsultantsResponse = await response.json();
		return data;
0	}


	async getSlots(id: number, weekCommencing: Moment) {
		const response = await fetch(apiConfig.ow.getSlotsById, {
			method: "post",
			body: JSON.stringify({
				Data: {
					WeekCommencing: weekCommencing.format("YYYY-MM-DD"),
					ServicesRequired: id
				}
			}),
			headers: {
				//Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IlJObkFxU0lReWMxWWJFXzNaRDFmWU1tRUR5cyIsImtpZCI6IlJObkFxU0lReWMxWWJFXzNaRDFmWU1tRUR5cyJ9.eyJhdWQiOiJ1cm46bWljcm9zb2Z0OnVzZXJpbmZvIiwiaXNzIjoiaHR0cDovL3Nzby53ZWxiZWNraGVhbHRoLmNvbS9hZGZzL3NlcnZpY2VzL3RydXN0IiwiaWF0IjoxNjc1ODEwODI4LCJuYmYiOjE2NzU4MTA4MjgsImV4cCI6MTY3NTgxNDQyOCwiYXBwdHlwZSI6IkNvbmZpZGVudGlhbCIsImFwcGlkIjoiZjRlMzd5ZGYtZWtxdS01a2ZqLWhrcTYta3E2cTZydWc1bm03IiwiYXV0aG1ldGhvZCI6InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphYzpjbGFzc2VzOlBhc3N3b3JkUHJvdGVjdGVkVHJhbnNwb3J0IiwiYXV0aF90aW1lIjoiMjAyMy0wMi0wN1QxMDo0MjoyNy4yNTJaIiwidmVyIjoiMS4wIiwic2NwIjoib3BlbmlkIiwic3ViIjoiVllhYmRvbmxpUzlHTU1la2FnUndpUU5EcnhtOS9zaTZkVG56TldTdm94Zz0ifQ.bX58QI5Iq2HgnqullGMrvoVSX0Wy2rFg7DWn5IfTffgxnRX2hSxa3L6tmIYyYEzyubP1aXZyqFndCCfiPn5kEcIDzCKG_Fy8xCg1gXanXvJHY0VJDGdGRo6_SMP2Tb0KRtsrwBQv9U1rQdIfd_PhSi5IeP8OSe4ZW7JETMXfdAOKk4PQQvrNqitV7hWE4lg134oYHSyjSFPMq8TURILT-a4FsYgpHilzG0n1B0Kvx_s_KYX5mRO9eeTUKJ0C0nSx1L4r9jTD8N3e81C1_9-8epdJATWJg0bEd_zBgjI8pMJcPKZCfvbKoEIhphbazWxlw94vngLt31e86WvgVZu5VA",
				OneWelbeckAuthorizationHeader: "Oq/2+ZraczGRZbcwyeKhi+Se5G27/tkB", //TODO --- this needs to update? !!!
				"Content-Type": "application/json"
			}
		});

		const data: SlotsResponse = await response.json();

		return data.Data.Slots.Resources[0].Slot; //TODO --- this is wrong
	}

}

const $api = new ApiService();
export default reactive($api);