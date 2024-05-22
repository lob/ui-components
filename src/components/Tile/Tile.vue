<template>
  <ConditionalLinkWrapper
    v-bind="$attrs"
    :to="clickable ? to : undefined"
    :target="target"
    :class="clickable && to ? computedClasses : 'undefined'"
  >
    <ConditionalWrapper
      :tag="clickable ? 'button' : undefined"
      v-bind="$attrs"
      :class="clickable && !to ? computedClasses : 'outline-none'"
      :disabled
      @click="$emit('click', $event)"
    >
      <Panel
        :class="!clickable ? computedClasses : 'undefined'"
        v-bind="!clickable ? $attrs : undefined"
        data-testid="uic-tile"
      >
        <template #header>
          <slot name="header" />
        </template>

        <template #icons>
          <div v-if="clickable" class="uic-panel-click-icon">
            <Icon :icon="IconName.NEXT" />
          </div>
        </template>

        <template #default>
          <template v-if="loading">
            <LoadingSpinnerIcon
              :width="size === TileSize.LG ? '32' : '28'"
              :height="size === TileSize.LG ? '32' : '28'"
            />
          </template>
          <Alert v-else-if="error" variant="error">
            {{ error }}
          </Alert>
          <template v-else>
            <div class="flex flex-row items-end">
              <slot name="default" />
              <p
                v-if="$slots['subtext']"
                class="ml-4 type-small-400 text-gray-600"
              >
                <slot name="subtext" />
              </p>
            </div>
          </template>
        </template>
      </Panel>
    </ConditionalWrapper>
  </ConditionalLinkWrapper>
</template>

<script setup lang="ts">
import Alert from '@/components/Alert/Alert.vue';
import { Icon, IconName } from '../Icon';
import Panel from 'primevue/panel';
import { computed } from 'vue';

import ConditionalWrapper from '@/utils/ConditionalWrapper.vue';
import ConditionalLinkWrapper from '@/utils/ConditionalLinkWrapper.vue';
import { TileColor, TileSize } from './constants';
import { LoadingSpinnerIcon } from '../LoadingSpinnerIcon';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    clickable?: boolean;
    color?: TileColor;
    disabled?: boolean;
    error?: string;
    loading?: boolean;
    target?: string;
    to?: string;
    size?: TileSize;
  }>(),
  {
    color: TileColor.NEUTRAL,
    clickable: false,
    disabled: false,
    error: undefined,
    loading: false,
    target: undefined,
    to: undefined,
    size: TileSize.MD
  }
);

defineEmits<{
  (e: 'click', event: MouseEvent): void; // eslint-disable-line no-unused-vars
}>();

defineSlots<{
  header(): any;
  default(): any;
  subtext(): any;
}>();

const computedClasses = computed(() => [
  `uic-panel size-${props.size} color-${props.color}`,
  { clickable: props.clickable, disabled: props.disabled }
]);
</script>

<style scoped lang="scss">
.uic-panel {
  @apply relative;
  @apply flex flex-col justify-center;
  @apply p-6 min-w-fit rounded-2xl;
  @apply border-line-grey border;
  @apply bg-white;
  @apply transition-colors;
  box-shadow: none !important;

  &:focus-within {
    @apply outline-offset-2;
    @apply outline-dashed;
  }

  &:not(.disabled).clickable {
    &:hover {
      @apply cursor-pointer;
      @apply border-gray-800;

      .uic-panel-click-icon {
        @apply bg-gray-100;
      }
    }
  }

  &.disabled {
    @apply cursor-not-allowed;
  }

  :deep([data-pc-section='header']) {
    @apply flex flex-row items-center gap-1;
    @apply text-base text-gray-600;
  }

  :deep([data-pc-section='content']) {
    @apply mt-2 font-semibold;
  }
  &.color-neutral {
    @apply text-gray-800;
  }
  &.color-error {
    @apply text-error;
  }
  &.color-success {
    @apply text-success;
  }
  &.size-md {
    :deep([data-pc-section='content']) {
      @apply text-xl;
    }
  }
  &.size-lg {
    :deep([data-pc-section='content']) {
      @apply text-2xl;
    }
  }

  :deep([data-pc-section='icons']) {
    @apply absolute top-6 right-6;
  }
}

.uic-panel-click-icon {
  @apply rounded-full p-0.5;
  @apply bg-gray-50;
  @apply text-gray-800;
  @apply transition-colors;
}
</style>
