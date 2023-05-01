<template>
  <div>
    <b-card>
      <b-btn variant="primary" class="m-2" @click="$router.push('/')"><b-icon-house/> Return to Home</b-btn>
      <b-card-header>
        <h2 class="text-center">Tags</h2>
      </b-card-header>
      <b-card-body>
        <TagList/>
      </b-card-body>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TagList from '@/components/tag-components/TagList.vue';

/**
 * Full Tag view page
 */
@Component({
  components: { TagList },
})
export default class TagView extends Vue {

}
</script>
