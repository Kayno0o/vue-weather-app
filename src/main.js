import { createApp } from "vue";
import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faDroplet,
  faWind,
  faTrash,
  faSync,
} from "@fortawesome/free-solid-svg-icons";
library.add(faDroplet, faWind, faTrash, faSync);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
