const domain = window.location.origin;

const apiConfig = {

	/* multiple */

	getConsultants: domain + "/temp/multiple/consultants.json",

	/* single */

	getTimetableEntries: domain + "/temp/single/timetable.json",

	//get by ids
	getConsultantById: domain + "/temp/single/consultant.json",
	getTestById: domain + "/temp/single/test.json",
	getTreatmentById: domain + "/temp/single/treatment.json",
	getConditionById: domain + "/temp/single/condition.json",
	getCentreById: domain + "/temp/single/centre.json"	
};

export default apiConfig;