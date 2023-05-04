<template>
  <b-card><b-btn variant="primary" @click="$router.push($store.state.MEMES_PATH)"><b-icon-arrow-left/>Go Back</b-btn>
    <b-card-title><h2 class="text-center">{{ memeFormType }} Meme</h2></b-card-title>
    <b-card-body>
      <b-form-group class="row justify-content-center">
        <div class="d-flex flex-md-row flex-sm-column flex-nowrap">
          <div class="col-md-6 d-block">
            <div v-if="validationErr.mDescription">
              <b-input-group class="invalid-feedback input-group-text mb-4">
                <b-textarea v-if="memeFormType==='Create' || memeFormType==='Edit'" class=" text-start" maxlength="512" v-model="potentialMeme.mDescription"></b-textarea>
                <b-textarea v-else disabled class=" text-start" maxlength="512" v-model="potentialMeme.mDescription"></b-textarea>
                <b-input-group-append class="flex-column justify-content-end">
                  <b-icon-chat-dots-fill shift-h="7"/>
                  Description
                </b-input-group-append>
              </b-input-group>
              <b-form-invalid-feedback class="d-block">{{validationErr.mDescription}}</b-form-invalid-feedback>
            </div>
            <b-input-group v-else class="input-group-text mb-4">
              <b-textarea v-if="memeFormType==='Create' || memeFormType==='Edit'" class=" text-start" maxlength="512" v-model="potentialMeme.mDescription"></b-textarea>
              <b-textarea v-else disabled class=" text-start" maxlength="512" v-model="potentialMeme.mDescription"></b-textarea>
              <b-input-group-append class="flex-column justify-content-end">
                <b-icon-chat-dots-fill shift-h="7"/>
                Description
              </b-input-group-append>
            </b-input-group>
            <b-card class="w-100 input-group-text">
              <div v-if="validationErr.mImageRoute">
                <b-input-group>
                  <b-card-header class="w-100">
                    <b-input-group-prepend>
                      <b-icon-image/>
                      Image Route
                    </b-input-group-prepend>
                    <b-form-input v-if="memeFormType==='Create' || memeFormType==='Edit'" v-model="potentialMeme.mImageRoute"/>
                    <b-form-input v-else disabled v-model="potentialMeme.mImageRoute"></b-form-input>
                  </b-card-header>
                  <b-card img-top="img-top" class="w-100" img-alt="Your image here" :img-src="potentialMeme.mImageRoute"/>
                </b-input-group>
                <b-form-invalid-feedback class="d-block">{{validationErr.mImageRoute}}</b-form-invalid-feedback>
              </div>
              <b-input-group v-else>
                <b-card-header class="bg-transparent border-bottom-0 row w-100">
                  <b-input-group-prepend>
                    <b-icon-image/>
                    Image Route
                  </b-input-group-prepend>
                  <b-form-input v-if="memeFormType==='Create' || memeFormType==='Edit'" v-model="potentialMeme.mImageRoute"/>
                  <b-form-input v-else disabled v-model="potentialMeme.mImageRoute"></b-form-input>
                </b-card-header>
                <b-card img-top="img-top" class="w-100" img-alt="Your image here" :img-src="potentialMeme.mImageRoute"/>
              </b-input-group>
            </b-card>
          </div>
          <div class="col-md-6 d-block">
            <div v-if="validationErr.tags">
              <div class="invalid-feedback" v-if="memeFormType==='Create' || memeFormType==='Edit'">
                <TagPool @tagchange="updateTags" :key="iWasInThePoolJerry" :meme-tags="memeStartingTags"/>
              </div>
              <b-form-invalid-feedback class="d-block">{{validationErr.tags}}</b-form-invalid-feedback>
            </div>
            <div v-else-if="memeFormType==='Create' || memeFormType==='Edit'">
              <TagPool @tagchange="updateTags" :key="iWasInThePoolJerry" :meme-tags="memeStartingTags"/>
            </div>
            <div v-else>
              <TagPool view-only="view-only" :meme-tags="memeStartingTags"/>
            </div>
          </div>
        </div>
        <b-btn-group v-if="memeFormType==='Create' || memeFormType==='Edit'">
          <b-btn disabled variant="success" ><b-icon-save-fill/> Save Meme</b-btn>
          <b-btn @click="clearMeme" v-if="memeFormType==='Create'" variant="danger"> <b-icon-x-circle/> Clear Meme</b-btn>
        </b-btn-group>
        <p><b>Note:</b> Saving and editing memes is disabled in the preview version of the software</p>

      </b-form-group>

    </b-card-body>
  </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Meme from '@/models/Meme';
import TagPool from '@/components/tag-components/TagPool.vue';
import Tag from '@/models/Tag';
import { IsOptional } from 'class-validator';

/**
 * Meme Form component. reused in several views as a detailed view of a meme
 */
@Component({
  components: { TagPool },
  async created() {
    if (this.$props.memeID) {
      await this.$store.dispatch('getOneMemeFromAPI', { memeID: this.$props.memeID });
      this.$data.potentialMeme = this.$store.state.currentMeme;
      this.$data.memeStartingTags = Object.assign([], this.$store.state.currentMeme.tags);
    }
  },
})
export default class MemeForm extends Vue {
  @Prop()
  memeFormType!: string;

  @Prop()
  @IsOptional()
  memeID!: number;

  potentialMeme: Meme = new Meme();

  memeStartingTags: Tag[] =[]

  validationErr: any = {};

  iWasInThePoolJerry=0;

  updateTags(addedTags: Tag[]) {
    this.potentialMeme.tags = addedTags;
  }

  clearMeme() {
    this.potentialMeme = new Meme();
    this.iWasInThePoolJerry += 1;
    this.$forceUpdate();
  }
}
</script>
