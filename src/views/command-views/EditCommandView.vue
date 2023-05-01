<template>
  <div>
    <CommandForm :command-i-d="parseInt($router.currentRoute.params.commandID,10)" command-form-type="Edit"/>

  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import CommandForm from '@/components/command-components/CommandForm.vue';

/**
 * Edit Command View. Pretty much what you expect
 */
@Component({
  components: { CommandForm },
})
export default class EditMemeView extends Vue {}
</script>
