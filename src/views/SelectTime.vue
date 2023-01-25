<template>
    <div class="select-date fadein my-3" v-if="$store.state.request !== null">

        <container>
            <ul class="intervals">
                <hourly-intervals v-for="interval in intervals" :key="interval" :interval="interval"></hourly-intervals>
            </ul>

            <ul>
                <li>
                    <img src="" alt="">
                    <h1>Dr Ameet Dhar</h1>
                    <p>Consultant Gastroenterologist and Hepatologist</p>

                    <ul class="specialist-in">
                        <li><span>Specialist expertise:</span></li>
                        <li>Hepatology,</li>
                        <li>Gastroenterologist,</li>
                        <li>Liver</li>
                    </ul>
                </li>
            </ul>
        </container>

    </div>
</template>

<script>
import moment from "moment";
import "moment-timezone";

export default {
    data() {
        return {
            intervals: []
        }
    },
	created() {
        //check that we have a valid request object still
        this.checkRequest();

        //get the available intervals from the api and set them here
		this.setIntervals();
	},
	methods: {

        /* mutable methods */

        checkRequest() {
			try {
				if (this.$store.state.request === null) throw new Error("Request is not set!");
				if (this.$request.validateRequest(this.$store.state.request) === false) throw new Error("Request is not valid!");
			} catch (e) {
				this.$store.commit("openErrorDialog", e);
				console.error(e);
			}
		},

        async setIntervals() {
            try {
                this.intervals = await this.createIntervals();
            } catch (e) {
                this.$store.commit("openErrorDialog", e);
				console.error(e);
				return;
            }

            this.$store.commit("markRouteAsLoaded");
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
