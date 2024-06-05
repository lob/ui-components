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
        v-if="!rendering && src && !imgError"
        ref="img"
        :src
        :alt
        class="uic-grid-item-img"
        @error="imgError = true"
      />
      <div v-else :class="['uic-grid-item-img', 'fallback', { rendering }]">
        <Icon icon="Creative" :size-override="64" />
      </div>
      <p class="uic-grid-item-title">
        <span>{{ title || '-' }}</span>
      </p>
      <p class="uic-grid-item-subtitle">
        <span>{{ subtitle || '-' }}</span>
      </p>
    </ConditionalClickWrapper>
  </li>
</template>

<script setup lang="ts">
import ConditionalClickWrapper from '@/utils/ConditionalClickWrapper.vue';
import { computed, ref, watch } from 'vue';

import { Icon } from '../Icon';

const props = withDefaults(
  defineProps<{
    alt?: string;
    disabled?: boolean;
    onClick?: (e: MouseEvent) => void; // eslint-disable-line no-unused-vars
    rendering?: boolean;
    src?: string;
    subtitle?: string;
    target?: string;
    title?: string;
    to?: string;
  }>(),
  {
    alt: undefined,
    disabled: false,
    onClick: undefined,
    rendering: false,
    src: undefined,
    subtitle: undefined,
    target: undefined,
    title: undefined,
    to: undefined
  }
);

defineEmits<{
  (e: 'click', event: MouseEvent): void; // eslint-disable-line no-unused-vars
}>();

const img = ref<HTMLImageElement>();
const imgError = ref(false);

const isClickable = computed(() => Boolean(props.onClick) || props.to);

const computedClasses = computed(() => ({
  'uic-grid-item': true,
  clickable: isClickable.value,
  disabled: props.disabled
}));

// Retries when the src changes.
watch(
  () => props.src,
  (newSrc) => {
    if (newSrc) {
      imgError.value = false;
    }
  }
);
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

    &.rendering {
      @apply animate-pulse;
    }
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
