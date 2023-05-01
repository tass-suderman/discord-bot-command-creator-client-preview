<template>
  <div class="container vw-100 vh-100 text-center">
    <b-card class="w-100 h-100">
      <b-card-header>
        <b-card-title><h1>Not Logged In</h1></b-card-title>
        <b-card-body>
          <b-card-sub-title><h2>Please click the button below to Log In</h2></b-card-sub-title>
          <b-button><b-btn :href="$store.state.DISCORD_LOGIN">Vibe check</b-btn></b-button>
        </b-card-body>
      </b-card-header>
    </b-card>

  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

/**
 * Login page. Sends you off to discord. The worst place of all.
 * My buddy derek went there one time and he has NEVER been the same since.
 */
@Component
export default class LoginView extends Vue {

}
</script>
