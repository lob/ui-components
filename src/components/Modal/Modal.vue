<template>
  <Dialog
    :modal="showMask"
    :closable="closable"
    :pt="{
      root: { class: `relative bg-white p-10 rounded-xl shadow-large` },
      mask: {
        style: 'animation: fadeIn 100ms;', // This is a hack. Without it the styles flash.
        class: 'backdrop-blur-sm backdrop-brightness-[.80]'
      },
      header: { class: 'flex flex-col items-start justify-center mb-4' },
      content: { class: 'type-base-400' },
      footer: { class: 'flex justify-end mt-8 gap-4' },
      closeButton: { class: 'absolute top-6 right-6 text-black' },
      transition: {
        enterFromClass: 'opacity-0 scale-95',
        enterActiveClass: 'transition duration-250 ease-out',
        leaveActiveClass: 'transition duration-250 ease-out',
        leaveToClass: 'opacity-0 scale-95'
      }
    }"
    :show-header="hasHeader"
    :draggable="false"
    :block-scroll="true"
    :dismissable-mask="closable"
    :style="{ width }"
    :visible="visible"
    data-testid="uic-modal"
    @update:visible="(visible) => emits('update:visible', visible)"
    @show="emits('open')"
    @hide="emits('close')"
  >
    <template #closeicon>
      <XmarkLarge />
    </template>

    <template #header>
      <div v-if="icon" :class="`modal-icon-container modal-${iconColor}`">
        <Icon :icon="icon" :size-override="35" />
      </div>
      <div>
        <p class="model-header-title">
          {{ header }}
        </p>
        <p v-if="subheader" class="text-default mt-2">
          {{ subheader }}
        </p>
      </div>
    </template>

    <template #default>
      <slot />
    </template>

    <template v-if="hasFooter" #footer>
      <slot name="footer" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { Icon } from '@/components/Icon';
import { IconName } from '@/components/Icon/types';
import XmarkLarge from '@/components/Icons/XmarkLarge.vue';
import Dialog, { DialogProps } from 'primevue/dialog';
import {
  computed,
  defineEmits,
  defineProps,
  useSlots,
  withDefaults
} from 'vue';

import { ModalColor, ModalVariant } from './types';

const props = withDefaults(
  defineProps<{
    visible?: boolean;
    width?: string;
    header?: string;
    subheader?: string;
    closable?: DialogProps['closable'];
    variant?: ModalVariant;
    showMask?: boolean;
    icon?: IconName;
    iconColor?: ModalColor;
  }>(),
  {
    visible: false,
    width: '550px',
    header: undefined,
    subheader: undefined,
    closeButtonAriaLabel: 'Close',
    noPadding: false,
    noSectionDividers: false,
    closable: true,
    variant: ModalVariant.PRIMARY,
    showMask: true,
    icon: undefined,
    iconColor: ModalColor.PRIMARY
  }
);

const emits = defineEmits<{
  (e: 'close'): void; // eslint-disable-line no-unused-vars
  (e: 'open'): void; // eslint-disable-line no-unused-vars
  (e: 'update:visible', visible: boolean): void; // eslint-disable-line no-unused-vars
}>();

const slots = useSlots();

const hasHeader = computed(() =>
  Boolean(props.header || props.subheader || props.icon)
);
const hasFooter = computed(() => Boolean(slots.footer));
</script>

<style lang="scss">
.modal-icon-container {
  @apply p-[10px] rounded-full;
  @apply mb-4;

  &.modal {
    &-primary {
      @apply bg-primary-100 text-primary-700;
    }
    &-green {
      @apply bg-green-50 text-green-600;
    }
  }
}

.model-header-title {
  @apply type-header-4;
}
</style>
