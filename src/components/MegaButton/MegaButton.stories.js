import MegaButton from './MegaButton.vue';
import mdx from './MegaButton.mdx';
import image from '@/assets/images/floofyboi.jpg';
export default {
  title: 'Components/Mega Button',
  component: MegaButton,
  parameters: {
    docs: {
      page: mdx
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

const MegaTextGroupTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MegaButton },
  data: () => ({ megaButtonModel }),
  template: `
    <fieldset class="flex items-stretch justify-around">
      <mega-button
        id="ginger"
        name="catType"
        label="Ginger"
        value="ginger"
        v-model="megaButtonModel"
      />
      <mega-button
        id="calico"
        name="catType"
        value="calico"
        v-model="megaButtonModel"
      >
      <template #label>Calico</template>
      </mega-button>
      <mega-button
        id="void"
        name="catType"
        label="Voidcat"
        value="voidcat"
        disabled="true"
        disabledBanner="Hiding in closet!"
        v-model="megaButtonModel"
      />
    </fieldset>
  `
});

export const MegaTextGroup = MegaTextGroupTemplate.bind({});
