<template>
  <ul v-bind="$attrs" class="uic-grid" data-testid="uic-grid">
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
</template>

<script setup lang="ts">
import { Pagination } from '@/components/Pagination';
import { IconButton } from '../IconButton';

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
  @apply flex flex-row flex-wrap gap-5 justify-start;
}
</style>
