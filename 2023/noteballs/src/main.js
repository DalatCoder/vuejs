import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./routers";

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount("#app");
