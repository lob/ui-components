<template>
  <Panel
    v-model:collapsed="collapsed"
    class="uic-panel-container"
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
  >
    <template #header>
      <button class="uic-panel-header-button" @click="collapsed = !collapsed">
        <component
          :is="headerComponent"
          class="type-base-600 flex flex-row gap-2 items-center"
        >
          <slot name="header">
            {{ header }}
          </slot>
          <LoadingSpinnerIcon v-if="loading" />
        </component>
        <Icon
          :class="['toggle-icon', { collapsed }]"
          data-testid="uic-panel-toggle-icon"
          icon="Collapse"
          size="lg"
        />
      </button>
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
    header?: string;
    headerComponent?: string;
    loading?: boolean;
  }>(),
  {
    header: undefined,
    headerComponent: 'h2',
    loading: false
  }
);

defineEmits<{
  (e: 'update:collapsed'): void; // eslint-disable-line no-unused-vars
}>();

const collapsed = defineModel<boolean>('collapsed', { default: false });
</script>

<style scoped="scss">
.uic-panel-container {
  @apply flex flex-col;
  @apply w-full p-4;
  @apply rounded-md;
  @apply border-line-grey border;
  @apply bg-white;

  .uic-panel-header-button {
    @apply flex flex-row gap-2 items-center justify-between;
    width: calc(100% + 1rem);
    @apply -m-2 p-2;
    @apply rounded-md;
    @apply transition-colors;

    &:hover {
      @apply bg-gray-25;
    }
  }

  .toggle-icon {
    transition: transform 0.3s;

    &:not(.collapsed) {
      transform: rotate(180deg);
    }
  }

  :deep([data-pc-section='content']) {
    @apply pt-2;
  }
}
</style>
