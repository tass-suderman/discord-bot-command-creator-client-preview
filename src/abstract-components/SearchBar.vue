<script lang="ts">
import {
  Prop, Vue,
} from 'vue-property-decorator';

export default abstract class SearchBar extends Vue {
  @Prop({ default: 3 }) readonly minSearchLength!:number;

  query = '';

  hasFocus = false;

  get showList():boolean {
    return this.query.length >= this.minSearchLength && this.hasFocus;
  }
}
</script>
