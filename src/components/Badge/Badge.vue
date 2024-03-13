<template>
  <Chip :class="`badge variant-${variant} color-${color} size-${size}`">
    <Icon v-if="icon" :icon="icon" :size="size" />
    <slot />
  </Chip>
</template>

<script setup lang="ts">
import Chip from 'primevue/chip';

import { Icon } from '../Icon';
import { IconName } from '../Icon/types';
import { BadgeColor, BadgeSize, BadgeVariant } from './constants';

withDefaults(
  defineProps<{
    color?: BadgeColor;
    icon?: IconName;
    size?: BadgeSize;
    variant?: BadgeVariant;
  }>(),
  {
    color: BadgeColor.PRIMARY,
    icon: undefined,
    size: BadgeSize.MD,
    variant: BadgeVariant.PRIMARY
  }
);
</script>

<style scoped lang="scss">
.badge {
  @apply flex flex-row gap-1 items-center justify-center;
  @apply px-4 py-1 border rounded-full;

  &.size {
    &-sm {
      @apply type-xs-600;
    }
    &-md {
      @apply type-small-600;
    }
    &-lg {
      @apply type-base-600;
    }
  }

  &.variant {
    &-primary {
      @apply border-transparent;

      &.color {
        &-primary {
          @apply bg-gray-50 text-gray-500;
        }
        &-error {
          @apply bg-error-light text-error-dark;
        }
        &-info {
          @apply bg-info-light text-info-dark;
        }
        &-success {
          @apply bg-success-light text-success-dark;
        }
        &-upgrade {
          @apply bg-upgrade-light text-upgrade-dark;
        }
        &-warning {
          @apply bg-warning-light text-warning-dark;
        }
      }
    }

    &-outlined {
      @apply border bg-white;

      &.color {
        &-primary {
          @apply border-gray-500 text-gray-500;
        }
        &-error {
          @apply border-error-dark text-error-dark;
        }
        &-info {
          @apply border-info-dark text-info-dark;
        }
        &-success {
          @apply border-success-dark text-success-dark;
        }
        &-upgrade {
          @apply border-upgrade-dark text-upgrade-dark;
        }
        &-warning {
          @apply border-warning-dark text-warning-dark;
        }
      }
    }
  }
}
</style>
