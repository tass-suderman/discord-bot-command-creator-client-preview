<template>
  <div>
    <b-card title="Creator Info" class="w-100 mb-2">
      <b-card-text><b-icon icon="discord"/> Creator ID: {{ creator.uID }}</b-card-text>
      <b-card-text><b-icon icon="person-badge-fill"/> Creator Name: {{ creator.userName }}</b-card-text>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import RegisteredUser from '@/models/RegisteredUser';

/**
 * Just a nice little card that shows the RegisteredUser associated with the meme/command
 */
@Component
export default class CreatorCard extends Vue {
  @Prop() readonly creator!: RegisteredUser;
}
</script>
