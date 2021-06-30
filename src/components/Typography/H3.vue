<script>
import { h } from 'vue';
import Typography from './Typography';

export default {
  name: 'H3',
  components: {
    Typography
  },
  render () {
    return h(Typography, { variant: 'heading3' }, { default: this.$slots.default });
  }
};

</script>

