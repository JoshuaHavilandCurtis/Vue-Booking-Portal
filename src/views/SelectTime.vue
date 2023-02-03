<template>
    <div class="select-time fadein my-3" v-if="$store.state.request !== null">

        <consultant-selector :consultants="consultants"></consultant-selector>

    </div>
</template>

<script>
import moment from "moment";
import "moment-timezone";

export default {
    data() {
        return {
            consultants: [],
            intervals: []
        }
    },
	async created() {
        this.checkRequest(); //check that we have a valid request object still
		await this.setIntervals(); //get the available intervals from the api and set them here
        this.$store.commit("routeLoaded", true);
	},
	methods: {

        /* mutable methods */

        checkRequest() {
			try {
				if (this.$store.state.request === null) throw new Error("Request is not set!");
				if (! this.$request.validateRequest(this.$store.state.request)) throw new Error("Request is not valid!");
			} catch (e) {
				this.$store.commit("openErrorDialog", e);
				throw e;
			}
		},

        async setIntervals() {
            try {
                this.intervals = await this.createIntervals();
            } catch (e) {
                this.$store.commit("openErrorDialog", e);
				throw e;
            }
        },

        /* non mutable methods */

        async createIntervals() {
            //get date from the selected booking slot (the user should have selected a date on the select-date component by now)
            const date = this.$store.state.selectedBookingSlot.date;
            if (date === null) throw new Error("Date not selected!");

            //get available intervals from api
            const availableIntervals = await this.$api.getAvailableIntervalsByRequest(this.$store.state.request, date);

            //then return them from this method
            return availableIntervals.map(interval => moment(interval, "HH:mm"));
		}

	}
}
</script>

<style lang="scss">
@import "@/scss/views/select-time.scss";
</style>
