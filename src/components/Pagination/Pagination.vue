<template>
  <div class="uic-pagination" data-testid="uic-pagination">
    <PaginationTotal :loading :total data-testid="uic-pagination-total" />

    <IconButton
      v-bind="previousButtonProps"
      class="mr-2"
      :data-testid="
        previousButtonProps?.['data-testid'] || 'uic-pagination-previous'
      "
      :disabled="!previous || loading"
      :icon="IconName.PREVIOUS"
      size="sm"
      variant="outlined"
      @click="$emit('previous')"
    />
    <IconButton
      v-bind="nextButtonProps"
      :data-testid="nextButtonProps?.['data-testid'] || 'uic-pagination-next'"
      :disabled="!next || loading"
      :icon="IconName.NEXT"
      size="sm"
      variant="outlined"
      @click="$emit('next')"
    />
  </div>
</template>

<script setup lang="ts">
import { IconButton } from '@/components/IconButton';
import { IconName } from '@/components/Icon';

import PaginationTotal from './PaginationTotal.vue';

withDefaults(
  defineProps<{
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
</script>

<style scoped lang="scss">
.uic-pagination {
  @apply flex items-center;
  @apply py-2;
}
</style>
