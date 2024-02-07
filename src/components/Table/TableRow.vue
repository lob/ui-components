<script>
import { h } from 'vue';
export default {
  name: 'TableRow',
  props: {
    singleCellRow: {
      type: Boolean,
      default: false
    }
  },
  render() {
    const defaultSlot = this.$slots.default();
    const isNestedSlot =
      defaultSlot[0].type === 'template' ||
      defaultSlot[0].type.toString() === 'Symbol(Fragment)' ||
      defaultSlot[0].type.toString() === 'Symbol(v-fgt)' ||
      defaultSlot[0].type.toString() === 'Symbol()';

    let items;
    if (isNestedSlot) {
      items = defaultSlot.flatMap((slotItem) => slotItem.children);
    } else {
      items = defaultSlot;
    }

    let cells;
    if (this.singleCellRow) {
      cells = h('td', { colspan: '100%' }, items);
    } else {
      cells = items.map((item) => h('td', item));
    }

    return h('tr', this.$attrs, cells);
  }
};
</script>
