<template>
    <container>
        <div class="intervals">
            <ul>
                <li>
                    <span class="intervals__time">11:10am</span>
                    <button>Book Appointment</button>
                </li>
            </ul>
        </div>
    </container>
</template>

<script>
export default {
	data() {
		return {
		
        }
    },
    mounted() {
		this.$store.commit("markRouteAsLoaded");
	}
}
</script>
