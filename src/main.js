import "vue-toastification/dist/index.css";
import "./styles/index.scss";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toast, { POSITION } from "vue-toastification";

const toastOptions = {
	containerClassName: "takeAMemo",
	transition: "Vue-Toastification__fade",
	maxToasts: 1,
	hideProgressBar: true,
	timeout: 1500,
	position: POSITION.BOTTOM_CENTER,
};

createApp(App).use(store).use(router).use(Toast, toastOptions).mount("#app");
