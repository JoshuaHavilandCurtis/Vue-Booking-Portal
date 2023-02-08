const owApi =  "http://127.0.0.1:6969/https://api-test.welbeckhealth.com/api/app/";
const umbracoApi = window.location.origin;

export default {
	ow: {
		getSlotsById: owApi + "PostAPIAvailabilityRequest"
	},
	umbraco: {
		getRelatedConsultants: umbracoApi + "/temp/multiple/consultants.json",

		getConsultantById: umbracoApi + "/temp/single/consultant.json",
		getTestById: umbracoApi + "/temp/single/test.json",
		getTreatmentById: umbracoApi + "/temp/single/treatment.json",
		getConditionById: umbracoApi + "/temp/single/condition.json",
		getCentreById: umbracoApi + "/temp/single/centre.json"
	}
};