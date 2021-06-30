<script>
import { h } from 'vue';
import Typography from './Typography';

export default {
  name: 'H1',
  components: {
    Typography
  },
  render () {
    return h(Typography, { variant: 'heading1' }, { default: this.$slots.default });
  }
};

</script>

