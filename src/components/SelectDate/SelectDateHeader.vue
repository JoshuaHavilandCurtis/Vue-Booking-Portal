<template>
	<section class="select-date-header">
		<h2 v-if="requestType !== 'centre'">{{ requestItem.message }}</h2>

		<template v-else>
			<h2>Book a time slot with a</h2>
			<select class="select-date-header__centre-selector" ref="centreSelector" @change="handleSelectCentreChanged()">
				<option v-for="subspecialty in requestItem.subspecialties" :key="subspecialty" :value="subspecialty.id">{{ subspecialty.name }}</option>
			</select>
		</template>

	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import StoreState from "@/models/StoreState.interface";

import { RequestType } from "@/models/Request.interface"
import RequestItem from "@/models/RequestItem.interface";


/* DATA */

const $store = useStore<StoreState>();

defineProps<{
	requestType: RequestType,
	requestItem: RequestItem
}>();

const centreSelector = ref<HTMLSelectElement>();


/* METHODS */

const handleSelectCentreChanged = () => {
	const selectedOption = centreSelector.value!.value;
	$store.commit("updateRequestItem", { selectedSubspecialtyId: selectedOption });
}

</script>

<style lang="scss">
@import "@/scss/components/SelectDate/SelectDateHeader";
</style>