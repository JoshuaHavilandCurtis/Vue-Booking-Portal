<template>
    <container>
        <ul class="intervals">
            <hourly-intervals v-for="int in intervals" :key="int" :time="int"></hourly-intervals>
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
	methods: {
        async getHourlyIntervals() {

            try {
                const response = await axios.get(apiConfig.getHourlyIntervals);
                // Complete Object 
			    const apiIntervals = response.data;
                // Get intervals only
                this.intervals = response.data.intervals;
                // this.intervals = moment(response.data.intervals).format('hh:mm A');
                console.log('time object', apiIntervals)
			    return apiIntervals;

            } catch (e) {
                this.$store.commit("openErrorDialog", e);
				console.error(e);
				return;
            }
		},
	},
	created() {
		this.getHourlyIntervals();
	},
	beforeCreate() {
		this.$store.state.request = null;
	}
}
</script>

<style lang="scss">
@import "@/scss/components/select-time.scss";
</style>
