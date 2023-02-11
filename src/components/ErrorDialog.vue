<template>
	<section class="error-dialog-container" v-if="$errorDialog.visible">
		<div class="error-dialog">
			<span class="error-dialog__heading">An error has occured!</span>
			<div class="error-dialog__content">
				<span>Unfortunately, the OneWelbeck booking portal has ran into an error.</span>
				<span>Please try again, or contact us at <a href="tel:02036 532000">02036 532000</a> or <a href="mailto:info@onewelbeck.com">info@onewelbeck.com</a>.</span>
			</div>
			<span class="error-dialog__error-message" v-if="! isProduction && $errorDialog.message !== undefined">{{ $errorDialog.message }}</span>
			<div class="error-dialog__buttons">
				<button @click="$router.go(0)">Reload</button>
				<button @click="$errorDialog.close()" v-if="! isProduction">Close</button>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import $errorDialog from "@/services/errorDialog.service";

const $router = useRouter();

const isProduction = process.env.NODE_ENV === "production";


</script>

<style lang="scss">
@import "@/scss/components/error-dialog";
</style>