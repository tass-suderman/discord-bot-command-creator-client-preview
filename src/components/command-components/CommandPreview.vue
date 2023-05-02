<template>

  <b-list-group-item class="col-lg-6 col-md-12">
    <b-btn class="text-center w-100" v-b-toggle="['c'+command.commandID]">
      {{command.cName}}

    </b-btn>
    <b-collapse class="text-center" :id="'c'+command.commandID">
      <h5>Command # {{command.commandID}}</h5>
      <b-card class="text-dark">
        <b-card-header class="text-dark"><b-card-text> {{command.cText}}</b-card-text></b-card-header>
        <b-card-body>
          <MemePreview class="text-dark" hide-creator="hide-creator" force-open="force-open" :meme="command.meme"/>
        </b-card-body>
        <b-card-footer><b-card-text>Command brought to you by:</b-card-text>
          <CreatorCard :creator="command.cCreator"></CreatorCard>
          <b-btn-group v-if="command.cCreator.uID===$store.state.sessionUser.uID">
            <b-btn disabled class="" variant="primary" @click="$emit('editCommand',command.commandID)">Edit command</b-btn>
            <b-btn disabled class="btn-link" variant="danger" @click="$emit('deleteConfirm',command)">Delete command</b-btn>
          </b-btn-group>
          <b-btn-group v-else>
            <b-btn class="" variant="primary" @click="$emit('viewCommand',command.commandID)">View command</b-btn>
          </b-btn-group>
        </b-card-footer>
      </b-card>
    </b-collapse>
  </b-list-group-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CreatorCard from '@/components/registered-user-components/CreatorCard.vue';
import Command from '@/models/Command';
import MemePreview from '@/components/meme-components/MemePreview.vue';

/**
 * Command Preview component. Gives a small look at what is in a command. Featured prominently in the command list component
 */
@Component({ components: { MemePreview, CreatorCard } })
export default class commandPreview extends Vue {
  @Prop() readonly command!: Command
}
</script>
