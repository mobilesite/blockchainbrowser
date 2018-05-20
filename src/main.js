import Vue from 'vue'
import VueExtension from './plugins/vueExtension';
import App from './App.vue'

Vue.use(VueExtension);

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
