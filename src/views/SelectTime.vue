<template>
    <container class="select-time fadein my-3" v-if="$store.state.request !== null">

        <div class="row">
            <consultant-selector v-if="consultants !== null" :consultants="consultants"></consultant-selector>
            <slot-selector v-else-if="slots !== null" :slots="slots"></slot-selector>
        </div>

    </container>
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
	async created() {
        this.checkRequestAndBooking(); //check that we have a valid request and booking object still
		await this.checkWhichSelectorToUse();
	},
	methods: {

        /* mutable methods */

        checkRequestAndBooking() {
            try {
                if (this.$store.state.request === null) throw new Error("Request is not set!");
                if (! this.$request.validateRequest(this.$store.state.request)) throw new Error("Request is not valid!");
                if (this.$store.state.booking?.date === null) throw new Error("Date is not set!");
            } catch (e) {
				this.$store.commit("openErrorDialog", e);
				throw e;
            }
        },

        async checkWhichSelectorToUse() {
            const consultantSelector = true;

            if (consultantSelector) {
                const consultants = await this.$api.getAvailableConsultantsByRequest(this.$store.state.request, this.$store.state.booking.date);
                this.consultants = consultants.map(consultant => {
                    return { ...consultant, availableslots: consultant.availableslots.map(slot => moment(slot, "HH:mm")) }
                });
            } else {
                const slots = await this.$api.getAvailableSlotsByRequest(this.$store.state.request, this.$store.state.booking.date);
                this.slots = slots.map(slot => moment(slot, "HH:mm"));
            }
        }

	}
}
</script>

<style lang="scss">
@import "@/scss/views/select-time";
</style>
