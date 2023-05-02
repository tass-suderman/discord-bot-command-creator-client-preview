<template>
  <div>
    <b-list-group-item v-if="forceOpen" class="text-center">
      <b-card>
        <b-card-body>
          <b-card-img-lazy class="card-img" :src="meme.mImageRoute" :alt="meme.mDescription">
          </b-card-img-lazy>
          <b-card-text> {{meme.mDescription}}</b-card-text>
        </b-card-body>
        <b-card-footer v-if="!hideCreator">
          <b-card-text>Meme brought to you by:</b-card-text>
          <CreatorCard :creator="meme.mCreator"></CreatorCard>
        </b-card-footer>
      </b-card>
    </b-list-group-item>

    <b-list-group-item v-else class="text-center">
      <b-btn class="text-center w-100" v-b-toggle="['c'+meme.memeID+accData]">
        {{meme.mDescription}}
      </b-btn>
      <b-collapse :id="'c'+meme.memeID+accData">
        <h5>Meme # {{meme.memeID}}</h5>
        <b-card>
          <b-card-body>
            <b-card-img-lazy class="card-img" :src="meme.mImageRoute" :alt="meme.mDescription">
            </b-card-img-lazy>
            <b-card-text> {{meme.mDescription}}</b-card-text>
          </b-card-body>
          <b-card-footer>
            <b-card-text>Meme brought to you by:</b-card-text>
            <CreatorCard :creator="meme.mCreator"></CreatorCard>
            <b-btn-group v-if="selectMemeView">
              <b-btn class="btn" variant="success" @click="$emit('selectMeme',meme)"><b-icon-arrow-up-short/>Select Meme</b-btn>
            </b-btn-group>

            <b-btn-group v-else-if="meme.mCreator.uID===$store.state.sessionUser.uID">
              <b-btn class="" disabled variant="primary" @click="$emit('editMeme',meme.memeID)">Edit Meme</b-btn>
              <b-btn class="btn-link" disabled variant="danger" @click="$emit('deleteConfirm',meme)">Delete Meme</b-btn>
            </b-btn-group>

            <b-btn-group v-else>
              <b-btn class="" variant="primary" @click="$emit('viewMeme',meme.memeID)">View Meme</b-btn>
            </b-btn-group>

          </b-card-footer>
        </b-card>
      </b-collapse>
    </b-list-group-item>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import CreatorCard from '@/components/registered-user-components/CreatorCard.vue';
import MemeForm from '@/components/meme-components/MemeForm.vue';
import Meme from '@/models/Meme';

/**
 * Meme Preview component. Small card with some meme information. Seen a lot in meme list and in command form
 */
@Component({ components: { MemeForm, CreatorCard } })
export default class MemePreview extends Vue {
  @Prop() readonly meme!: Meme;

  @Prop() readonly selectMemeView!: boolean;

  @Prop() readonly forceOpen!: boolean;

  @Prop() readonly accData!: string;

  @Prop() readonly hideCreator!: boolean;
}
</script>
