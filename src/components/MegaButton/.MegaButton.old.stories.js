import MegaButton from './MegaButton.vue';
import mdx from './MegaButton.mdx';

export default {
  title: 'Components/Mega Button',
  component: MegaButton,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    imageSource: {
      control: {
        type: 'text'
      },
      description: 'Start fresh with a new selection of audience data',
      table: {
        defaultValue: '',
        type: {
          summary: 'html or component'
        }
      }
    },
    title: {
      control: {
        type: 'text'
      },
      description: 'Start fresh with a new selection of audience data',
      table: {
        defaultValue: '',
        type: {
          summary: 'html or component'
        }
      }
    },
    content: {
      control: {
        type: 'text'
      },
      description: 'Start fresh with a new selection of audience data',
      table: {
        defaultValue: '',
        type: {
          summary: 'html or component'
        }
      }
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MegaButton },
  setup: () => ({ args }),
  template: `
  <MegaButton v-bind="args"> Catte<MegaButton />
  `
});

const MultipleTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MegaButton },
  setup: () => ({ args }),
  template: `
  <div class="flex flex-row"><MegaButton v-bind="args" title="Calico" /><MegaButton title="Ginger" /><MegaButton title="Void"/></div>
  `
});

export const LargeText = Template.bind({});
LargeText.args = {};

export const WithTitle = Template.bind({});
WithTitle.args = {
  title: 'Cat dispenser',
  content: 'Receive an adorable free kitten delivered right to your door'
};

export const WithImage = Template.bind({});
WithImage.args = {
  title: 'Cat dispenser',
  content: 'Receive an adorable free kitten delivered right to your door',
  imageSource: 'https://s3-us-west-2.amazonaws.com/public.lob.com/dashboard/navbar/settings.svg'
};

export const WithDisabledBanner = Template.bind({});
WithDisabledBanner.args = {
  title: 'Cat dispenser',
  content: 'Receive an adorable free kitten delivered right to your door',
  disabled: true,
  disabledBanner: 'Out of kittens!'
};

export const Group = MultipleTemplate.bind({});
Group.args = {
  title: 'Calico',
  content: null,
  disabled: false,
  disabledBanner: null
};
