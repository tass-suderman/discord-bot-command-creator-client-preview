<template>
  <b-btn-group>
    <div v-if="!$store.state.commands.length" class="w-100 col-12 row">
      <b-card class="w-100">
        <b-card-header class="text-center"><h1>No Commands Yet</h1></b-card-header>
        <b-card-body class="text-center"><h2>You could change that</h2></b-card-body></b-card></div>
    <div class="row w-100" v-if="NotLoading">
      <CommandPreview :command="command" @viewCommand="viewCommand" @editCommand="editCommand" @deleteConfirm="deleteConfirm"
                      v-for="command in $store.state.commands" :key="command.commandID"/>
      <b-modal title="Delete Command" ok-variant="danger" cancel-variant="primary"
               v-model="showConfirmDelete" @ok="deleteCommand(commandToDelete)">
        <template #modal-cancel>
          <b-icon-x-square-fill /> Cancel
        </template>

        <template #modal-ok>
          <b-icon-trash-fill /> Delete
        </template>
        Are you sure you want to delete <strong>{{commandToDelete.cName}}</strong>?
      </b-modal>
    </div>
    <b-card v-else>
      <b-spinner variant="primary" label="Waiting for Data"></b-spinner>
    </b-card>
  </b-btn-group>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Command from '@/models/Command';
import CommandPreview from '@/components/command-components/CommandPreview.vue';

/**
 * CommandList component. Holds an overview of all commands
 */
@Component({
  components: { CommandPreview },
})
export default class CommandList extends Vue {
  showConfirmDelete = false;

  commandToDelete = new Command();

  NotLoading = true;

  deleteConfirm(command:Command) {
    this.commandToDelete = command;
    this.showConfirmDelete = true;
  }

  async deleteCommand(command:Command) {
    await this.$store.dispatch('deleteCommandFromAPI', { command });
    if (this.$store.state.bigBadOopsie.length) {
      window.alert(this.$store.state.bigBadOopsie);
    }
    await this.$store.commit('setOopsie', '');
    await this.$store.dispatch('getCommandsFromAPI');
    await this.$forceUpdate();
  }

  editCommand(commandID: number) {
    this.$router.push(`${this.$store.state.EDIT_COMMAND_PATH}/${commandID}`);
  }

  viewCommand(commandID:number) {
    this.$router.push(`${this.$store.state.VIEW_COMMAND_PATH}/${commandID}`);
  }
}
</script>
