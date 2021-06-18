<script>
import Typography from './Typography';

export const H1 = {
  name: 'H1',
  components: {
    Typography
  },
  template: '<Typography variant="heading1"><slot /></Typography>'
};

export const H2 = {
  name: 'H2',
  components: {
    Typography
  },
  template: '<Typography variant="heading2"><slot /></Typography>'
};

export const H3 = {
  name: 'H3',
  components: {
    Typography
  },
  template: '<Typography variant="heading3"><slot /></Typography>'
};

export const P = {
  name: 'P',
  components: {
    Typography
  },
  template: '<Typography variant="body1"><slot /></Typography>'
};

export const Caption = {
  name: 'Caption',
  components: {
    Typography
  },
  template: '<Typography variant="caption"><slot /></Typography>'
};
</script>
