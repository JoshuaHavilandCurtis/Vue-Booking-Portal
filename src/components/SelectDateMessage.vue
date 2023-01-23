<template>
	<container>
		<div class="select-date-message">
			<span class="select-date-message--text"  v-if="$store.state.request.type !== 'centre'">{{ $store.state.request.item.message }}</span>

			<template v-else>
				<span class="select-date-message--text">Book a time slot with a</span>
				<select class="select-date-message--select" @change="handleSelectCentreChanged($event)">
					<option v-for="subspecialty in $store.state.request.item.subspecialties" :key="subspecialty" :value="subspecialty.id">{{ subspecialty.name }}</option>
				</select>
			</template>
		</div>
	</container>
</template>

<script>
export default {
	data() {
		return {
			subspecialties: null
		}
	},
	methods: {
		
		handleSelectCentreChanged(ev) {
			const selectedOption = ev.target.value;

			this.$store.commit("setRequest", { selectedSubspecialtyId: selectedOption });
		}

	},
	created() {
	}
}
</script>

<style lang="scss">
@import "@/scss/components/select-date-message";
</style>
