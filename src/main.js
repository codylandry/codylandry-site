import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Amplify, { Auth } from 'aws-amplify'
import awsmobile from './aws-exports'
import { hooks } from 'vue-hooks'
import './stylus/main.styl'

Amplify.configure(awsmobile)
Vue.config.productionTip = false

Vue.use(hooks)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
