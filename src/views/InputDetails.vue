<template>
	<div class="fadein my-3" v-if="$store.state.request !== null">
		<user-form></user-form>
	</div>
</template>

<script>
export default {
	methods: {

		checkRequest() {
			try {
				if (this.$store.state.request === null) throw "Request is not set!";
				if (this.$request.validateRequest(this.$store.state.request) === false) throw "Request is not valid!";
			} catch (e) {
				this.$store.commit("openErrorDialog", e);
				console.error(e);
				return;
			}
		}

	},
	created() {
		this.checkRequest();
	},
	mounted() {
		this.$store.commit("markRouteAsLoaded");
	}
}
</script>