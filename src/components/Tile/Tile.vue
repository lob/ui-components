<template>
  <ConditionalClickWrapper
    v-bind="$attrs"
    :to
    :target
    :class="isClickable ? computedClasses : undefined"
    :disabled
    @[onClick&&`click`]="$emit('click', $event)"
  >
    <Panel
      :class="!isClickable ? computedClasses : undefined"
      v-bind="!isClickable ? $attrs : undefined"
      data-testid="uic-tile"
    >
      <template #header>
        <slot name="header" />
        <LoadingSpinnerIcon v-if="$slots.default && loading" />
      </template>

      <template #icons>
        <div v-if="isClickable" class="uic-panel-click-icon">
          <Icon :icon="IconName.NEXT" />
        </div>
      </template>

      <template #default>
        <template v-if="!$slots.default && loading">
          <Skeleton :height="size === TileSize.LG ? '32px' : '28px'" />
        </template>
        <Alert v-else-if="error" variant="error">
          {{ error }}
        </Alert>
        <template v-else>
          <div :class="['uic-panel-content', { loading }]">
            <slot name="default" />
            <p
              v-if="$slots['subtext']"
              :class="['uic-panel-subcontent', { loading }]"
            >
              <slot name="subtext" />
            </p>
          </div>
        </template>
      </template>
    </Panel>
  </ConditionalClickWrapper>
</template>

<script setup lang="ts">
import Alert from '@/components/Alert/Alert.vue';
import ConditionalClickWrapper from '@/utils/ConditionalClickWrapper.vue';
import Panel from 'primevue/panel';
import { computed } from 'vue';

import { TileColor, TileSize } from './constants';
import { Icon, IconName } from '../Icon';
import { LoadingSpinnerIcon } from '../LoadingSpinnerIcon';
import { Skeleton } from '../Skeleton';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    color?: TileColor;
    disabled?: boolean;
    error?: string;
    loading?: boolean;
    onClick?: (e: MouseEvent) => void; // eslint-disable-line no-unused-vars
    target?: string;
    to?: string;
    size?: TileSize;
  }>(),
  {
    color: TileColor.NEUTRAL,
    disabled: false,
    error: undefined,
    loading: false,
    onClick: undefined,
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

const isClickable = computed(() => Boolean(props.onClick) || props.to);
const computedClasses = computed(() => [
  `uic-panel size-${props.size} color-${props.color}`,
  { clickable: isClickable.value, disabled: props.disabled }
]);
</script>

<style lang="scss">
.uic-panel {
  @apply tile-container;

  @apply relative;
  @apply flex flex-col justify-center;
  @apply p-6 min-w-fit;

  &-content {
    @apply flex flex-row items-end;
    @apply transition-colors;

    &.loading {
      @apply text-gray-300;
    }
  }

  &-subcontent {
    @apply ml-4;
    @apply type-small-400;
    @apply transition-colors;

    &.loading {
      @apply text-gray-200;
    }
  }

  &:not(.disabled).clickable {
    &:hover {
      .uic-panel-click-icon {
        @apply bg-gray-100;
      }
    }
  }

  [data-pc-section='header'] {
    @apply flex flex-row items-center gap-1;
    @apply text-base text-gray-600;
  }

  [data-pc-section='content'] {
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
    [data-pc-section='content'] {
      @apply text-xl;
    }
  }
  &.size-lg {
    [data-pc-section='content'] {
      @apply text-2xl;
    }
  }

  [data-pc-section='icons'] {
    @apply ml-auto;
  }
}

.uic-panel-click-icon {
  @apply rounded-full p-0.5;
  @apply bg-gray-50;
  @apply text-gray-800;
  @apply transition-colors;
}
</style>
