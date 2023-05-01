<template>
  <div>
    <CommandForm command-form-type="Create"/>

  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import MemeForm from '@/components/meme-components/MemeForm.vue';
import CommandForm from '@/components/command-components/CommandForm.vue';

/**
 * Create Command View. Pretty much what you expect
 */
@Component({
  components: { CommandForm, MemeForm },
})
export default class CreateCommandView extends Vue {
}
</script>
