import { createApp } from 'vue'
import Vant from 'vant'

import 'animate.css'
import 'vant/lib/index.css'

import router from './routers'
import store from './store'

import App from './App.vue'
import './utils/rem'

createApp(App)
  .use(Vant)
  .use(router)
  .use(store)
  .mount('#app')
