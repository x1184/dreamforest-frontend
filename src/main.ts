import { createApp } from 'vue'
import 'animate.css'

import router from './routers'
import store from './store'

import App from './App.vue'
import './utils/rem'

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
