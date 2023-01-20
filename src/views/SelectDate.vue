<template>
	<div class="fadein my-3" v-if="$store.state.request !== null">
		<select-date-message class="mb-4"></select-date-message>
		<timetable></timetable>
	</div>
</template>

<script>
export default {
	methods: {

		async getAndSetRequest() {
			try {
				const request = await this.$request.getRequest(this.$route.params);
				this.$store.commit("setRequest", request);
			} catch (e) {
				this.$store.commit("openErrorDialog", e);
				console.error(e);
				return;
			}
		},

	},
	created() {
		this.getAndSetRequest();
	},
	beforeCreate() {
		this.$store.state.request = null;
	}
}
</script>