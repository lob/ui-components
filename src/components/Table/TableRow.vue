<script>
import { h } from 'vue';
export default {
  name: 'TableRow',
  render () {
    const rows = this.$slots
      .default()
      .map((slotItem) => h('td', [slotItem]));

    return h('tr', rows);
  }
};
</script>
