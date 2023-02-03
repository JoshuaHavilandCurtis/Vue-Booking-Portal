<template>
	<div class="select-date fadein my-3" v-if="$store.state.request !== null">

		<timetable></timetable>

	</div>
</template>

<script>
export default {
	beforeCreate() {
		//reset the request object here
		this.$store.commit("setRequest", null);
	},
	async created() {
		//get the request from the url params and set the request object
		await this.getAndSetRequest();
		this.$store.commit("routeLoaded", true);
	},
	methods: {

		async getAndSetRequest() {
			let request;
			try {
				request = await this.$request.getRequest(this.$route.params);
			} catch (e) {
				this.$store.commit("openErrorDialog", e);
				console.error(e);
				return;
			}
			
			this.$store.commit("setRequest", request);
		},



	}
}
</script>

<style lang="scss">
@import "@/scss/views/select-date.scss";
</style>