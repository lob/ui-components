
<script>
import { h } from 'vue';
export default {
  name: 'TableHeader',
  render () {
    const index = this.$slots
      .default();
    const children = [];
    for (let i = 0; i < index.length; ++i) {
      children.push(index[i].children);
    }
    const columns = children
      .flat()
      .map((slotItem) => h('td', [slotItem]));
    const tr = h('tr', columns);
    return h('thead', tr);
  }
};
</script>
