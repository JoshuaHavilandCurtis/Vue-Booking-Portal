<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
	<router-view></router-view> <!-- This is needed! -->
	<error-dialog></error-dialog>
</template>

<script>
import InputDetails from "./routes/InputDetails.vue";

export default {
	name: "App",
	components: {
		InputDetails,
	},
};

</script>

<style lang="scss">
@import "@/scss/main";
</style>