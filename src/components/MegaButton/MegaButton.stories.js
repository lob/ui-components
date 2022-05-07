import MegaButton from './MegaButton.vue';
import mdx from './MegaButton.mdx';

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

const megaButtonModel = '';

const MegaTextGroupTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MegaButton },
  data: () => ({ megaButtonModel }),
  template: `
    <div class="flex items-stretch justify-around">
      <mega-button
        id="ginger"
        name="catType"
        label="Ginger"
        :value="ginger"
        v-model="megaButtonModel"
      />
      <mega-button
        id="calico"
        name="catType"
        :value="calico"
        v-model="megaButtonModel"
      >
      <template #label>Calico</template>
      </mega-button>
      <mega-button
        id="void"
        name="catType"
        label="Voidcat"
        :value="voidcat"
        :disabled="true"
        disabledBanner="Hiding in closet!"
        v-model="megaButtonModel"
      />
    </div>
  `
});

export const MegaTextGroup = MegaTextGroupTemplate.bind({});
