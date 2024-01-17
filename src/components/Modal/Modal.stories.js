import Dropdown from '../Dropdown/Dropdown.vue';
import LobButton from '../Button/Button.vue';
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
  components: { Modal, LobButton, RadioButton, RadioGroup },
  setup: () => ({ args }),
  data: () => ({ isModalVisible, radioModel }),
  template: `
    <LobButton @click="isModalVisible = true">
      Open Modal
    </LobButton>

    <Modal
      v-bind="args"
      :visible="isModalVisible"
      header="Select Tracking Events"
      closeButtonAriaLabel="Close Tracking Events Modal"
      @close="isModalVisible = false"
    >
      Would you like to export an additional CSV of associated tracking events?
      <RadioGroup>
        <radio-button name="exportCSV" id="yes" value="yes" label="Yes" v-model="radioModel"/>
        <radio-button name="exportCSV" id="no" value="no" label="No" v-model="radioModel" />
      </RadioGroup>

      <template v-slot:footer>
        <div class="flex self-end">
          <LobButton variant="secondary" @click="isModalVisible = false">Go back</LobButton>
          <LobButton variant="primary" class="ml-2">Submit</LobButton>
        </div>
      </template>
    </Modal>
    `
});

const dropVModel = '';
const WithDropdownTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Modal, LobButton, Dropdown },
  setup: () => ({ args }),
  data: () => ({ isModalVisible, dropVModel }),
  template: `
    <LobButton @click="isModalVisible = true">
      Open Modal
    </LobButton>
    <Modal
      v-bind="args"
      width="500px"
      :visible="isModalVisible"
      header="A Modal with a Dropdown"
      closeButtonAriaLabel="Close modal with dropdown"
      @close="isModalVisible = false"
    >
      <div style="height: 150px;">
        <div class="mb-5">Select a thing to continue:</div>
        <Dropdown 
          id="dropdown1" 
          label="thing"
          srOnlyLabel 
          placeholder="Select a value"
          :options="['one', 'two']" 
          v-model="dropVModel"/>
      </div>

      <template v-slot:footer>
        <div class="flex self-end">
          <LobButton 
          class="ml-2" 
          :disabled="!dropVModel"
          @click="isModalVisible=false">OK</LobButton>
        </div>
      </template>
    </Modal>
    `
});

export const Primary = PrimaryTemplate.bind({});
Primary.args = {};

export const WithDropdown = WithDropdownTemplate.bind({});
WithDropdown.args = {};
