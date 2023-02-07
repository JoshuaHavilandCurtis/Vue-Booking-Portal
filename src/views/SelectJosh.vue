<template>
    <div class="select-date fadein my-3">

        <container>
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
// import moment from "moment";
// import "moment-timezone";
import axios from "axios";
import apiConfig from "../api.config";

export default {
    data() {
        return {
            intervals: []
        }
    },
    beforeCreate() {
		//reset the request object here
		this.$store.commit("setRequest", null);
	},
    mounted() {
		this.$store.commit("markRouteAsLoaded");
	},
    created() {
		//get the request from the url params and set the request object
		this.sendData();
	},
	methods: {
        async sendData() {

            const data = {
                "Data": {
                "Username": "giorgio.viani@welbeckhealth.com",
                "UserType": "Test Scheduler",
                "MessageID": "45d30084-5dd2-40a0-a340-6dd2ff3d1271",
                "WeekCommencing": "2023-06-08",
                "ServicesRequired": "819"
                }
                // Send week commencing and servicsrequested id 
            };

			try {
				const request = await axios.post(apiConfig.postTest, data, {
                    headers: {},
                });
				const josh = response.data;
                console.log('api data', josh)
			    return josh;
                
			} catch (e) {
				this.$store.commit("openErrorDialog", e);
				console.error(e);
			}
		},
    }
}
</script>

<style lang="scss">
@import "@/scss/views/select-time.scss";
</style>
