<template>
  <div>
    <MemeForm :meme-i-d="parseInt($router.currentRoute.params.memeID,10)" meme-form-type="Edit"></MemeForm>

  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import MemeForm from '@/components/meme-components/MemeForm.vue';

/**
 * Meme Edit page
 */
@Component({
  components: { MemeForm },
})
export default class EditMemeView extends Vue {
}
</script>
