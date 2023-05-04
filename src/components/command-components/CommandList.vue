<template>
  <b-btn-group>
    <div v-if="!$store.state.commands.length" class="w-100 col-12 row">
      <b-card class="w-100">
        <b-card-header class="text-center"><h1>No Commands Yet</h1></b-card-header>
        <b-card-body class="text-center"><h2>You could change that</h2></b-card-body></b-card></div>
    <div class="row w-100">
      <CommandPreview :command="command" @viewCommand="viewCommand" v-for="command in $store.state.commands" :key="command.commandID"/>
    </div>
  </b-btn-group>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CommandPreview from '@/components/command-components/CommandPreview.vue';

@Component({
  components: { CommandPreview },
})
export default class CommandList extends Vue {
  viewCommand(commandID:number) {
    this.$router.push(`${this.$store.state.VIEW_COMMAND_PATH}/${commandID}`);
  }
}
</script>
