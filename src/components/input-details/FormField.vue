<template>
	<div class="form-field">
		<div class="form-field__errors" :class="{ visible: errors !== undefined && errors.length > 0 }">
			<i class="form-field__errors__icon fa fa-exclamation-circle"></i>
			<ul class="form-field__errors__list">
				<li v-for="error in errors">{{ error }}</li>
			</ul>
		</div>

		<slot></slot>
	</div>
</template>

<script setup lang="ts">

defineProps<{
	errors?: string[]
}>();

</script>

<style lang="scss">
@import "@/scss/components/input-details/form-field";
</style>