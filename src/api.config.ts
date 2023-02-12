import config from "@/config";

const json = `${location.origin}/${config.staticPath}/temp`;
const corsBypasser = "http://127.0.0.1:6969";
const owApi = `${corsBypasser}/https://api-test.welbeckhealth.com/api/app`;
//const umbracoApi = "";

export default {
	ow: {
		getSlotsById: `${owApi}/PostAPIAvailabilityRequest`
	},
	umbraco: {
		getRelevantConsultants:  `${json}/multiple/consultants.json`,

		getConsultantById: `${json}/single/consultant.json`,
		getTestById: `${json}/single/test.json`,
		getTreatmentById: `${json}/single/treatment.json`,
		getConditionById: `${json}/single/condition.json`,
		getCentreById: `${json}/single/centre.json`
	}
};