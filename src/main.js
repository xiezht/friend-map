import { createApp } from 'vue'
import { initVantUi } from './common/util/vant';
import App from './App.vue'

import './common/scss/reset.scss';
import './common/scss/custom-map.scss';
const app = createApp(App);

app.mount('#app')

initVantUi(app);
