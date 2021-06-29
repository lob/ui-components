<script>
import { h } from 'vue';
export default {
  name: 'TableRow',
  render () {
    const index = this.$slots
      .default()
    const children = []
    for(var i = 0; i < index.length; ++i){
      children.push(index[i].children)
    }
    const rows = children
      .flat()
      .map((slotItem) => h('td', [slotItem]));
    return h('tr', rows);
  }
};
</script>
