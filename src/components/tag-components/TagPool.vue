<template>
  <b-card>
    <b-card-header v-if="!viewOnly" class="btn-group w-100">
      <b-input-group>
        <b-input-group-prepend is-text>
          <b-icon icon="tag-fill" />
        </b-input-group-prepend>
        <b-form-input maxlength="12" v-model="newTagValue"/>
        <b-input-group-append>
          <b-button variant="success" @click="addTag">Add Tag</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-card-header>

    <b-toast title="Invalid Tag" variant="danger" static id="tag-trickery">Tags must be 1-12 alphanumeric characters and must be unique</b-toast>
    <b-card-body>
      <b-card-header>Added Tags</b-card-header>
      <b-media v-if="viewOnly" class="p-3">
        <TagButton v-for="tag in addedTags" disabled tag-var="success" :tag="tag" :key="tag.tagName"/>
      </b-media>
      <b-media v-else class="p-3">
        <TagButton v-for="tag in addedTags" tag-var="success" @moveevent="deselectTag(tag)" :tag="tag" :key="tag.tagName"/>
      </b-media>
      <div v-if="!viewOnly">
        <b-card-header>Other Tags</b-card-header>
        <b-media class="p-3">
          <TagButton v-for="tag in tagsInPool" tag-var="primary" @moveevent="selectTag(tag)" :tag="tag" :key="tag.tagName"/>
        </b-media>
      </div>

    </b-card-body>
  </b-card>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import TagButton from '@/components/tag-components/TagButton.vue';
import { isAlphanumeric } from 'class-validator';
import Tag from '@/models/Tag';

/**
 * Cool custom component that i totally could not have just done by reading the documentation, thank you very much
 */
@Component({
  components: { TagButton },
})
export default class TagPool extends Vue {
  @Prop()
  memeTags!: Tag[];

  @Prop()
  viewOnly!: boolean;

  addedTags: Tag[] = [];

  tagsInPool: Tag[] = Object.assign([], this.$store.state.tags);

  newTagValue = '';

  addTag() {
    this.newTagValue = this.newTagValue.toLowerCase();
    if ((!this.addedTags.map((x) => x.tagName).includes(this.newTagValue)
      && (!this.tagsInPool.map((x) => x.tagName).includes(this.newTagValue)))
      && this.newTagValue.length <= 12
      && isAlphanumeric(this.newTagValue)) {
      this.addedTags.push(Object.assign(new Tag(), { tagName: this.newTagValue }));
      this.newTagValue = '';
      this.$emit('tagchange', this.addedTags);
    } else if ((this.tagsInPool.map((x) => x.tagName).includes(this.newTagValue))) {
      this.addedTags.push(Object.assign(new Tag(), { tagName: this.newTagValue }));
      const tagInd = this.tagsInPool.findIndex((x) => x.tagName === this.newTagValue);
      if (tagInd > -1) this.tagsInPool.splice(tagInd, 1);
      this.$emit('tagchange', this.addedTags);
      this.newTagValue = '';
    } else {
      this.$bvToast.show('tag-trickery');
    }
  }

  //
  @Watch('memeTags', { deep: true })
  async onTagChange(newArr: Tag[], oldArr: Tag[]) {
    await this.memeTags.forEach((x) => {
      this.selectTag(x);
    });
  }

  selectTag = (tag: Tag) => {
    this.addedTags.push(tag);
    const tagInd = this.tagsInPool.map((x) => x.tagName).indexOf(tag.tagName);
    if (tagInd > -1) this.tagsInPool.splice(tagInd, 1);
    this.$emit('tagchange', this.addedTags);
  };

  deselectTag = (tag: Tag) => {
    this.tagsInPool.push(tag);
    const tagInd = this.addedTags.indexOf(tag);
    if (tagInd > -1) this.addedTags.splice(tagInd, 1);
    this.$emit('tagchange', this.addedTags);
  };
}
</script>
