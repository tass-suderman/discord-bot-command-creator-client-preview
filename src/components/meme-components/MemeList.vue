<template>
  <b-btn-group>
    <div v-if="!$store.state.memes.length" class="w-100 col-12 row">
      <b-card class="w-100">
        <b-card-header class="text-center"><h1>No Memes Yet</h1></b-card-header>
        <b-card-body class="text-center"><h2>You could change that</h2></b-card-body></b-card></div>
    <div class="row w-100">
      <MemePreview class="col-lg-6 col-md-10" :meme="meme" :select-meme-view="selectMemeView" acc-data="memeList"
                   @selectMeme="$emit('selectMeme',meme)" @viewMeme="viewMeme"
                   v-for="meme in $store.state.memes" :key="meme.memeID"></MemePreview>
    </div>

  </b-btn-group>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CreatorCard from '@/components/registered-user-components/CreatorCard.vue';
import MemePreview from '@/components/meme-components/MemePreview.vue';

/**
 * Component which lists all memes.
 */
@Component({
  components: { MemePreview, CreatorCard },
})
export default class MemeList extends Vue {
  @Prop()readonly selectMemeView!: boolean

  viewMeme(memeID:number) {
    this.$router.push(`${this.$store.state.VIEW_MEME_PATH}/${memeID}`);
  }
}
</script>
