<template>
  <li
    :class="[!isClickable ? computedClasses : undefined, 'list-none']"
    data-testid="uic-grid-item"
  >
    <ConditionalClickWrapper
      :to="to"
      :disabled
      :target="target"
      :class="computedClasses"
      @[onClick&&`click`]="$emit('click', $event)"
    >
      <img
        v-if="!imgError"
        ref="img"
        :src
        :alt
        class="uic-grid-item-img"
        @error="imgError = true"
      />
      <div v-else class="uic-grid-item-img fallback">
        <Icon icon="Creative" :size-override="64" />
      </div>
      <p class="uic-grid-item-title">{{ title }}</p>
      <p class="uic-grid-item-subtitle">{{ subtitle }}</p>
    </ConditionalClickWrapper>
  </li>
</template>

<script setup lang="ts">
import ConditionalClickWrapper from '@/utils/ConditionalClickWrapper.vue';
import { computed, ref } from 'vue';
import { Icon } from '../Icon';

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    src?: string;
    alt: string;
    title: string;
    subtitle: string;
    to?: string;
    target?: string;
    onClick?: (e: MouseEvent) => void; // eslint-disable-line no-unused-vars
  }>(),
  {
    disabled: false,
    src: undefined,
    to: undefined,
    target: undefined,
    onClick: undefined
  }
);

defineEmits<{
  (e: 'click', event: MouseEvent): void; // eslint-disable-line no-unused-vars
}>();

const img = ref<HTMLImageElement>();
const imgError = ref(false);

const computedClasses = computed(() => ({
  'uic-grid-item': true,
  clickable: Boolean(props.onClick),
  disabled: props.disabled
}));

const isClickable = computed(() => Boolean(props.onClick) || props.to);
</script>

<style lang="scss">
.uic-grid-item {
  @apply tile-container;

  @apply relative;
  @apply flex flex-col justify-start;
  @apply p-3;
  @apply min-w-[15.5rem] max-w-[15.5rem] min-h-[16.25rem] max-h-[16.25rem];
}

.uic-grid-item-img {
  @apply w-full h-[10.5rem] object-contain rounded-lg;

  .disabled & {
    @apply opacity-75;
  }

  &.fallback {
    @apply flex items-center justify-center;
    @apply bg-gray-50 text-gray-300;
  }
}

.uic-grid-item-title {
  @apply mt-4 max-w-full;
  @apply text-gray-800 type-base-600 truncate;

  .disabled & {
    @apply text-gray-400;
  }
}

.uic-grid-item-subtitle {
  @apply max-w-full;
  @apply text-gray-400 type-small-400 truncate;

  .disabled & {
    @apply text-gray-300;
  }
}
</style>
