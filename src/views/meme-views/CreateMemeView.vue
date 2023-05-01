<template>
  <div>
    <MemeForm meme-form-type="Create" @saveMeme="memeCreated" />

  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import MemeForm from '@/components/meme-components/MemeForm.vue';

/**
 * Create Meme View
 */
@Component({
  components: { MemeForm },
})
export default class CreateMemeView extends Vue {
  memeCreated() {
    this.$router.push(this.$store.state.MEMES_PATH);
  }
}
</script>
