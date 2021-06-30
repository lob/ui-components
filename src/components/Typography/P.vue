<script>
import { h } from 'vue';
import Typography from './Typography';

export default {
  name: 'P',
  components: {
    Typography
  },
  render () {
    return h(Typography, { variant: 'body1' }, { default: this.$slots.default });
  }
};

</script>

