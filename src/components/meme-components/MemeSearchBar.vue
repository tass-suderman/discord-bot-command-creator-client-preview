<template>
  <div>
    <b-input-group>
      <b-input-group-prepend v-b-tooltip.hover.right="'Search For Memes...'" is-text>
        <b-icon-search variant="info" />
      </b-input-group-prepend>
      <b-input type="search" placeholder="Search" class="bg-light text-info"
               v-model="query" @focus="hasFocus=true;" @blur="hasFocus=false" />
    </b-input-group>

    <b-list-group class="shadow autocomplete-list" v-show="showList" @mousedown.prevent>
      <b-list-group-item v-if="$store.state.searchMemes.length === 0" variant="warning">
        No memes found matching {{query}}
      </b-list-group-item>
      <b-list-group-item v-else v-for="meme in $store.state.searchMemes" :key="meme.memeID" @click="$emit('selectMeme',meme)" button>
        <div class="row">
          <div class="col-4 col-lg-2">{{meme.memeID}}</div>
          <div class="col-lg-10">{{meme.mDescription}}</div>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import SearchBar from '@/abstract-components/SearchBar.vue';

/**
 * Search bar made for meme objects
 */
@Component
export default class MemeSearchBar extends SearchBar {
  @Watch('query')
  async onQueryChanged(newVal: string, oldVal: string): Promise<void> {
    if (!this.showList || newVal.length < oldVal.length) {
      return;
    }

    await this.$store.dispatch('getFilteredMemesFromAPI', { memeSearch: this.query });
  }
}
</script>

<style scoped>
.autocomplete-list {
  position: absolute;
  max-height: 22em;
  overflow-y: auto;
  z-index: 999;
  width: 50%
}
</style>
