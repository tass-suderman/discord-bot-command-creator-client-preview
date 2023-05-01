<template>
  <div class="memes">

    <MemeSearchBar @selectMeme="selectSearchedMeme"/>
    <b-card>
      <b-card-header class="d-flex w-100 justify-content-between">
        <div>
          <b-btn variant="primary" @click="$router.push('/')"><b-icon-house/> Return to Home</b-btn>
        </div>
        <h1>Memes</h1>
        <div>
          <b-btn variant="success" @click="createMeme"><b-icon-emoji-laughing-fill/> Create Meme</b-btn>
        </div>
      </b-card-header>
      <b-card-body class="d-block w-100">
        <MemeList class="w-100"></MemeList>
      </b-card-body>
    </b-card>

    <b-modal title="Delete Meme" ok-variant="danger" cancel-variant="primary"
             v-model="showConfirmDelete" @ok="deleteMeme(memeThatCouldBeDeleted)">
      <template #modal-cancel>
        <b-icon-x-square-fill /> Cancel
      </template>

      <template #modal-ok>
        <b-icon-trash-fill /> Delete
      </template>
      Are you sure you want to delete <strong>{{memeThatCouldBeDeleted.mDescription}}</strong> ?
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Meme from '@/models/Meme';
import MemeList from '@/components/meme-components/MemeList.vue';
import MemeSearchBar from '@/components/meme-components/MemeSearchBar.vue';

/**
 * Full Meme View page
 */
@Component({
  components: { MemeSearchBar, MemeList },
})
export default class MemeView extends Vue {
  showConfirmDelete = false;

  memeThatCouldBeDeleted = new Meme();

  deleteConfirm(meme:Meme) {
    this.memeThatCouldBeDeleted = meme;
    this.showConfirmDelete = true;
  }

  async deleteMeme(meme:Meme) {
    await this.$store.dispatch('deleteMemeFromAPI', { meme });
    if (this.$store.state.bigBadOopsie.length) {
      await window.alert(this.$store.state.bigBadOopsie);
    }
    this.$store.commit('setOopsie', '');
  }

  createMeme(meme:Meme) {
    this.$router.push(this.$store.state.CREATE_MEME_PATH);
  }

  selectSearchedMeme(meme:Meme) {
    this.$router.push(`${this.$store.state.VIEW_MEME_PATH}/${meme.memeID}`);
  }
}
</script>
