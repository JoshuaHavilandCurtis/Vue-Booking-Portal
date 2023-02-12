<template>
    <transition name="route-loader" appear>
        <container class="select-time my-3" v-if="storedInfoValidity.valid && slotSelectorHasBeenDetermined">

            <div class="row mb-4">
                <h2 v-if="consultants !== undefined" class="header-animation">Please select a slot with a consultant for <b>{{ $store.state.booking!.date?.format("DD/MM/YYYY") }}</b></h2>
                <h2 v-else-if="slots !== undefined" class="header-animation">Please select an available slot for <b>{{ $store.state.booking!.date?.format("DD/MM/YYYY") }}</b></h2>
            </div>

            <div class="row">
                <ConsultantSelector v-if="consultants !== undefined" :consultants="consultants" />
                <SlotSelector v-else-if="slots !== undefined" :slots="slots" />
            </div>

        </container>

        <LoadingSpinner v-else />
    </transition>
</template>

<script setup lang="ts">
import ConsultantSelector from "@/components/SelectTime/ConsultantSelector.vue";
import SlotSelector from "@/components/SelectTime/SlotSelector.vue";

import { computed, ref } from "vue";
import { useStore } from "vuex";
import StoreState from "@/models/StoreState.interface";
import $api from "@/services/api.service";
import $errorDialog from "@/services/errorDialog.service";

import moment, { Moment } from "moment";
import ConsultantInfo from "@/models/ConsultantInfo.interface";
import { Slot } from "@/models/api/SlotsResponse.api.interface";


/* DATA */

const $store = useStore<StoreState>();

const consultants = ref<ConsultantInfo[]>();
const slots = ref<Moment[]>();


/* COMPUTED */

const storedInfoValidity = computed(() => 
	$store.state.request === null ? { valid: false, message: "Request is not set!" } : 
	$store.state.requestItem === null ? { valid: false, message: "Request item is not set!" } :
	$store.state.booking?.date === undefined ? { valid: false, message: "Date is not set!" } : 
	{ valid: true });

const slotSelectorHasBeenDetermined = computed(() => (consultants.value !== undefined ||  slots.value !== undefined) && ! (consultants.value !== undefined && slots.value !== undefined)); //xor operator doesnt work?


/* METHODS */

const checkWhichSlotSelectorToUse = async () => {
    try {
        await setSelectorData();
    } catch(e) {
        throw new Error("Failed to get slot data!");
    }
};

const setSelectorData = async () => {
    slots.value = undefined;
    consultants.value = undefined;
    
    const consultantSelector = true;

    if (consultantSelector) {
        consultants.value = await getConsultants();
    } else {
        slots.value = await getSlots();
    }
};

const slotToMoment = (slot: Slot) => moment(`${slot.SlotDate} ${slot.StartTime}`, "YYYY-MM-DD HH:mm:ss");

const getSlots = async () => {
    const slotMoments = await $api.getSlots($store.state.request!.id, moment($store.state.booking!.date));
    return slotMoments.map(slot => slotToMoment(slot));
};

const getConsultants = async () => {
    const consultantsInfo = await $api.getRelevantConsultants($store.state.request!);

    return await Promise.all(consultantsInfo.map(async consultant => {
        const slotMoments = await $api.getSlots(consultant.id, moment($store.state.booking!.date));

        const consultantInfo: ConsultantInfo = {
            ...consultant,
            slots: slotMoments.map(slot => slotToMoment(slot)).filter(slotMoment => slotMoment.isSameOrAfter($store.state.booking!.date) && slotMoment.isBefore($store.state.booking!.date!.clone().add(1, "hours")))
        };

        return consultantInfo;
    }));
};


/* RUNTIME */

(async () => {
    try {
        if (! storedInfoValidity.value.valid) throw storedInfoValidity.value.message;
        await checkWhichSlotSelectorToUse();
    } catch(e) {
        $errorDialog.open(e as string);
    }
})();
</script>

<style lang="scss">
@import "@/scss/views/select-time";
</style>
