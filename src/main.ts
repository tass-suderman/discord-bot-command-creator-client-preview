import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueRouter from 'vue-router';
import 'bootswatch/dist/sketchy/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueCookies from 'vue-cookies';
import App from './App.vue';
import routeBuilder from './router';
import store from './store';

Vue.config.productionTip = false;

const DISCORD_API = 'https://discord.com/api/v9/users/@me';
const DISCORD_PARAMS = ['token_type', 'access_token', 'expires_in'];
const COOKIE_STARTING_DURATION = '30m';

Vue.use(BootstrapVue);
Vue.use(VueCookies, { expires: COOKIE_STARTING_DURATION });
Vue.use(IconsPlugin);
Vue.use(VueRouter);

const routes = routeBuilder(store);

const router = new VueRouter({ routes });

// https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
router.beforeEach(async (to, from, next) => {
  store.commit('setSessionUser', {
    uID: '000000000000000000',
    userName: 'demo-user',
    sessionToken: '000',
    tokenType: 'No Token',
    tokenExpiry: new Date(new Date().getTime() + 1000000000),
  });
  next();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
