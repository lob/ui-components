<template>
  <Chip
    :class="[`uic-chip color-${color} size-${size} variant-${variant}`]"
    data-testid="uic-chip"
  >
    <template #icon>
      <Icon :icon="icon" />
    </template>
  </Chip>
</template>

<script setup lang="ts">
import Chip from 'primevue/chip';
import { Icon, IconName } from '@/components/Icon';
import { ChipColor, ChipSize, ChipVariant } from './constants';

withDefaults(
  defineProps<{
    color?: ChipColor;
    icon: IconName;
    size?: ChipSize;
    variant?: ChipVariant;
  }>(),
  {
    color: ChipColor.NEUTRAL,
    size: ChipSize.MD,
    variant: ChipVariant.PRIMARY
  }
);
</script>

<style scoped lang="scss">
.uic-chip {
  @apply inline-block;

  &.size {
    &-md {
      @apply p-0.5 rounded-md;
    }
  }

  &.variant {
    &-primary {
      &.color {
        &-error {
          @apply text-error;
          @apply bg-error-light;
        }

        &-neutral {
          @apply text-gray-800;
          @apply bg-gray-50;
        }

        &-success {
          @apply text-success;
          @apply bg-success-light;
        }

        &-upgrade {
          @apply text-upgrade;
          @apply bg-upgrade-light;
        }

        &-warning {
          @apply text-warning;
          @apply bg-warning-light;
        }
      }
    }
  }
}
</style>
