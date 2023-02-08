import { createRouter, createWebHistory } from "vue-router";

import Error from "./routes/Error.vue";
import Testing from "./routes/Testing.vue";
import SelectDate from "./routes/SelectDate.vue";
import InputDetails from "./routes/InputDetails.vue";
import SelectTime from "./routes/SelectTime.vue";

const router = createRouter({
	history: createWebHistory((import.meta as any).env.BASE_URL), //TODO --- fix this
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
			path: '/:pathMatch(.*)*',
			name: 'error',
			component: Error
		},
	]
});

export default router;
