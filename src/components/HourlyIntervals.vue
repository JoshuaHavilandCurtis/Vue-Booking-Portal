<template>
    <li>
        <span class="intervals__time">{{ time.format('hh:mm A') }}</span>
        <button @click="handleEntryClicked(entry)">Book Appointment</button>

    </li>
</template>

<script>
export default {
	data() {
		return {

        }
    },
    inject: ['intervals'],
    methods: {
        handleEntryClicked() {
			// if (entry.valid === false || entry.available === false) return;

			// this.$store.commit("updateBookingSlot", { date: entry.date });
			this.$router.push({ path: "/input-details" });
		},
    },
    mounted() {
		this.$store.commit("markRouteAsLoaded");
	}
}
</script>
