import LobButton from '../Button/Button.vue';
import RadioButton from '../RadioButton/RadioButton.vue';
import RadioGroup from '../RadioGroup/RadioGroup.vue';
import Icon from '../Icon/Icon.vue';
import { IconName } from '../Icon/types';

import Modal from './Modal.vue';
import mdx from './Modal.mdx';
import { ModalColor, ModalVariant } from './constants';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: {
      page: mdx
    }
  },
  argTypes: {
    closable: {
      control: {
        type: 'boolean'
      }
    },
    icon: {
      options: Object.values(IconName),
      control: {
        type: 'select'
      }
    },
    iconColor: {
      options: Object.values(ModalColor),
      control: {
        type: 'select'
      }
    },
    variant: {
      options: Object.values(ModalVariant),
      control: {
        type: 'select'
      }
    }
  }
};

const isModalVisible = false;
const radioModel = 'yes';

const PrimaryTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Icon, Modal, LobButton, RadioButton, RadioGroup },
  setup: () => ({ args }),
  data: () => ({ isModalVisible, radioModel }),
  template: `
    <LobButton @click="isModalVisible = true">
      Open Icon Modal
    </LobButton>

    <Modal v-model:visible="isModalVisible" icon-color="info">
      <template #icon="iconProps">
        <Icon icon="Bars" v-bind="iconProps" />
      </template>

      <template #header>
        Select Tracking Events
      </template>
    
      <template #default>
        <p>Would you like to export an additional CSV of associated tracking events?</p>
        <RadioGroup>
          <radio-button
            name="exportCSV"
            value="yes"
            label="Yes"
            v-model="radioModel"
          />
          <radio-button name="exportCSV" value="no" label="No" v-model="radioModel" />
        </RadioGroup>
      </template>
    
      <template #footer>
        <LobButton variant="secondary" @click="isModalVisible = false">Go back</LobButton>
        <LobButton variant="primary" class="ml-2">Submit</LobButton>
      </template>
    </Modal>
    `
});

export const Primary = PrimaryTemplate.bind({});
Primary.args = {
  closable: true,
  header: 'Add a payment method to continue',
  icon: IconName.MONEY_BILL,
  iconColor: ModalColor.GREEN,
  width: '550px'
};
