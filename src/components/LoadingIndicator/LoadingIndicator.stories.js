import LoadingIndicator from './LoadingIndicator.vue';
import mdx from './LoadingIndicator.mdx';

export default {
  title: 'Components/Loading Indicator',
  component: LoadingIndicator,
  decorators: [
    // hard-coding height and width b/c PurgeCSS removes classes not used in our components
    () => ({
      template: '<div style="height: 12rem; width: 24rem;"><story /></div>'
    })
  ],
  parameters: {
    docs: {
      page: mdx
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LoadingIndicator },
  setup: () => ({ args }),
  template: '<loading-indicator/>'
});

export const Primary = Template.bind({});

const TemplateWithBackground = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LoadingIndicator },
  setup: () => ({ args }),
  template: `
  <div style="margin:auto; background-color: #f7f5fa; padding: 2em;">
    <loading-indicator/>
  </div>
  `
});

export const WithBackground = TemplateWithBackground.bind({});

const dataPresent = false;

const AfterContentLoadedTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LoadingIndicator },
  setup: () => ({ args }),
  data: () => ({ dataPresent }),
  mounted() {
    this.updateData();
  },
  methods: {
    updateData() {
      setTimeout(() => {
        this.dataPresent = true;
      }, 3000);
    }
  },
  template:
    '<loading-indicator><div v-if="dataPresent">Loading spinner disappeared after 3 seconds</div></loading-indicator>'
});

export const AfterContentLoaded = AfterContentLoadedTemplate.bind({});
