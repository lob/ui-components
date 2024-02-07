<template>
  <LegacyModal
    :visible="visible"
    :close-button-aria-label="
      t('dropzone.confirmRemoveFileModal.closeButtonAriaLabel')
    "
    @close="$emit('close')"
  >
    <div class="px-5 flex flex-col items-center">
      <TriangleExclamation size="xxl" class="mb-3" />
      <div class="mb-2 type-xl-600 max-w-[246px] text-center">
        {{ title }}
      </div>
      <div class="mb-6 type-base-400 max-w-[320px] text-center">
        {{ subtext }}
      </div>
      <div class="flex w-full justify-center">
        <LobButton size="small" class="mr-4" @click="$emit('close')">
          {{ t('dropzone.confirmRemoveFileModal.goBack') }}
        </LobButton>
        <LobButton
          size="small"
          variant="secondary"
          @click="
            $emit('confirmClicked');
            $emit('close');
          "
        >
          {{ confirmButtonText }}
        </LobButton>
      </div>
    </div>
  </LegacyModal>
</template>

<script>
import { LegacyModal } from '@/components';
import { TriangleExclamation } from '../Icons';
import { LobButton } from '@/components';
export default {
  name: 'ConfirmRemoveFileModal',
  components: { LegacyModal, TriangleExclamation, LobButton },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtext: {
      type: String,
      required: true
    },
    confirmButtonText: {
      type: String,
      required: true
    }
  },
  emits: ['close', 'confirmClicked']
};
</script>
