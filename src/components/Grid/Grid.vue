<template>
  <div class="uic-grid" data-testid="uic-grid">
    <div v-if="loading" class="loading-overlay">
      <LoadingSpinnerIcon :size="24" />
    </div>

    <ul v-bind="$attrs" class="uic-grid-list">
      <slot />
    </ul>

    <Pagination
      v-if="list"
      data-testid="uic-grid-pagination"
      :loading
      :next
      :previous
      :total
      :next-button-props="{ 'data-testid': 'uic-grid-pagination-next' }"
      :previous-button-props="{ 'data-testid': 'uic-grid-pagination-previous' }"
      @next="$emit('next')"
      @previous="$emit('previous')"
    />
  </div>
</template>

<script setup lang="ts">
import { Pagination } from '@/components/Pagination';
import { IconButton } from '../IconButton';
import { LoadingSpinnerIcon } from '@/components/LoadingSpinnerIcon';

defineOptions({ inheritAttrs: false });

withDefaults(
  defineProps<{
    list?: boolean;
    loading?: boolean;
    next?: string;
    previous?: string;
    total?: number;
    nextButtonProps?: Partial<InstanceType<typeof IconButton>['$props']> &
      Record<string, unknown>;
    previousButtonProps?: Partial<InstanceType<typeof IconButton>['$props']> &
      Record<string, unknown>;
  }>(),
  {
    list: false,
    loading: false,
    next: undefined,
    previous: undefined,
    total: undefined,
    nextButtonProps: undefined,
    previousButtonProps: undefined
  }
);

defineEmits<{
  (e: 'next'): void; // eslint-disable-line no-unused-vars
  (e: 'previous'): void; // eslint-disable-line no-unused-vars
}>();

defineSlots<{
  default(): any;
}>();
</script>

<style scoped lang="scss">
.uic-grid {
  @apply relative;

  &-list {
    @apply grid gap-5;
    @apply auto-rows-fr;
    @apply max-w-[2000px];

    // Breakpoints
    grid-template-columns: repeat(1, minmax(0, 1fr));
    @media (min-width: 640px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (min-width: 768px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    @media (min-width: 1280px) {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    @media (min-width: 1536px) {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    @media (min-width: 1800px) {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
  }
}

.loading-overlay {
  @apply bg-white;
  @apply border border-gray-100;
  @apply rounded-xl;
  @apply shadow-xl;
  @apply p-2;
  @apply absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
  @apply z-10;
}
</style>
