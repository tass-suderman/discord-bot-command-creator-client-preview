<template>
  <b-card >

    <b-btn variant="primary" @click="$router.push($store.state.COMMANDS_PATH)">
      <b-icon-arrow-left />
      Go Back
    </b-btn>

    <b-card-header><h3 class="text-center">{{ commandFormType }} Command</h3></b-card-header>

    <b-card-body class="text-start">

      <div class="justify-content-center row w-100">

        <div class="w-100" v-if="validationErr.cName">
          <b-input-group class="invalid-feedback" size="md" prepend="Command Name">
            <b-form-input maxlength="25" v-model="potentialCommand.cName" />
          </b-input-group>
          <b-form-invalid-feedback class="d-block">{{ validationErr.cName }}</b-form-invalid-feedback>
        </div>

        <b-input-group v-else size="md" prepend="Command Name">
          <b-form-input maxlength="25" v-model="potentialCommand.cName" />
        </b-input-group>

        <div class="w-100" v-if="validationErr.cText">
          <b-input-group class="input-group-text invalid-feedback mt-5" size="lg">
            <b-input-group-prepend size="lg" class="pr-3">Command Text</b-input-group-prepend>
            <b-textarea type="" v-model="potentialCommand.cText" v-if="commandFormType==='Create' || commandFormType==='Edit'" maxlength="512"></b-textarea>
            <b-textarea type="text" v-model="potentialCommand.cText" v-else disabled class="text-start" maxlength="512"></b-textarea>
          </b-input-group>
          <b-form-invalid-feedback class="d-block">{{ validationErr.cText }}</b-form-invalid-feedback>
        </div>

        <b-input-group v-else class="input-group-text mt-5" size="lg">
          <b-input-group-prepend size="lg" class="pr-3">Command Text</b-input-group-prepend>
          <b-textarea type="" v-model="potentialCommand.cText" v-if="commandFormType==='Create' || commandFormType==='Edit'" maxlength="512"></b-textarea>
          <b-textarea type="text" v-model="potentialCommand.cText" v-else disabled class="text-start" maxlength="512"></b-textarea>
        </b-input-group>

        <div class="text-info w-100 text-start">
          <p v-if="commandFormType==='Create'||commandFormType==='Edit'">
            **To mention self, use $self. To include other mentions, use $mention 0-9 and A-F
          </p>
        </div>
        <b-card class="text-center justify-content-center">
          <b-card-header><h3>SelectedMeme</h3></b-card-header>
          <b-card-body>
            <b-input-group size="md" v-if="commandFormType==='Create' || commandFormType==='Edit'">

              <MemePreview select-meme-view="select-meme-view" class="w-100 align-self-center" :key="memeSelectKey" force-open="force-open" :meme="potentialCommand.meme" />

            </b-input-group>
            <b-input-group v-else>
              <MemePreview force-open="force-open" class="w-100 align-self-center" :meme="potentialCommand.meme"/>
            </b-input-group>
          </b-card-body>
          <b-card-footer v-if="commandFormType==='Create'||commandFormType==='Edit'">
            <b-btn v-b-toggle.memeOptions class="">View Memes</b-btn>
          </b-card-footer>
          <b-btn-group class="row mt-4 d-block" v-if="commandFormType==='Create' || commandFormType==='Edit'">

            <b-btn disabled class="m-3" variant="success">
              <b-icon-save-fill />
              Save Command
            </b-btn>
            <b-btn class="m-3" @click="clearCommand" v-if="commandFormType==='Create'" variant="danger">
              <b-icon-x-circle />
              Clear Command
            </b-btn>
            <b-btn disabled class="m-3" @click="deleteConfirm" v-if="commandFormType==='Edit'" variant="danger">
              <b-icon-x-circle />
              Delete Command
            </b-btn>
          </b-btn-group>

        </b-card>
      </div>
      <b-collapse id="memeOptions" class="mt-4">
        <MemePreview v-for="meme in $store.state.memes" @selectMeme="memeWasSelected" :key="meme.memeID" :meme="meme" select-meme-view="select-meme-view" />
      </b-collapse>

    </b-card-body>
  </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Command from '@/models/Command';
import { IsOptional, validate } from 'class-validator';
import Meme from '@/models/Meme';
import MemePreview from '@/components/meme-components/MemePreview.vue';
import { VBToggle } from 'bootstrap-vue';

@Component({
  components: { MemePreview },
  async created() {
    if (this.$props.commandID) {
      await this.$store.dispatch('getOneCommandFromAPI', { commandID: this.$props.commandID });
      this.$data.potentialCommand = this.$store.state.currentCommand;
    }
  },
})
export default class CommandForm extends Vue {
  @Prop()
  commandFormType!: string;

  @Prop()
  @IsOptional()
  commandID!: number;

  memeSelectKey = 0;

  potentialCommand: Command = new Command();

  selectedMeme: Meme = new Meme();

  validationErr: any = {};

  async clearCommand() {
    this.potentialCommand = new Command();
    this.selectedMeme = new Meme();
    this.memeSelectKey += 1;
    this.$forceUpdate();
  }

  memeWasSelected(meme: Meme) {
    this.potentialCommand.meme = meme;
    this.selectedMeme = meme;
    this.$root.$emit('bv::toggle::collapse', 'memeOptions');
  }
}

</script>
