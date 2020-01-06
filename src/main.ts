import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';

import BootstrapVue from 'bootstrap-vue';
// @ts-ignore
import VueChatScroll from 'vue-chat-scroll';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueChatScroll);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
