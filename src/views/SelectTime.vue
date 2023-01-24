<template>
    <container>
        <ul class="intervals">
            <hourly-intervals v-for="int in intervals" :key="int"></hourly-intervals>
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
</template>

<script>
import moment from "moment";
import "moment-timezone";
import axios from "axios";
import apiConfig from "../api.config";

export default {
    data() {
        return {
            intervals: []
        }
    },
    provide() {
        return {
            intervals: this.intervals
        }
    },
	methods: {
        async setIntervals() {

            try {
                this.intervals = await this.getHourlyIntervals();
            } catch (e) {
                this.$store.commit("openErrorDialog", e);
				console.error(e);
				return;
            }

        },

        async getHourlyIntervals() {
            const date = this.$store.state.selectedBookingSlot.date;
            if (date === null) throw new Error("Date not selected!");

            const availableIntervals = await this.$api.getAvailableIntervalsByRequest(this.$store.state.request, date);

            for (const interval of availableIntervals) {
                tempIntervals.push(moment(interval, "hh:mm"));
            }

            this.intervals = tempIntervals;

            return apiIntervals;
		},
	},
	created() {
		this.setIntervals();
        this.$store.commit("markRouteAsLoaded");
	},
	beforeCreate() {
		this.$store.state.request = null;
	}
}
</script>

<style lang="scss">
@import "@/scss/components/select-time.scss";
</style>
