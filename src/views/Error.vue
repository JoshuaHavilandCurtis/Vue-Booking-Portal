<script>
export default {
	created() {
        try {
            throw new Error("Invalid route!");
        } catch (e) {
            this.$store.commit("openErrorDialog", e);
            console.error(e);
        }
    }
}
</script>