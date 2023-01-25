<template>
	<div class="select-date fadein my-3" v-if="$store.state.request !== null">

		<!-- select date message -->

		<container>
			<div class="select-date__message mb-4">
				<span class="select-date__message--text"  v-if="$store.state.request.type !== 'centre'">{{ $store.state.request.item.message }}</span>
	
				<template v-else>
					<span class="select-date__message--text">Book a time slot with a</span>
					<select class="select-date__message--select" @change="handleSelectCentreChanged($event)">
						<option v-for="subspecialty in $store.state.request.item.subspecialties" :key="subspecialty" :value="subspecialty.id">{{ subspecialty.name }}</option>
					</select>
				</template>
			</div>
		</container>

		<!-- select date timetable -->

		<timetable></timetable>
	</div>
</template>

<script>
export default {
	beforeCreate() {
		//reset the request object here
		this.$store.commit("setRequest", null);
	},
	created() {
		//get the request from the url params and set the request object
		this.getAndSetRequest();
	},
	methods: {

		async getAndSetRequest() {
			try {
				const request = await this.$request.getRequest(this.$route.params);
				this.$store.commit("setRequest", request);
			} catch (e) {
				this.$store.commit("openErrorDialog", e);
				console.error(e);
			}
		},

		handleSelectCentreChanged(ev) {
			const selectedOption = ev.target.value;
			this.$store.commit("updateRequest", { selectedSubspecialtyId: selectedOption });
		}

	}
}
</script>

<style lang="scss">
@import "@/scss/views/select-date.scss";
</style>