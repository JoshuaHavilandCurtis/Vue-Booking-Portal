<template>
	<section class="select-date-header">
		<span class="select-date-header__message"  v-if="$store.state.request.type !== 'centre'">{{ $store.state.request.item.message }}</span>
		<template v-else>
			<span class="select-date-header__message">Book a time slot with a</span>
			<select class="select-date-header__centre-selector" @change="handleSelectCentreChanged($event)">
				<option v-for="subspecialty in $store.state.request.item.subspecialties" :key="subspecialty" :value="subspecialty.id">{{ subspecialty.name }}</option>
			</select>
		</template>
	</section>
</template>

<script>
export default {
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