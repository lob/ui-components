import Card from './Card.vue';
import mdx from './Card.mdx';

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    content: {
      control: {
        type: 'text',
      },
      defaultValue: 'I am a card.',
      description: 'Content to display inside of the card',
      table: {
        type: {
          summary: 'html or component'
        }
      }
    }
  },
};

const Template = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  components: { Card },
  template: '<card v-slot:content>{{ content }}</card>',
});

export const Primary = Template.bind({});
Primary.args = {
  content: 'I am a card.'
}
