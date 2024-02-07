import LobButton from '../Button/Button.vue';
import RadioButton from '../RadioButton/RadioButton.vue';
import RadioGroup from '../RadioGroup/RadioGroup.vue';
import { IconName } from '../Icon/types';

import Modal from './Modal.vue';
import mdx from './Modal.mdx';
import { ModalColor, ModalVariant } from './types';

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
  components: { Modal, LobButton, RadioButton, RadioGroup },
  setup: () => ({ args }),
  data: () => ({ isModalVisible, radioModel }),
  template: `
    <LobButton @click="isModalVisible = true">
      Open Icon Modal
    </LobButton>

    <Modal
      v-bind="args"
      v-model:visible="isModalVisible"
      :header="args.header"
      :icon="args.icon"
      :iconColor="args.iconColor"
      :closable="args.closable"
      :width="args.width"
    >
      A payment method is required in order to send mail and access live data. You won’t be charged anything until you place a live order.

      <template #footer>
        <LobButton variant="secondary" @click="isModalVisible = false">Cancel</LobButton>
        <LobButton variant="primary">Confirm</LobButton>
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
