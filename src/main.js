import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { hooks } from 'vue-hooks'
import './stylus/main.styl'

Vue.config.productionTip = false

Vue.use(hooks)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
