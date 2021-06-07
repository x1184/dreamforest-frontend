import { createStore } from 'vuex'
import * as modules from './modules'

const store = createStore({
  modules
})

export default store
