<template>
	<section class="consultant-selector">
		<div class="consultant-selector__consultants row g-4">
			<article class="col-12 col-xl-6" v-for="consultant in consultants" :key="consultant.id">
				<div class="consultant-selector__consultant p-3">
					<div class="row g-3">
						<div class="col-12 col-md-6">
							<div class="consultant-selector__consultant__image">
								<img :src="consultant.image ?? config.staticPath + '/img/avatar.jpg'">
							</div>
						</div>

						<div class="col-12 col-md-6">
							<h2 class="consultant-selector__consultant__name">{{ consultant.title }} {{ consultant.firstname }} {{ consultant.lastname }}</h2>
							<h4 class="consultant-selector__consultant__specialty">{{ consultant.specialty }}</h4>
							<span class="consultant-selector__consultant__subspecialties">{{ consultant.subspecialties.join(", ") }}</span>
						</div>
					</div>

					<ul class="consultant-selector__consultant__available-slots col-12" v-if="consultant.slots.length > 0">
						<li class="button button-dark" v-for="slot in consultant.slots" :key="slot.toString()" @click="handleSlotClicked(slot)">{{ slot.format("HH:mm") }}</li>
					</ul>
				</div>
			</article>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import StoreState from "@/models/StoreState.interface";
import { useRouter } from "vue-router";

import config from "@/config";
import { Moment } from "moment";
import "moment-timezone";
import ConsultantInfo from "@/models/ConsultantInfo.interface";


/* DATA */

const $store = useStore<StoreState>();
const $router = useRouter();

defineProps<{
	consultants: ConsultantInfo[]
}>();


/* METHODS */

const handleSlotClicked = (slot: Moment) => {
	$store.commit("updateBooking", { time: slot });
	$router.push({ path: "/input-details" });
};
</script>

<style lang="scss">
@import "@/scss/components/SelectTime/ConsultantSelector";
</style>
