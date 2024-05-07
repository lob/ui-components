<template>
  <p
    class="uic-datatable-total-results"
    data-testid="uic-datatable-total-results"
  >
    <LoadingSpinnerIcon
      v-if="loading"
      :size="14"
      data-testid="uic-datatable-total-results-loading"
    />
    <template v-else>{{ totalRows }}</template>
    {{ `result${total === 1 ? '' : 's'}` }}
  </p>
</template>

<script setup lang="ts">
import { LoadingSpinnerIcon } from '@/components/LoadingSpinnerIcon';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    total?: number;
    loading?: boolean;
  }>(),
  {
    total: undefined,
    loading: false
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

<style>
.uic-datatable-total-results {
  @apply inline-flex gap-2 items-center;
  @apply type-small-600 text-gray-800;
}
</style>
