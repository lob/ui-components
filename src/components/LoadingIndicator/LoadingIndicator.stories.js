import LoadingIndicator from './LoadingIndicator.vue';
import mdx from './LoadingIndicator.mdx';

export default {
  title: 'Components/Loading Indicator',
  component: LoadingIndicator,
  decorators: [
    () => ({ template: '<div class="w-96 h-48"><story /></div>' })
  ],
  parameters: {
    docs: {
      page: mdx
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {  LoadingIndicator },
  setup: () => ({ args }),
  template: '<loading-indicator></loading-indicator>'
});

export const Primary = Template.bind({});

const dataPresent = false;

const AfterContentLoadedTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {  LoadingIndicator },
  setup: () => ({ args }),
  data: () => ({ dataPresent }),
  mounted () {
    this.updateData();
  },
  methods: {
    updateData () {
      setTimeout(() => {
        this.dataPresent = true;
      }, 3000);
    }
  },
  template: '<loading-indicator><div v-if="dataPresent">Loading spinner disappeared after 3 seconds</div></loading-indicator>'
});

export const AfterContentLoaded = AfterContentLoadedTemplate.bind({});
