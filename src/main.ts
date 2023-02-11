import { createApp } from "vue";

/* vue */
import App from "@/App.vue";
import store from "@/store";
import router from "@/router";

/* components */

//ui
import Container from "./components/ui/Container.vue";

//general
import Timetable from "@/components/select-date/Timetable.vue";
import SelectDateHeader from "@/components/select-date/SelectDateHeader.vue";
import ConsultantSelector from "@/components/select-time/ConsultantSelector.vue";
import SlotSelector from "@/components/select-time/SlotSelector.vue";
import FormField from "@/components/input-details/FormField.vue";
import ErrorDialog from "@/components/ErrorDialog.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";


const app = createApp(App);

// app.config.globalProperties.$api = apiService;
// app.config.globalProperties.$request = requestService;

app.component("container", Container);

app.component("timetable", Timetable);
app.component("select-date-header", SelectDateHeader);
app.component("error-dialog", ErrorDialog);
app.component("loading-spinner", LoadingSpinner);
app.component("consultant-selector", ConsultantSelector);
app.component("slot-selector", SlotSelector);
app.component("form-field", FormField);

app.use(store);
app.use(router);

app.mount("#app");
