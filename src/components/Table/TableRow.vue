<script>
import { h } from 'vue';
export default {
  name: 'TableRow',
  render () {
    const defaultSlot = this.$slots.default();
    const isNestedSlot = defaultSlot[0].type === 'template' || defaultSlot[0].type.toString() === 'Symbol(Fragment)';

    let rows;
    if (isNestedSlot) {
      rows = defaultSlot.flatMap((slotItem) => slotItem.children).map((child) => h('td', child));
    } else {
      rows = defaultSlot.map((slotItem) => h('td', slotItem));
    }

    return h('tr', this.$attrs, rows);
  }
};
</script>
