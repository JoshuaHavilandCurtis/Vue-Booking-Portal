<script>
export default {
	created() {
        try {
            throw "Invalid route!";
        } catch (e) {
            this.$store.commit("openErrorDialog", e);
            console.error(e);
            return;
        }
    }
}
</script>