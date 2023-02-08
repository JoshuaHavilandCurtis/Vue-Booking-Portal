<template>
	<section class="select-date-header">
		<span class="select-date-header__message"  v-if="requestType !== 'centre'">{{ requestItem.message }}</span>
		<template v-else>
			<span class="select-date-header__message">Book a time slot with a</span>
			<select class="select-date-header__centre-selector" @change="handleSelectCentreChanged($event)">
				<option v-for="subspecialty in requestItem.subspecialties" :key="subspecialty" :value="subspecialty.id">{{ subspecialty.name }}</option>
			</select>
		</template>
	</section>
</template>

<script>
export default {
	props: ["requestType", "requestItem"],
	methods: {
		handleSelectCentreChanged(ev) {
			const selectedOption = ev.target.value;
			this.$store.commit("updateRequest", { selectedSubspecialtyId: selectedOption });
			this.renderCurrentWeek();
		}
	}
}
</script>

<style lang="scss">
@import "@/scss/components/select-date/select-date-header";
</style>