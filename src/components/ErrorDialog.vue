<template>
	<section class="error-dialog-container" v-show="$store.state.errorDialog.visible">
		<div class="error-dialog">
			<span class="error-dialog__heading">An error has occured!</span>
			<div class="error-dialog__content">
				<span class="error-dialog__content__default">Unfortunately, the OneWelbeck booking portal has ran into an error.</span>
				<span class="error-dialog__content__default">Please try again later, or contact us at <a href="tel:02036 532000">02036 532000</a> or <a href="mailto:info@onewelbeck.com">info@onewelbeck.com</a>.</span>
			</div>
			<span class="error-dialog__error-message" v-if="! isProduction && $store.state.errorDialog.message !== null">{{ $store.state.errorDialog.message }}</span>
			<div class="error-dialog__buttons">
				<button @click="$router.go()">Reload</button>
				<button @click="$store.commit('closeErrorDialog')">Close</button>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			isProduction: process.env.NODE_ENV === "production"
		}
	}
}
</script>

<style lang="scss">
@import "@/scss/components/error-dialog";
</style>
