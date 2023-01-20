import { createRouter, createWebHistory } from "vue-router";

import Error from "./views/Error.vue";
import Testing from "./views/Testing.vue";
import SelectDate from "./views/SelectDate.vue";
import InputDetails from "./views/InputDetails.vue";

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
			path: '/:pathMatch(.*)*',
			name: 'error',
			component: Error
		},
	]
});

export default router;
