<script>
import { h } from 'vue';
export default {
  name: 'TableHeader',
  render() {
    const defaultSlot = this.$slots.default();
    const isNestedSlot =
      defaultSlot[0].type === 'template' ||
      defaultSlot[0].type.toString() === 'Symbol(Fragment)' ||
      defaultSlot[0].type.toString() === 'Symbol()';

    let columns;
    if (isNestedSlot) {
      columns = defaultSlot
        .flatMap((slotItem) => slotItem.children)
        .map((child) => h('td', child));
    } else {
      columns = defaultSlot.map((slotItem) => h('td', slotItem));
    }
    const tr = h('tr', columns);
    return h('thead', this.$attrs, tr);
  }
};
</script>
