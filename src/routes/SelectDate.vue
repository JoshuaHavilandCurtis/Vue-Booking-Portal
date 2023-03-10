<template>
	<transition name="route-loader" appear>
		<container class="select-date my-3" v-if="storedInfoValidity.valid && timetableDataIsReady">

			<div class="row mb-4">
				<SelectDateHeader class="header-animation" :requestType="$store.state.request!.type" :requestItem="$store.state.requestItem!" />
			</div>

			<div class="row mb-4">
				<span class="select-date__date-range row justify-content-center">Date range: {{ timetable.startDate.format("YYYY-MM-DD") }} to {{ timetable.endDate.clone().subtract(1, "milliseconds").format("YYYY-MM-DD") }}</span>
			</div>
		
			<div class="row">
				<div class="col-2 d-flex justify-content-center align-items-center">
					<button ref="renderPreviousWeekButton" @click="renderWeek.previous()" v-if="timetable.startDate.clone().day(1) >= timetable.presentMoment.clone().day(1)">Previous week</button>
				</div>

				<div class="col-8 d-flex position-relative">
					<TimetableComponent :placeholderRows="timetable.times.length" :placeholderColumns="timetable.endDay - timetable.startDay + 1" :data="timetable.data!" />
					
					<transition name="element-loader">
						<LoadingSpinner v-if="! timetable.loaded" />
					</transition>
				</div>

				<div class="col-2 d-flex justify-content-center align-items-center">
					<button ref="renderNextWeekButton" @click="renderWeek.next()">Next week</button>
				</div>
			</div>

		</container>

		<LoadingSpinner v-else />
	</transition>
</template>

<script async setup lang="ts">
import SelectDateHeader from "@/components/SelectDate/SelectDateHeader.vue";
import TimetableComponent from "@/components/SelectDate/Timetable.vue";

import { ref, computed, reactive } from "vue";
import { useStore } from "vuex";
import StoreState from "@/models/StoreState.interface";
import { useRoute } from "vue-router";
import $request from "@/services/request.service";
import $errorDialog from "@/services/errorDialog.service";

import Timetable from "@/helpers/Timetable.helper";


/* DATA */

const $store = useStore<StoreState>();
const $route = useRoute();

const timetable = reactive(new Timetable(1, 5, [
	{ hour: 9, minute: 0 },
	{ hour: 10, minute: 0 },
	{ hour: 11, minute: 0 },
	{ hour: 12, minute: 0 },
	{ hour: 13, minute: 0 },
	{ hour: 14, minute: 0 },
	{ hour: 15, minute: 0 },
	{ hour: 16, minute: 0 }
]));
timetable.init();

const renderNextWeekButton = ref<HTMLButtonElement>();
const renderPreviousWeekButton = ref<HTMLButtonElement>();


/* COMPUTED */

const storedInfoValidity = computed(() => 
	$store.state.request === null ? { valid: false, message: "Request is not set!" } : 
	$store.state.requestItem === null ? { valid: false, message: "Request item is not set!" } :
	{ valid: true });

const timetableDataIsReady = computed(() => timetable.data !== null);


/* METHODS */

const setStoredInfo = async () => {
	const request = $request.getRequest($route.params); //get request from url params
	const requestItem = await $request.getRequestItem(request); //then get request item from umbraco api

	$store.commit("updateRequest", request);
	$store.commit("updateRequestItem", requestItem)
};

const renderWeek = {
	async current() {
		await timetable.loadCurrentWeek($store.state.request!, $store.state.requestItem!).catch(e => {
			$errorDialog.open(e as string);
			throw e;
		});
	},
	async next() {
		renderNextWeekButton.value!.disabled = true;
		await timetable.loadNextWeek($store.state.request!, $store.state.requestItem!).catch(e => {
			$errorDialog.open(e as string);
			throw e;
		});
		renderNextWeekButton.value!.disabled = false;
	},
	async previous() {
		renderPreviousWeekButton.value!.disabled = true;
		await timetable.loadPreviousWeek($store.state.request!, $store.state.requestItem!).catch(e => {
			$errorDialog.open(e as string);
			throw e;
		});
		renderPreviousWeekButton.value!.disabled = false;
	}
};


/* RUNTIME */

(async () => {
	try {
		await setStoredInfo();
		if (! storedInfoValidity.value.valid) throw storedInfoValidity.value.message;
		await renderWeek.current();
	} catch(e) {
		$errorDialog.open(e as string);
	}
})();
</script>

<style lang="scss">
@import "@/scss/views/select-date.scss";
</style>