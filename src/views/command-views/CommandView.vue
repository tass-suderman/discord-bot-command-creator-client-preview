<template>
  <div>
    <CommandSearchBar/>
    <b-card>
      <b-card-header class="d-flex w-100 justify-content-between">
        <b-btn variant="primary" class="m-2" @click="$router.push('/')"><b-icon-house/> Return to Home</b-btn>
        <h2>Created Commands</h2>
        <b-btn variant="success" class="m-2" @click="$router.push($store.state.CREATE_COMMAND_PATH)"><b-icon-plus-circle-fill/> Create Command</b-btn>
      </b-card-header>
      <b-card-body>
        <CommandList class="w-100"/>
      </b-card-body>
    </b-card>

  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import CommandList from '@/components/command-components/CommandList.vue';
import CommandForm from '@/components/command-components/CommandForm.vue';
import CommandSearchBar from '@/components/command-components/CommandSearchBar.vue';

/**
 * Command View
 * Nice overview of created commands.
 */
@Component({
  components: {
    CommandSearchBar,
    CommandList,
    CommandForm,
    components: { CommandList, CommandForm },
  },
})
export default class CommandView extends Vue {

}

</script>
