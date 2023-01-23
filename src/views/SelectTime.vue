<template>
    <div class="fadein my-3">
        <hourly-intervals></hourly-intervals>
    </div>
</template>

<script>
import axios from "axios";
import apiConfig from "../api.config";

export default {
	methods: {
        async getHourlyIntervals() {

            try {
                const response = await axios.get(apiConfig.getHourlyIntervals);
			    const apiIntervals = response.data.entries;
			    return apiIntervals;
            } catch (error) {
                console.error(error)
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