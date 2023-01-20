<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
	<router-view></router-view> <!-- This is needed! -->
	<error-dialog></error-dialog>
	<loading-wheel class="fullscreen" :class="{ loaded: $store.state.routeLoaded === true }"></loading-wheel>
</template>

<script>
export default {
	watch: {
		$route (to, from) {
			this.$store.commit("unloadRoute");
		}
	}
}
</script>

<style lang="scss">
@import "@/scss/main";
</style>