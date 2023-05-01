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
  if (to.path.startsWith(`/${DISCORD_PARAMS[0]}`)) {
    const params = new URLSearchParams(to.path.substring(1));
    const tokenType = params.get(DISCORD_PARAMS[0]);
    const accessToken = params.get(DISCORD_PARAMS[1]);
    const expiryRes = params.get(DISCORD_PARAMS[2]);
    const expiry = expiryRes ? parseInt(expiryRes, 10) : 0;
    const discordRes = await fetch(DISCORD_API, { headers: { authorization: `${tokenType} ${accessToken}` } });
    const discordUser = await discordRes.json();
    if (discordUser.id) {
      store.commit('setSessionUser', {
        uID: discordUser.id,
        userName: discordUser.username,
        sessionToken: accessToken,
        tokenType,
        tokenExpiry: new Date(new Date().getTime() + expiry * 1000),
      });
      next('/');
    }
  } else if ((!store.state.sessionUser.sessionToken || store.state.sessionUser.tokenExpiry < new Date()) && to.name !== 'Login') {
    const cookie = Vue.$cookies.get('sessionUser');
    if (cookie?.accessToken && cookie.tokenType && cookie.tokenExpiry) {
      const discordRes = await fetch(DISCORD_API, { headers: { authorization: `${cookie.tokenType} ${cookie.accessToken}` } });
      const discordUser = await discordRes.json();
      if (discordUser.id) {
        store.commit('setSessionUser', {
          uID: discordUser.id,
          userName: discordUser.username,
          sessionToken: cookie.accessToken,
          tokenType: cookie.tokenType,
          tokenExpiry: new Date(cookie.tokenExpiry),
        });
        next('/');
      } else {
        Vue.$cookies.remove('sessionUser');
        next({ name: 'Login' });
      }
    } else {
      next({ name: 'Login' });
    }
  }
  next();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
