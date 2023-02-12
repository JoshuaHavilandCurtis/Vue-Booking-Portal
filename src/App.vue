<template>
	<router-view />
	<ErrorDialog />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
</script>


<style lang="scss">
@import "@/scss/main";
</style>