<template>
	<section class="spinner" :class="{ inline: inline === true }">
		<span class="spinner__icon"></span>
	</section>
</template>

<script setup lang="ts">
defineProps<{
	inline?: boolean
}>();
</script>

<style lang="scss">
@import "@/scss/components/LoadingSpinner";
</style>