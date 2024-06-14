<template>
  <Panel
    class="uic-panel-container"
    :collapsed
    data-testid="uic-panel"
    :pt="{
      transition: {
        enterFromClass: 'max-h-0',
        enterActiveClass:
          'overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]',
        enterToClass: 'max-h-[1000px]',
        leaveFromClass: 'max-h-[1000px]',
        leaveActiveClass:
          'overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]',
        leaveToClass: 'max-h-0'
      }
    }"
    :toggleable="collapsible"
    @update:collapsed="$emit('update:collapsed', $event)"
  >
    <template #header>
      <component
        :is="headerComponent"
        class="type-base-600 flex flex-row gap-2 items-center"
      >
        <slot name="header">
          {{ header }}
        </slot>
        <LoadingSpinnerIcon v-if="loading" />
      </component>
    </template>

    <template #togglericon="{ collapsed: iconCollapsed }">
      <Icon
        :class="['toggle-icon', { collapsed: iconCollapsed }]"
        data-testid="uic-panel-toggle-icon"
        icon="Collapse"
        size="lg"
      />
    </template>

    <template #default>
      <slot />
    </template>
  </Panel>
</template>

<script setup lang="ts">
import { Icon } from '@/components/Icon';
import Panel from 'primevue/panel';
import { LoadingSpinnerIcon } from '../LoadingSpinnerIcon';

withDefaults(
  defineProps<{
    collapsed?: boolean;
    collapsible?: boolean;
    header?: string;
    headerComponent?: string;
    loading?: boolean;
  }>(),
  {
    collapsed: false,
    collapsible: false,
    header: undefined,
    headerComponent: 'h2',
    loading: false
  }
);

defineEmits<{
  (e: 'update:collapsed', collapsed: boolean): void; // eslint-disable-line no-unused-vars
}>();
</script>

<style scoped="scss">
.uic-panel-container {
  :deep([data-pc-section='header']) {
    @apply flex flex-row gap-2 items-center justify-between;
  }

  :deep([data-pc-section='icons']) {
    @apply flex flex-row items-center justify-center;

    .toggle-icon {
      transition: transform 0.3s;

      &:not(.collapsed) {
        transform: rotate(180deg);
      }
    }
  }

  :deep([data-pc-section='content']) {
    @apply pt-2;
  }
}
</style>
