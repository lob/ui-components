import Button from '../Button/Button.vue';
import RadioButton from '../RadioButton/RadioButton.vue';
import RadioGroup from '../RadioGroup/RadioGroup.vue';
import Modal from './Modal.vue';
import mdx from './Modal.mdx';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

const isModalVisible = false;
const radioModel = 'yes';

const PrimaryTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Modal, Button, RadioButton, RadioGroup },
  setup: () => ({ args }),
  data: () => ({ isModalVisible, radioModel }),
  template: `
    <Button @click="isModalVisible = true">
      Open Modal
    </Button>

    <Modal
      v-bind="args"
      v-model="isModalVisible"
      @close="isModalVisible = false"
    >
      <template v-slot:header>
        <h4>Select Tracking Events</h4>
      </template>

      <template v-slot:body>
        Would you like to export an additional CSV of associated tracking events?
        <RadioGroup>
          <radio-button name="exportCSV" value="yes" label="Yes" v-model="radioModel"/>
          <radio-button name="exportCSV" value="no" label="No" v-model="radioModel" />
        </RadioGroup>
      </template>

      <template v-slot:footer>
        <div class="flex self-end">
          <Button variant="secondary">Go back</Button>
          <Button variant="primary" class="ml-2">Submit</Button>
        </div>
      </template>
    </Modal>
    `
});

export const Primary = PrimaryTemplate.bind({});
Primary.args = {
};
