<template>
  <ConditionalClickWrapper
    v-bind="$attrs"
    :to
    :target
    :class="clickWrapperClasses"
    :disabled
    @[onClick&&`click`]="$emit('click', $event)"
  >
    <Card :class="cardClasses">
      <template #header>
        <span v-if="icon" class="uic-card-icon-container">
          <Icon :icon size="xxl" />
        </span>
      </template>

      <template v-if="title || $slots.title" #title>
        <slot name="title">
          {{ title }}
        </slot>
      </template>

      <template #content>
        <slot>
          <p>{{ content }}</p>
        </slot>
      </template>
    </Card>
  </ConditionalClickWrapper>
</template>

<script setup lang="ts">
import ConditionalClickWrapper from '@/utils/ConditionalClickWrapper.vue';
import { Icon } from '@/components/Icon';
import Card from 'primevue/card';
import { IconName } from '../Icon';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    content?: string;
    disabled?: boolean;
    icon?: IconName;
    onClick?: (e: MouseEvent) => void; // eslint-disable-line no-unused-vars
    target?: string;
    title?: string;
    to?: string;
  }>(),
  {
    content: undefined,
    disabled: false,
    icon: undefined,
    onClick: undefined,
    target: undefined,
    title: undefined,
    to: undefined
  }
);

defineEmits<{
  (e: 'click', event: MouseEvent): void; // eslint-disable-line no-unused-vars
}>();

defineSlots<{
  default: () => any;
  title: () => any;
}>();

const isClickable = computed(() => Boolean(props.onClick) || props.to);
const computedClasses = computed(() => [
  `uic-card`,
  { clickable: isClickable.value, disabled: props.disabled }
]);
const clickWrapperClasses = computed(() =>
  isClickable.value ? computedClasses.value : undefined
);
const cardClasses = computed(() =>
  !isClickable.value ? computedClasses.value : undefined
);
</script>

<style lang="scss">
.uic-card {
  @apply block;
  @apply tile-container;
  @apply p-5;
  @apply text-left;

  &-icon-container {
    @apply flex items-center justify-center;
    @apply bg-gray-25;
    @apply w-10 h-10 rounded-full;
    @apply mb-2;
  }

  [data-pc-section='title'] {
    @apply type-base-600 text-gray-800;
    @apply mb-1;
  }

  [data-pc-section='content'] {
    @apply type-small-400 text-gray-800;
  }
}
</style>
