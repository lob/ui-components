<script>
import { h } from 'vue';
export default {
  name: 'TableRow',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  computed: {

  },
  methods: {

  },
  render () {
    const rows = this.$slots
      .default()
      .map((slotItem) => h('td', [slotItem]));

    return h('tr', rows);
  }
};
</script>

<style scoped lang="scss">

</style>
