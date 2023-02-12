import { createApp } from "vue";
import App from "@/App.vue";
import store from "@/store";
import router from "@/router";

/* global components */
import Container from "./components/Container.vue";
import ErrorDialog from "@/components/ErrorDialog.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";


const app = createApp(App);

/* global components */
app.component("Container", Container);
app.component("ErrorDialog", ErrorDialog);
app.component("LoadingSpinner", LoadingSpinner);

app.use(store);
app.use(router);

app.mount("#app");