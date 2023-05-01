<script lang="ts">
import {
  Prop, Vue,
} from 'vue-property-decorator';

/**
 * Search bar abstract component. I liked how you did it in class and made sure my backend would work with it
 */
export default abstract class SearchBar extends Vue {
  @Prop({ default: 3 }) readonly minSearchLength!:number;

  query = '';

  hasFocus = false;

  get showList():boolean {
    return this.query.length >= this.minSearchLength && this.hasFocus;
  }
}
</script>
