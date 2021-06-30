<script>
import { h } from 'vue';
import Typography from './Typography';

export default {
  name: 'H2',
  components: {
    Typography
  },
  render () {
    return h(Typography, { variant: 'heading2' }, { default: this.$slots.default });
  }
};

</script>

