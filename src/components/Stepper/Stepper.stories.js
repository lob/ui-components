import Stepper from './Stepper.vue';
import StepperItem from './StepperItem.vue';
import mdx from './Stepper.mdx';
import { config } from 'tailwind-plugin-lob';

const { theme } = config;
const { colors } = theme;

export default {
  title: 'Components/Stepper',
  component: Stepper,
  subcomponents: { StepperItem },
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {}
};

const Template = (args) => ({
  components: { Stepper, StepperItem },
  setup: () => ({ args }),
  template: `
    <Stepper>
      <StepperItem position="first" :finished="true" :alignment="args.alignment" :text-vertical-align="args.textVerticalAlign">
        <div class="text-center">
          Finished
        </div>
      </StepperItem>
      <StepperItem :active="true" :alignment="args.alignment" :text-vertical-align="args.textVerticalAlign">
        <div class="text-center">
          Active
        </div>
      </StepperItem>
      <StepperItem color="${colors.error}" :alignment="args.alignment" :text-vertical-align="args.textVerticalAlign">
        <div class="text-center">
          Error
        </div>
      </StepperItem>
      <StepperItem position="last" color="${colors.gray['100']}" :alignment="args.alignment" :text-vertical-align="args.textVerticalAlign">
        <div class="text-center">
          Unfinished
        </div>
      </StepperItem>
    </Stepper>
    `
});

export const Primary = Template.bind({});
Primary.argTypes = {
  alignment: {
    options: ['left', 'center', 'right'],
    control: {
      type: 'select'
    }
  },
  textVerticalAlign: {
    options: ['bottom', 'top'],
    control: {
      type: 'select'
    }
  }
};
Primary.args = {
  alignment: 'center',
  textVerticalAlign: 'bottom'
};

const ComplexTemplate = (args) => ({
  components: { Stepper, StepperItem },
  setup: () => ({ args }),
  template: `
    <Stepper>
      <StepperItem position="first" alignment="left" color="#6db6ff" border-color="#ccc">
        <p class="font-medium mr-4">
          Mail Sent
        </p>
        <p>
          22,677 (100%)
        </p>
      </StepperItem>
      <StepperItem alignment="left" color="#185cb7" border-color="#ccc">
         <p class="font-medium mr-4">
          Mailed
        </p>
        <p>
          21,343 (97.6%)
        </p>
      </StepperItem>
      <StepperItem alignment="left" color="#db6d00" border-color="#ccc">
         <p class="font-medium mr-4">
          In Transit
        </p>
        <p>
          21,201 (96.2%)
        </p>
      </StepperItem>
      <StepperItem alignment="left" color="#009292" border-color="#ccc" :dashed-border="true">
         <p class="font-medium mr-4">
          Processed for Delivery
        </p>
        <p>
          20,334 (93.2%)
        </p>
      </StepperItem>
      <StepperItem alignment="left" color="#ffb6db" border-color="#ccc" :dashed-border="true">
         <p class="font-medium mr-4">
          Re-routed
        </p>
        <p>
          252 (0.3%)
        </p>
      </StepperItem>
      <StepperItem position="last" alignment="left" color="#920000" border-color="#ccc">
         <p class="font-medium mr-4">
          Returned to sender
        </p>
        <p>
          25 (0.0%)
        </p>
      </StepperItem>
    </Stepper>
    `
});

export const Complex = ComplexTemplate.bind({});

const ItemTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { StepperItem },
  setup: () => ({ args }),
  template: `
    <StepperItem v-bind="args">
      Some text
    </StepperItem>
    `
});

export const Item = ItemTemplate.bind({});
Item.argTypes = {
  position: {
    options: ['first', 'middle', 'last'],
    control: {
      type: 'select'
    }
  },
  alignment: {
    options: ['left', 'center', 'right'],
    control: {
      type: 'select'
    }
  },
  textVerticalAlign: {
    options: ['bottom', 'top'],
    control: {
      type: 'select'
    }
  }
};

Item.args = {
  active: true,
  finished: true,
  position: 'middle',
  dashedBorder: false
};
