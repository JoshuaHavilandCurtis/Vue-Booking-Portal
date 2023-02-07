const domain = window.location.origin;

const apiConfig = {

	/* multiple */

	getConsultants: domain + "/temp/multiple/consultants.json",

	/* single */

	getTimetableEntries: domain + "/temp/single/timetable.json",
	
	getAvailableSlots: domain + "/temp/multiple/slots.json",
	getAvailableConsultants: domain + "/temp/multiple/consultants.json",

	postTest: "https://api-test.welbeckhealth.com/api/app/PostAPIAvailabilityRequest",

	//get by ids
	getConsultantById: domain + "/temp/single/consultant.json",
	getTestById: domain + "/temp/single/test.json",
	getTreatmentById: domain + "/temp/single/treatment.json",
	getConditionById: domain + "/temp/single/condition.json",
	getCentreById: domain + "/temp/single/centre.json"	
};

export default apiConfig;