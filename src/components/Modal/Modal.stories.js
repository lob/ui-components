import NewButton from '../NewButton/NewButton.vue';
import Dropdown from '../Dropdown/Dropdown.vue';
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
  components: { Modal, NewButton, RadioButton, RadioGroup },
  setup: () => ({ args }),
  data: () => ({ isModalVisible, radioModel }),
  template: `
    <NewButton @click="isModalVisible = true">
      Open Modal
    </NewButton>

    <Modal
      v-bind="args"
      :visible="isModalVisible"
      closeButtonAriaLabel="Close Tracking Events Modal"
      @close="isModalVisible = false"
    >
      <template v-slot:header>
        <h4>Select Tracking Events</h4>
      </template>

      Would you like to export an additional CSV of associated tracking events?
      <RadioGroup>
        <radio-button name="exportCSV" id="yes" value="yes" label="Yes" v-model="radioModel"/>
        <radio-button name="exportCSV" id="no" value="no" label="No" v-model="radioModel" />
      </RadioGroup>

      <template v-slot:footer>
        <div class="flex self-end">
          <NewButton variant="secondary" @click="isModalVisible = false">Go back</NewButton>
          <NewButton variant="primary" class="ml-2">Submit</NewButton>
        </div>
      </template>
    </Modal>
    `
});

const dropVModel = '';
const WithDropdownTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Modal, NewButton, Dropdown },
  setup: () => ({ args }),
  data: () => ({ isModalVisible, dropVModel }),
  methods: {
    closeModal () {
      this.isModalVisible = false;
    }
  },
  template: `
    <NewButton @click="isModalVisible = true">
      Open Modal
    </NewButton>

    <Modal
      v-bind="args"
      width="500px"
      :visible="isModalVisible"
      closeButtonAriaLabel="Close modal with dropdown"
      @close="closeModal"
    >
      <template v-slot:header>
        <h4>A Modal with a Dropdown</h4>
      </template>

      <template #default="{ events: { detectOpenDropdown } } ">
        <div style="height: 150px;">
          <div class="mb-5">Select a thing to continue:</div>
          <Dropdown 
            id="dropdown1" 
            label="thing"
            srOnlyLabel 
            :options="['one', 'two']" 
            v-model="dropVModel"/>
        </div>
      </template>

      <template v-slot:footer>
        <div class="flex self-end">
          <NewButton 
          class="ml-2" 
          :disabled="!dropVModel"
          @click="isModalVisible=false">OK</NewButton>
        </div>
      </template>
    </Modal>
    `
});

export const Primary = PrimaryTemplate.bind({});
Primary.args = {
};

export const WithDropdown = WithDropdownTemplate.bind({});
WithDropdown.args = {
};
