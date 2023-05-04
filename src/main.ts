import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueRouter from 'vue-router';
import 'bootswatch/dist/sketchy/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from './App.vue';
import routeBuilder from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter);

const routes = routeBuilder(store);

const router = new VueRouter({ routes });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
