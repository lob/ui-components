<template>
  <ConditionalClickWrapper
    v-bind="$attrs"
    :class="clickWrapperClasses"
    :disabled
    :target
    :to
    @[onClick&&`click`]="$emit('click', $event)"
  >
    <template #default="{ attrs: slotAttrs }">
      <Card v-bind="slotAttrs" :class="cardClasses">
        <template v-if="icon" #header>
          <span class="uic-card-icon-container">
            <Icon :icon size="xxl" />
          </span>
        </template>

        <template v-if="title || $slots.title" #title>
          <slot name="title">
            <p class="type-base-600 text-gray-800;">{{ title }}</p>
          </slot>
        </template>

        <template #content>
          <slot>
            <p class="type-small-400 text-gray-800">{{ content }}</p>
          </slot>
        </template>
      </Card>
    </template>
  </ConditionalClickWrapper>
</template>

<script setup lang="ts">
import ConditionalClickWrapper from '@/utils/ConditionalClickWrapper.vue';
import { Icon } from '@/components/Icon';
import Card from 'primevue/card';
import { IconName } from '../Icon';
import { computed, useAttrs } from 'vue';

const attrs = useAttrs();

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
  attrs.class,
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
    @apply mb-1;
  }
}
</style>
