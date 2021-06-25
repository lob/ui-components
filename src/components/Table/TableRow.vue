<script>
import { h } from 'vue';
export default {
  name: 'TableRow',
  props: {

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
