<template>
  <div>
    <b-input-group>
      <b-input-group-prepend v-b-tooltip.hover.right="'Search For Memes...'" is-text>
        <b-icon-search variant="info" />
      </b-input-group-prepend>
      <b-input disabled type="search" placeholder="Searching is disabled in the preview version of the software" class="bg-light text-info"
               v-model="query" @focus="hasFocus=true;" @blur="hasFocus=false" />
    </b-input-group>

  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import SearchBar from '@/abstract-components/SearchBar.vue';

/**
 * Search bar made for meme objects
 */
@Component
export default class MemeSearchBar extends SearchBar {
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
