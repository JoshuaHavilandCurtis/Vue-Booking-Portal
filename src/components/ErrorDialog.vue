<template>
	<div class="error-dialog-container" v-show="$store.state.errorDialog.visible === true">
		<div class="error-dialog">
			<span class="error-dialog--heading">An error has occured!</span>
			<div class="error-dialog--content">
				<span class="error-dialog--content--default">Unfortunately, the OneWelbeck booking portal has ran into an error.</span>
				<span class="error-dialog--content--default">Please try again later, or contact us at <a href="tel:02036 532000">02036 532000</a> or <a href="mailto:info@onewelbeck.com">info@onewelbeck.com</a>.</span>
				<span class="error-dialog--content--message" v-if="$store.state.errorDialog.message !== null">{{ $store.state.errorDialog.message }}</span>
			</div>
			<button class="error-dialog--close-btn" @click="closeDialog">Close</button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
	methods: {
		closeDialog() {
			this.$store.commit("closeErrorDialog");
		}
	}
}
</script>

<style lang="scss">
@import "@/scss/components/error-dialog";
</style>
