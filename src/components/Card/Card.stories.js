import Card from './Card.vue';

export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    content: {
      control: {
        type: 'text',
      },
      defaultValue: 'I am a card.',
    }
  },
};

const Template = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  components: { Card },
  template: '<card v-bind="$props" v-slot:content></card>',
});

export const Primary = Template.bind({});
Primary.args = {
  content: 'I am a card.'
}
