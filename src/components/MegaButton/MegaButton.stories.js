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
  template: '<MegaButton v-bind="args"><slot #label>Ginger</slot></MegaButton>'
});

export const MegaText = Template.bind({});
MegaText.args = {
  name: 'cat-type',
  id: 'calico',
  label: 'Calico',
  value: 'calico',
  disabled: false,
  disabledBanner: null,
  text: null
};

export const WithText = Template.bind({});
WithText.args = {
  name: 'cat-type',
  id: 'ginger',
  value: 'ginger',
  label: 'Ginger',
  disabled: false,
  disabledBanner: null,
  text: 'The himbos of the cat world'
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: 'cat-type',
  id: 'void',
  value: 'void',
  label: 'Voidcat',
  disabled: true,
  disabledBanner: 'Hiding in closet!',
  text: 'Like a loveable little black hole that sheds on your white jeans'
};

export const WithImage = Template.bind({});
WithImage.args = {
  name: 'cat-type',
  id: 'floof',
  value: 'floof',
  label: 'Floofcat',
  disabled: false,
  disabledBanner: null,
  text: 'Probably a pillow',
  imageSource: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Cymric_-_Norwegian_forest_cat_presentation_show_Kotka_2009-02-01_IMG_0687.JPG'
};

const WithOverrunTextTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MegaButton },
  setup: () => ({ args }),
  template: `
    <MegaButton v-bind="args">
      <template #label>
        Floofcat
      </template>
      <template #text>
        <p>Probably a pillow.</p>
        <p>Now I know what you're thinking. It's obviously a cat, even though you agree that it's a very pillowlike cat. But you're making the classic blunder of assuming that cats and pillows are entirely exclusive categories. (Cat-egories. Teehee.) But that assumption is unwarranted.</p>
      </template>
    </MegaButton>
  `
});

export const WithOverrunText = WithOverrunTextTemplate.bind({});
WithImage.args = {
  name: 'cat-type',
  id: 'floof',
  value: 'floof',
  disabled: false,
  disabledBanner: null,
  imageSource: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Cymric_-_Norwegian_forest_cat_presentation_show_Kotka_2009-02-01_IMG_0687.JPG'
};

const megaButtonModel = '';

const MegaButtonTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MegaButton },
  data: () => ({ megaButtonModel }),
  setup: () => ({ args }),
  template: `
    <div class="flex items-center justify-around">
      <mega-button
        id="ginger"
        name="catType"
        label="Ginger"
        :value="ginger"
        v-model="megaButtonModel"
      >
        <template #label>Ginger</template>
        <template #text>The himbos of the cat world</template>
        </mega-button>
      <mega-button
        id="void"
        name="catType"
        label="Voidcat"
        text="Like a loveable little black hole that sheds on your white jeans"
        :value="voidcat"
        :disabled="true"
        disabledBanner="Hiding in closet"
        v-model="megaButtonModel"
      />
      <mega-button
        id="calico"
        name="catType"
        label="Calico"
        text="Can shed on any color of clothing"
        :value="calico"
        v-model="megaButtonModel"
      />
    </div>
  `
});

export const MegaButtonGroup = MegaButtonTemplate.bind({});
MegaButtonGroup.args = {};

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
      <template #label>Calico Catte fun times</template>
      </mega-button>
      <mega-button
        id="void"
        name="catType"
        label="Voidcat"
        :value="voidcat"
        :disabled="true"
        disabledBanner="Hiding in closet"
        v-model="megaButtonModel"
      />
    </div>
  `
});

export const MegaTextGroup = MegaTextGroupTemplate.bind({});
