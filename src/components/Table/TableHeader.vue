
<script>
import { h } from 'vue';
export default {
  name: 'TableHeader',
  render () {
    const columns = this.$slots
      .default()
      .map((slotItem) => h('td', [slotItem]));
    const tr = h('tr', columns);

    return h('thead', tr);
  }
};
</script>
