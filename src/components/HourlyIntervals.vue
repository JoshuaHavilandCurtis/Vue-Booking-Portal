<template>
    <li>
        <span class="intervals__time">{{ time }}</span>
        <button>Book Appointment</button>
    </li>
</template>

<script>
export default {
    props: ['time'],
	data() {
		return {

        }
    },
    mounted() {
		this.$store.commit("markRouteAsLoaded");
	}
}
</script>
