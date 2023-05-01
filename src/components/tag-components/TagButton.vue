<template>
  <b-button class="m-2" :variant="tagVar" @click="$emit('moveevent', tag)" >{{tag.tagName}}</b-button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Tag from '@/models/Tag';

/**
 * Button which contains tag objects. Used in the pool
 */
@Component
export default class TagButton extends Vue {
  @Prop() readonly tag!: Tag;

  @Prop() readonly tagVar!: string;
}
</script>
