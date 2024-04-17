<template>
  <Steps
    v-model:activeStep="activeStep"
    :model="primeVueItems"
    :pt="{ menu: { class: 'uic-steps-menu' } }"
    :readonly="false"
    data-testid="uic-steps"
  >
    <template #item="{ active, index, label }">
      <span :class="['uic-steps-action', { active }]">
        <span class="uic-steps-container">
          <span
            :class="['uic-steps-step', { icon: Boolean(stepIcons[index]) }]"
          >
            <Icon
              v-if="stepIcons[index]"
              :icon="stepIcons[index]"
              data-testid="uic-steps-icon"
            />
            <template v-else>
              {{ index + 1 }}
            </template>
          </span>
          <span class="uic-steps-label">{{ label }}</span>
        </span>
        <Transition>
          <span v-if="active" class="uic-steps-active-indicator" />
        </Transition>
      </span>
    </template>
  </Steps>
</template>

<script setup lang="ts">
import Steps, { StepsProps } from 'primevue/steps';
import { computed, defineModel } from 'vue';

import { Icon, IconName } from '../Icon';
import { StepItem } from './types';

const props = withDefaults(
  defineProps<{
    items: StepItem[];
    readonly?: boolean;
  }>(),
  {
    readonly: false
  }
);

const activeStep = defineModel<number>('activeStep', { default: 0 });

const primeVueItems = computed<StepsProps['model']>(() => {
  return props.items.map((item) => ({
    label: item.label
  }));
});

const stepIcons = computed<Record<number, IconName>>(() => {
  const icons: Record<number, IconName> = {};

  props.items.forEach((item, index) => {
    if (item.status === 'success') {
      icons[index] = IconName.SUCCESS;
    }
  });

  return icons;
});
</script>

<style lang="scss">
.uic-steps-menu {
  @apply flex gap-12;
}
.uic-steps-action {
  @apply relative;
  @apply flex;
  @apply cursor-pointer;
  @apply py-1;

  &:hover > .uic-steps-container {
    @apply bg-gray-25;
  }
}
.uic-steps-container {
  @apply flex gap-2 items-center;
  @apply px-3 py-2 my-2 rounded-xl;
  @apply transition-colors;
}
.uic-steps-label {
  @apply type-small-600 text-gray-600;
  @apply transition-colors;

  .active & {
    @apply text-upgrade;
  }
}
.uic-steps-step {
  @apply flex items-center justify-center;
  @apply w-5 h-5 rounded-full;
  @apply bg-gray-50;
  @apply type-xs-600 text-gray-600;
  @apply transition-colors;

  .active & {
    @apply bg-transparent;
    @apply border border-upgrade;
    @apply text-upgrade;
  }

  &.icon {
    @apply bg-upgrade;
    @apply text-white;
    @apply border-none;
  }
}
.uic-steps-active-indicator {
  @apply absolute bottom-0 left-0 right-0;
  @apply bg-upgrade h-[2px];

  &.v-enter-active,
  &.v-leave-active {
    transition: opacity 0.25s ease-in-out;
  }

  &.v-enter-from,
  &.v-leave-to {
    opacity: 0;
  }
}
</style>
