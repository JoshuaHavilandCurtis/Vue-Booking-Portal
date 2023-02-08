<template>
	<section class="consultant-selector">
		<h1>Please select a consultant and a slot</h1>
		<ul class="consultant-selector__list row g-4">
			<li class="col-6" v-for="consultant in consultants" :key="consultant">
				<div class="consultant-selector__consultant p-3">
					<div class="row">
						<img class="consultant-selector__consultant__image col" :src="consultant.info.image">

						<div class="col w-100">
							<h2 class="consultant-selector__consultant__name">{{ consultant.info.title }} {{ consultant.info.firstname }} {{ consultant.info.lastname }}</h2>
							<h4 class="consultant-selector__consultant__specialty">{{ consultant.info.specialty }}</h4>
							<ul class="consultant-selector__consultant__subspecialties" v-if="consultant.info.subspecialties.length > 0">
								<li v-for="subspecialty in consultant.subspecialties" :key="subspecialty">{{ subspecialty }}</li>
							</ul>
						</div>
					</div>

					<ul class="consultant-selector__consultant__available-slots row" v-if="consultant.slots.length > 0">
						<li v-for="slot in consultant.slots" :key="slot">{{ slot.format("HH:mm a") }}</li>
					</ul>
				</div>
			</li>
		</ul>
	</section>
</template>

<script>
import moment from "moment";
import "moment-timezone";

export default {
    props: ["consultants"]
}
</script>

<style lang="scss">
@import "@/scss/components/select-time/consultant-selector";
</style>
