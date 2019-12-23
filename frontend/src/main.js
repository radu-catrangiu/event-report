import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router';
import EventBus from '@/EventBus';
import $ from 'jquery';
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

Vue.config.productionTip = false

Vue.prototype.$EventBus = EventBus;
Vue.prototype.$ = $;
Vue.prototype.$api = axios.create({
  baseURL: "http://localhost:8081/"
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
