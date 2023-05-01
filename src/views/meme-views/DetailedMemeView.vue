<template>
  <div>
    <MemeForm :meme-i-d="parseInt($router.currentRoute.params.memeID,10)" meme-form-type="View"></MemeForm>

  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import MemeForm from '@/components/meme-components/MemeForm.vue';

/**
 * Meme View for detailed viewing
 */
@Component({
  components: { MemeForm },
})
export default class DetailedMemeView extends Vue {
}
</script>
