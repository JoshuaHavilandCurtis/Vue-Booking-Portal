<template>
    <div class="home">
        <a class="button" href="/consultant/1">select by consultant</a>
        <a class="button" href="/test/1">select by test</a>
        <a class="button" href="/treatment/1">select by treatment</a>
        <a class="button" href="/condition/1">select by condition</a>
        <a class="button" href="/centre/1">select by centre</a>
        <a class="button" href="/">select with no url params at all</a>
    </div>
</template>

<script>
export default {
    created() {
		this.$store.commit("routeLoaded", true);
	}
}
</script>

<style lang="scss">
    .home {
        display:flex;
        justify-content:center;
        align-items:center;
        min-width:100vh;
        min-height:100vh;
    }
</style>