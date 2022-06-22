import MegaButton from './MegaButton.vue';
import RadioGroup from '../RadioGroup/RadioGroup.vue';
import mdx from './MegaButton.mdx';
import image from '@/assets/images/floofyboi.jpg';

export default {
  title: 'Components/Mega Button',
  component: MegaButton,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    label: {
      control: {
        type: 'text'
      }
    },
    text: {
      control: {
        type: 'text'
      }
    },
    imageSource: {
      control: {
        type: 'text',
        required: false
      }
    }
  }

};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MegaButton },
  setup: () => ({ args }),
  template: '<MegaButton v-bind="args" />'
});

export const MegaText = Template.bind({});
MegaText.args = {
  name: 'cat-type',
  id: 'tortie',
  label: 'Tortie',
  value: 'tortoiseshell'
};

export const WithImage = Template.bind({});
WithImage.args = {
  name: 'cat-type',
  id: 'floofyboi',
  value: 'floofyboi',
  label: 'Floofyboi',
  disabled: false,
  disabledBanner: null,
  text: 'Minimum 80% fur by weight',
  imageSource: image
};

export const SmallText = Template.bind({});
SmallText.args = {
  name: 'cat-type',
  id: 'ginger',
  value: 'ginger',
  label: 'Ginger',
  disabled: false,
  disabledBanner: null,
  text: 'The himbos of the cat world'
};

const megaButtonModel = '';

const GroupTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MegaButton, RadioGroup },
  setup: () => ({ args }),
  data: () => ({ megaButtonModel }),
  template: `
  <div style="width: 700px">
    <RadioGroup legend="Cat Type" style="column-gap: 1.5rem">
      <mega-button
        id="ginger"
        name="catType"
        label="Ginger"
        value="ginger"
        v-bind="args"
        v-model="megaButtonModel"
      />
      <mega-button
        id="calico"
        name="catType"
        label="Calico"
        value="calico"
        v-bind="args"
        v-model="megaButtonModel"
      />
      <mega-button
        id="void"
        name="catType"
        label="Voidcat"
        value="voidcat"
        :disabled="true"
        disabledBanner="Hiding in closet!"
        v-bind="args"
        v-model="megaButtonModel"
      />
    </RadioGroup>
  </div>
  `
});

export const Group = GroupTemplate.bind({});

const GroupWithImageTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MegaButton, RadioGroup },
  setup: () => ({ args }),
  data: () => ({ megaButtonModel }),
  template: `
  <div>
    <RadioGroup legend="Cat Type" style="column-gap: 1.5rem">
      <mega-button
        id="ginger"
        name="catType"
        label="Ginger"
        value="ginger"
        v-bind="args"
        v-model="megaButtonModel"
        imageSource=${image}
        text="Minimum 80% fur by weight"
      />
      <mega-button
        id="calico"
        name="catType"
        label="Calico"
        value="calico"
        v-bind="args"
        v-model="megaButtonModel"
        imageSource=${image}
        text="Small. Cute and Sneaky. Not to be trusted around plants, glasses of water, toilets or nice linen furniture."

      />
      <mega-button
        id="siberian"
        name="catType"
        label="Siberian"
        value="siberian"
        v-bind="args"
        v-model="megaButtonModel"
        imageSource=${image}
        text="Minimum 80% fur by weight. Very very very very big boy."

      />
    </RadioGroup>
  </div>
  `
});

export const GroupWithImage = GroupWithImageTemplate.bind({});
