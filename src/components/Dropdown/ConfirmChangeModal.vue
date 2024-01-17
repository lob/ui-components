<template>
  <Modal
    :visible="visible"
    :close-button-aria-label="
      t('dropdown.confirmChangeModal.closeButtonAriaLabel')
    "
    @close="$emit('close')"
  >
    <div class="px-5 flex flex-col items-center">
      <TriangleExclamation size="xxl" class="mb-3" />
      <div class="mb-2 type-xl-600 max-w-[246px] text-center">
        {{ title || t('dropdown.confirmChangeModal.text') }}
      </div>
      <div class="mb-6 type-base-400 max-w-[320px] text-center">
        {{ subtext }}
      </div>
      <div class="flex w-full justify-center">
        <LobButton size="small" class="mr-4" @click="$emit('close')">
          {{ t('dropdown.confirmChangeModal.goBack') }}
        </LobButton>
        <LobButton
          size="small"
          variant="secondary"
          @click="
            $emit('confirmClicked');
            $emit('close');
          "
        >
          {{
            confirmButtonText ||
            t('dropdown.confirmChangeModal.confirmButtonText')
          }}
        </LobButton>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '../Modal/Modal.vue';
import { TriangleExclamation } from '../Icons';
import LobButton from '../Button/Button.vue';
export default {
  name: 'ConfirmChangeModal',
  components: { Modal, TriangleExclamation, LobButton },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    subtext: {
      type: String,
      default: ''
    },
    confirmButtonText: {
      type: String,
      default: ''
    }
  },
  emits: ['close', 'confirmClicked']
};
</script>
