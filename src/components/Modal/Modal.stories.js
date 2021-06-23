import Button from '../Button/Button.vue';
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

const PrimaryTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Modal, Button },
  setup: () => ({ args }),
  data: () => ({ isModalVisible }),
  template: `
    <Button @click="isModalVisible = true">
      Open Modal
    </Button>

    <Modal
      v-model="isModalVisible"
      @close="isModalVisible = false"
    >
      <template v-slot:header>
        <h3>Important!</h3>
      </template>

      <template v-slot:body>
        Within the modal's body, there could be very important information.
        <br/>
        <b>Please pay attention.</b>
      </template>

      <template v-slot:footer>
        And here you would have some actions to perform.
      </template>
    </Modal>
    `
});

export const Primary = PrimaryTemplate.bind({});
Primary.args = {
};
