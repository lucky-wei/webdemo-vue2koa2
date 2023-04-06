import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.prototype.$http = Axios
Vue.use(ElementUI) //vue全局使用

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
