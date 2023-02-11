<template>
	<section class="select-date-header">
		<span class="select-date-header__message" v-if="requestType !== 'centre'">{{ requestItem.message }}</span>
		<template v-else>
			<span class="select-date-header__message">Book a time slot with a</span>
			<select class="select-date-header__centre-selector" ref="centreSelector" @change="handleSelectCentreChanged()">
				<option v-for="subspecialty in requestItem.subspecialties" :key="subspecialty" :value="subspecialty.id">{{ subspecialty.name }}</option>
			</select>
		</template>
	</section>
</template>

<script setup lang="ts">
import { RequestType } from "@/models/Request.interface"
import RequestItem from "@/models/RequestItem.interface";
import StoreState from "@/models/StoreState.interface";
import { ref } from "vue";
import { useStore } from "vuex";


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
@import "@/scss/components/select-date/select-date-header";
</style>