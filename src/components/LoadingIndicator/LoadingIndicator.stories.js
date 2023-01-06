import LoadingIndicator from './LoadingIndicator.vue';
import mdx from './LoadingIndicator.mdx';

export default {
  title: 'Components/Loading Indicator',
  component: LoadingIndicator,
  decorators: [
    // hard-coding height and width b/c PurgeCSS removes classes not used in our components
    () => ({ template: '<div style="height: 12rem; width: 24rem;"><story /></div>' })
  ],
  parameters: {
    docs: {
      page: mdx
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  decorators: [() => ({ template: '<div class="block"><story /></div>' })],
  components: { LoadingIndicator },
  setup: () => ({ args }),
  template: `
  <div style="margin:auto; background-color: #f7f5fa; padding: 2em;">
    <loading-indicator/>
  </div>
  `
});

export const Primary = Template.bind({});

const dataPresent = false;

const AfterContentLoadedTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {  LoadingIndicator },
  decorators: [() => ({ template: '<div class="block"><story /></div>' })],
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
  template:
  `
  <div style="margin:auto; background-color: #f7f5fa; padding: 2em;">
  <loading-indicator><div v-if="dataPresent">Loading spinner disappeared after 3 seconds</div></loading-indicator>
  </div>
  `
});

export const AfterContentLoaded = AfterContentLoadedTemplate.bind({});
