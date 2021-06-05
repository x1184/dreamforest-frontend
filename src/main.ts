import { createApp } from 'vue'
import 'animate.css'

import router from './routers'

import App from './App.vue'
import './utils/rem'

const Vue = createApp(App)

Vue.use(router)

Vue.mount('#app')
