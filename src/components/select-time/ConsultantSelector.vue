<template>
	<container class="consultant-selector">
		<ul class="consultant-selector__list">
			<li class="consultant-selector__consultant" v-for="consultant in consultants" :key="consultant">
				<img class="consultant-selector__consultant__image" :src="consultant.image">

				<h2 class="consultant-selector__consultant__name">{{ consultant.title }} {{ consultant.firstname }} {{ consultant.lastname }}</h2>

				<h4 class="consultant-selector__consultant__specialty">{{ consultant.specialty }}</h4>

				<ul class="consultant-selector__consultant__subspecialties" v-if="consultant.subspecialties.length > 0">
					<li v-for="subspecialty in consultant.subspecialties">{{ subspecialty }}</li>
				</ul>

				<ul class="consultant-selector__available-slots" v-if="consultant.availableslots.length > 0">
					<li v-for="availableSlot in consultant.availableslots.map(availableSlot => moment(availableSlot))" :key="availableSlot">{{ availableSlot.format("HH:mm") }}</li>
				</ul>
			</li>
		</ul>
	</container>
</template>

<script>
import moment from "moment";
import "moment-timezone";

export default {
    props: ["consultants"]
}
</script>