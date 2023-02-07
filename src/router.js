import { createRouter, createWebHistory } from "vue-router";

import Error from "./views/Error.vue";
import Testing from "./views/Testing.vue";
import SelectDate from "./views/SelectDate.vue";
import InputDetails from "./views/InputDetails.vue";
import SelectTime from "./views/SelectTime.vue";
import SelectJosh from "./views/SelectJosh.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/testing",
			name: "testing",
			component: Testing
		},
		{
			path: "/input-details",
			name: "input-details",
			component: InputDetails
		},
		{
			path: "/:type/:id",
			name: "request",
			component: SelectDate
		},
		{
			path: "/time",
			name: "time",
			component: SelectTime
		},
		{
			path: "/josh",
			name: "josh",
			component: SelectJosh
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'error',
			component: Error
		},
	]
});

export default router;
