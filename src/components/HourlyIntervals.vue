<template>
    <li>
        <span class="intervals__time">{{ interval.format('hh:mm A') }}</span>
        <button @click="handleIntervalClicked(interval)">Book Appointment</button>
    </li>
</template>

<script>
export default {
	data() {
		return {}
    },
    props: ["interval"],
    methods: {
        handleIntervalClicked(interval) {
			// if (entry.valid === false || entry.available === false) return;

			// this.$store.commit("updateBookingSlot", { date: entry.date });
			this.$router.push({ path: "/input-details" });
		},
    }
}
</script>
