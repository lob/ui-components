<template>
  <p class="pagination-total" data-testid="uic-pagination-total">
    <Skeleton
      v-if="loading"
      width="40px"
      height="14px"
      data-testid="uic-pagination-total-loading"
    />
    <template v-else>{{ totalRows }}</template>
    {{ `result${total === 1 ? '' : 's'}` }}
  </p>
</template>

<script setup lang="ts">
import { Skeleton } from '@/components/Skeleton';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    loading?: boolean;
    total?: number;
  }>(),
  {
    loading: false,
    total: undefined
  }
);

const totalRows = computed(() => {
  if (typeof props.total !== 'number') {
    return '-';
  }
  const commaFormatted = props.total
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // When our ES total is 10,000, we want to display 10,000+.
  return props.total === 10000 ? `${commaFormatted}+` : commaFormatted;
});
</script>

<style scoped lang="scss">
.pagination-total {
  @apply flex flex-row gap-2 items-center;
  @apply mr-auto;
  @apply type-small-600 text-gray-800;
}
</style>
