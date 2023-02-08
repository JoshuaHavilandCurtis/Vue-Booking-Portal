<template>
    <container class="select-time fadein my-3" v-if="$store.state.request !== null && (consultants !== null ^ slots !== null)">

        <div class="row">
            <consultant-selector v-if="consultants !== null" :consultants="consultants"></consultant-selector>
            <slot-selector v-else-if="slots !== null" :slots="slots"></slot-selector>
        </div>

    </container>
    <loading-wheel v-else class="fill-container"></loading-wheel>
</template>

<script>
import moment from "moment";
import "moment-timezone";

export default {
    data() {
        return {
            consultants: null,
            slots: null
        }
    },
	created() {
        this.checkStoredInfo();
		this.checkWhichSlotSelectorToUse();
	},
	methods: {

        checkStoredInfo() {
            try {
                if (this.$store.state.request === null || ! this.$request.validateRequest(this.$store.state.request)) throw new Error("Request is not set/valid!");
                if (this.$store.state.booking === null) throw new Error("No booking information is set!");
                if (this.$store.state.booking.date === undefined) throw new Error("Date is not set!");
            } catch (e) {
				this.$store.commit("openErrorDialog", e);
				throw e;
            }
        },

        async checkWhichSlotSelectorToUse() {
            try {
                await this.setSelectorData();
            } catch(e) {
                this.$store.commit("openErrorDialog", "Failed to get slot data!");
                throw e;
            }
        },

        async setSelectorData() {
            const consultantSelector = true;

            const slotToMoment = (slot) => moment(`${slot.SlotDate} ${slot.StartTime}`, "YYYY-MM-DD HH:mm:ss");

            if (consultantSelector) {
                const consultantsInfo = await this.$api.getRelatedConsultants(this.$store.state.request);

                const consultants = await Promise.all(consultantsInfo.map(async consultant => {
                    const slots = await this.$api.getSlots(consultant.id, moment(this.$store.state.booking.date));

                    return {
                        info: consultant,
                        slots: slots.map(slot => slotToMoment(slot)).filter(slotMoment => slotMoment.isSameOrAfter(this.$store.state.booking.date) && slotMoment.isBefore(this.$store.state.booking.date.clone().add(1, "hours")))
                    }
                }));

                this.consultants = await consultants;

            } else {
                const slots = await this.$api.getSlots(this.$store.state.request.id, moment(this.$store.state.booking.date));
                this.slots = slots.map(slot => slotToMoment(slot));
            }
        }

	}
}
</script>

<style lang="scss">
@import "@/scss/views/select-time";
</style>
