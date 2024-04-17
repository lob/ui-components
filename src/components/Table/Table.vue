<template>
  <table :class="spaceClassName">
    <slot />
  </table>
</template>

<script setup lang="ts">
import { computed, defineOptions } from 'vue';
import { TableSize } from './constants';

defineOptions({ name: 'LobTable' });

const props = withDefaults(
  defineProps<{
    /** @deprecated Utilize the `size` prop. */
    space?: TableSize;
    size?: TableSize;
  }>(),
  {
    size: TableSize.MD
  }
);

const spaceClassName = computed(() => {
  if (props.space) {
    return `size-${props.space}`;
  }
  return `size-${props.size}`;
});
</script>

<style scoped lang="scss">
.size-sm {
  :deep(th),
  :deep(td) {
    @apply py-1;
    @apply px-2;
  }
}

.size-md {
  :deep(th),
  :deep(td) {
    @apply p-2;
  }
}

.size-lg {
  :deep(th),
  :deep(td) {
    @apply p-4;
  }
}
</style>
