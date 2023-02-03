import { createApp } from "vue";

/* libs */
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

/* vue */
import App from "./App.vue";
import store from "./store";
import router from "./router";

/* services */
import apiService from "./services/api.service";
import requestService from "./services/request.service";

/* components */

//ui
import Container from "./components/ui/Container.vue";

//general
import Timetable from "./components/select-date/Timetable.vue";
import ConsultantSelector from "./components/select-time/ConsultantSelector.vue";
import ErrorDialog from "./components/ErrorDialog.vue";
import LoadingWheel from "./components/LoadingWheel.vue";


const app = createApp(App);

app.config.globalProperties.$api = apiService;
app.config.globalProperties.$request = requestService;

app.component("container", Container);

app.component("timetable", Timetable);
app.component("error-dialog", ErrorDialog);
app.component("loading-wheel", LoadingWheel);
app.component("consultant-selector", ConsultantSelector);

app.use(store);
app.use(router);

app.mount("#app");
