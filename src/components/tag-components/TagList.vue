<template>
  <b-btn-group class="row container-fluid justify-content-evenly w-100">
    <div v-if="!$store.state.tags.length" class="w-100 col-12 row">
      <b-card class="w-100">
        <b-card-header class="text-center"><h1>No Tags Yet</h1></b-card-header>
        <b-card-body class="text-center"><h2>You could change that</h2></b-card-body></b-card></div>
    <b-list-group-item class="flex-column w-100" v-for="tag in $store.state.tags" :key="tag.tagName" >
      <b-btn class="row text-center w-100" v-b-toggle="['c'+tag.tagName]"
             @click="getTagMemes(tag.tagName)">
        {{tag.tagName}}

      </b-btn>

      <b-collapse :id="'c'+tag.tagName">
        <h5 class="text-center">Memes tagged with {{tag.tagName}}</h5>
        <b-row wrap="wrap">
          <b-card class="col-lg-6 col-md-12" v-for="meme in tag.memes" :key="meme.memeID">
            <MemePreview :meme="meme" force-open="force-open"
                         select-meme-view="view" view-meme="viewMeme"/>
          </b-card>
        </b-row>

      </b-collapse>

    </b-list-group-item>
  </b-btn-group>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MemePreview from '@/components/meme-components/MemePreview.vue';

/**
 * List of all tags which holds all memes that the tag is associated with.
 * Each tag can be expanded to see all memes inside.
 */
@Component({
  components: { MemePreview },
})

export default class TagList extends Vue {
  async getTagMemes(tagName: string) {
    await this.$store.dispatch('getTagMemesFromAPI', { tagName });
    this.$forceUpdate();
  }
}
</script>
