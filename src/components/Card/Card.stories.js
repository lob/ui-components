import Card from './Card.vue';

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: `Cards are a flexible component used to display content in a variety of contexts.
          <br />
          Please note: though you can only insert text into this demo, the card component will accept any valid HTML or Vue component.
        `
      }
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
