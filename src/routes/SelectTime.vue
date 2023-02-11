<template>
    <transition appear>
        <container class="select-time my-3" v-if="storedInfoValidity.valid && slotSelectorIsSet">

            <div class="row">
                <consultant-selector v-if="consultants !== null" :consultants="consultants"></consultant-selector>
                <slot-selector v-else-if="slots !== null" :slots="slots"></slot-selector>
            </div>

        </container>

        <loading-spinner v-else></loading-spinner>
    </transition>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from "vuex";
import $api from "@/services/api.service";
import $errorDialog from "@/services/errorDialog.service";
import moment, { Moment } from "moment";
import { Slot } from "@/models/api/SlotsResponse.api.interface";
import ConsultantInfo from "@/models/ConsultantInfo.interface";
import StoreState from "@/models/StoreState.interface";


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

const slotSelectorIsSet = computed(() => (consultants.value !== undefined ||  slots.value !== undefined) && ! (consultants.value !== undefined && slots.value !== undefined)); //xor operator doesnt work?


/* METHODS */

const checkWhichSlotSelectorToUse = async () => {
    try {
        await setSelectorData();
    } catch(e) {
        throw new Error("Failed to get slot data!");
    }
};

const setSelectorData = async () => {
    const consultantSelector = true;

    const slotToMoment = (slot: Slot) => moment(`${slot.SlotDate} ${slot.StartTime}`, "YYYY-MM-DD HH:mm:ss");

    if (consultantSelector) {
        const consultantsInfo = await $api.getRelevantConsultants($store.state.request!);

        consultants.value = await Promise.all(consultantsInfo.map(async consultant => {
            const slotMoments = await $api.getSlots(consultant.id, moment($store.state.booking!.date));

            const consultantInfo: ConsultantInfo = {
                ...consultant,
                slots: slotMoments.map(slot => slotToMoment(slot)).filter(slotMoment => slotMoment.isSameOrAfter($store.state.booking!.date) && slotMoment.isBefore($store.state.booking!.date!.clone().add(1, "hours")))
            };

            return consultantInfo;
        }));

    } else {
        const slotMoments = await $api.getSlots($store.state.request!.id, moment($store.state.booking!.date));
        slots.value = slotMoments.map(slot => slotToMoment(slot));
    }
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
