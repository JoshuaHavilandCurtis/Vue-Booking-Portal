import { createApp } from "vue";

//libs
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

//app
import App from "./App.vue";
import store from "./store";
import router from "./router";
import apiService from "./services/api.service";
import requestService from "./services/request.service";

//components
import Timetable from "./components/Timetable.vue";
import SelectDateMessage from "./components/SelectDateMessage.vue";
import ErrorDialog from "./components/ErrorDialog.vue";
import UserForm from "./components/UserForm.vue";
import LoadingWheel from "./components/LoadingWheel.vue";


const app = createApp(App);

app.config.globalProperties.$api = apiService;
app.config.globalProperties.$request = requestService;

app.component("timetable", Timetable);
app.component("error-dialog", ErrorDialog);
app.component("user-form", UserForm);
app.component("loading-wheel", LoadingWheel);
app.component("select-date-message", SelectDateMessage);

app.use(store);
app.use(router);

app.mount("#app");
