<template>
  <div class="home">
    <b-card class="w-100">
      <b-card-header class="text-center"><h1>Welcome to Discordissimo</h1></b-card-header>
      <b-card-body>
        <b-card-sub-title sub-title-text-variant="danger" class="text-center"><h3>Where are you headed?</h3></b-card-sub-title>
        <b-btn-group class="row justify-content-center w-100">
          <b-btn class="row w-75 m-3 p-4" @click="$router.push($store.state.MEMES_PATH)"><b-icon-emoji-laughing-fill/> <h3>Memes</h3></b-btn>
          <b-btn class="row w-75 m-3 p-4" @click="$router.push($store.state.COMMANDS_PATH)"><b-icon-command/><h3>Commands</h3></b-btn>
          <b-btn class="row w-75 m-3 p-4" @click="$router.push($store.state.TAGS_PATH)"><b-icon-tags-fill/>  <h3>Tags</h3></b-btn>
          <b-btn disabled variant="danger" class="w-50 m-5" ><b-icon-door-open-fill/><h3>Log Out</h3></b-btn>
        </b-btn-group>
      </b-card-body>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

/**
 * Home Page View
 */
@Component({
  components: {
  },
})
export default class HomeView extends Vue {
}
</script>
