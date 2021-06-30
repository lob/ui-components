<script>
import { h } from 'vue';
import Typography from './Typography';

export default {
  name: 'Caption',
  components: {
    Typography
  },
  render () {
    return h(Typography, { variant: 'caption' }, { default: this.$slots.default });
  }
};

</script>

