<template></template>

<script setup lang="ts">
import $errorDialog from "@/services/errorDialog.service";

try {
	throw new Error("Invalid route!");
} catch(e) {
	$errorDialog.open(e as string);
}
</script>