<template>
  <ConditionalClickWrapper
    v-bind="$attrs"
    :to
    :target
    :disabled
    :class="`uic-icon-button size-${size} color-${color} variant-${variant}`"
    :data-testid="$attrs['data-testid'] || 'uic-icon-button'"
    @click="$emit('click', $event)"
  >
    <Icon :icon="icon" :size="iconSize" />
  </ConditionalClickWrapper>
</template>

<script setup lang="ts">
import Icon from '@/components/Icon/Icon.vue';
import { IconName } from '@/components/Icon/types';
import { Size } from '@/types';
import ConditionalClickWrapper from '@/utils/ConditionalClickWrapper.vue';
import { AnchorHTMLAttributes, computed, defineOptions } from 'vue';

defineOptions({ inheritAttrs: false });

import {
  IconButtonColor,
  IconButtonSize,
  IconButtonVariant
} from './constants';

const props = withDefaults(
  defineProps<{
    color?: IconButtonColor;
    disabled?: boolean;
    icon: IconName;
    onClick?: (e: MouseEvent) => void; // eslint-disable-line no-unused-vars
    size?: IconButtonSize;
    target?: AnchorHTMLAttributes['target'];
    to?: string;
    variant?: IconButtonVariant;
  }>(),
  {
    color: IconButtonColor.NEUTRAL,
    disabled: false,
    onClick: undefined,
    size: IconButtonSize.MD,
    target: undefined,
    to: undefined,
    variant: IconButtonVariant.PRIMARY
  }
);

defineEmits<{
  (e: 'click', payload: MouseEvent): void; // eslint-disable-line no-unused-vars
}>();

const iconSize = computed(() => {
  if (props.size === IconButtonSize.XS) {
    return Size.SM;
  }
  if (props.size === IconButtonSize.SM) {
    return Size.MD;
  }
  if (props.size === IconButtonSize.MD || props.size === IconButtonSize.LG) {
    return Size.XL;
  }
  return Size.XXL;
});
</script>

<style lang="scss">
.uic-icon-button {
  @apply block;
  @apply rounded-lg;

  &:disabled {
    @apply cursor-not-allowed;
  }

  &.size- {
    &xs {
      @apply p-1;
    }
    &sm {
      @apply p-2;
    }
    &md {
      @apply p-2;
    }
    &lg {
      @apply p-3;
    }
    &xl {
      @apply p-[14px];
    }
  }

  &.variant- {
    &primary {
      &.color- {
        &error {
          @apply bg-error;
          @apply text-white;

          &:hover {
            @apply bg-error-dark;
          }

          &:active,
          &:focus {
            @apply bg-red-700;
          }

          &:disabled {
            @apply bg-red-200;
            @apply text-red-400;
          }
        }
        &info {
          @apply bg-info;
          @apply text-white;

          &:hover {
            @apply bg-info-dark;
          }

          &:active,
          &:focus {
            @apply bg-blue-700;
          }

          &:disabled {
            @apply bg-blue-200;
            @apply text-blue-400;
          }
        }
        &neutral {
          @apply bg-black;
          @apply text-white;

          &:hover {
            @apply bg-gray-700;
          }

          &:active,
          &:focus {
            @apply bg-gray-800;
          }

          &:disabled {
            @apply bg-gray-100;
            @apply text-gray-300;
          }
        }
        &success {
          @apply bg-success;
          @apply text-white;

          &:hover {
            @apply bg-success-dark;
          }

          &:active,
          &:focus {
            @apply bg-green-700;
          }

          &:disabled {
            @apply bg-green-200;
            @apply text-green-400;
          }
        }
        &upgrade {
          @apply bg-upgrade;
          @apply text-white;

          &:hover {
            @apply bg-upgrade-dark;
          }

          &:disabled {
            @apply bg-purple-200;
            @apply text-purple-400;
          }
        }
        &warning {
          @apply bg-warning;
          @apply text-white;

          &:hover {
            @apply bg-warning-dark;
          }

          &:active,
          &:focus {
            @apply bg-orange-700;
          }

          &:disabled {
            @apply bg-orange-200;
            @apply text-orange-400;
          }
        }
      }
    }

    &outlined {
      @apply bg-white;
      @apply border;

      &.color- {
        &error {
          @apply border-error;
          @apply text-error;

          &:hover {
            @apply bg-error-light;
            @apply text-error-dark;
            @apply border-error-dark;
          }

          &:active,
          &:focus {
            @apply bg-red-100;
            @apply text-red-700;
            @apply border-red-700;
          }

          &:disabled {
            @apply bg-white;
            @apply border-red-300;
            @apply text-red-300;
          }
        }
        &info {
          @apply border-info;
          @apply text-info;

          &:hover {
            @apply bg-info-light;
            @apply text-info-dark;
            @apply border-info-dark;
          }

          &:active,
          &:focus {
            @apply bg-blue-100;
            @apply text-blue-700;
            @apply border-blue-700;
          }

          &:disabled {
            @apply bg-white;
            @apply border-blue-300;
            @apply text-blue-300;
          }
        }
        &neutral {
          @apply border-gray-100;
          @apply text-gray-800;

          &:hover {
            @apply bg-gray-50;
            @apply border-gray-200;
          }

          &:active,
          &:focus {
            @apply bg-gray-100;
            @apply border-gray-200;
          }

          &:disabled {
            @apply bg-white;
            @apply border-gray-200;
            @apply text-gray-400;
          }
        }
        &success {
          @apply border-success;
          @apply text-success;

          &:hover {
            @apply bg-success-light;
            @apply text-success-dark;
            @apply border-success-dark;
          }

          &:active,
          &:focus {
            @apply bg-green-100;
            @apply text-green-700;
            @apply border-green-700;
          }

          &:disabled {
            @apply bg-white;
            @apply border-green-300;
            @apply text-green-300;
          }
        }
        &upgrade {
          @apply border-upgrade;
          @apply text-upgrade;

          &:hover {
            @apply bg-upgrade-light;
            @apply text-upgrade-dark;
            @apply border-upgrade-dark;
          }

          &:active,
          &:focus {
            @apply bg-purple-100;
            @apply text-purple-700;
            @apply border-purple-700;
          }

          &:disabled {
            @apply bg-white;
            @apply border-purple-300;
            @apply text-purple-300;
          }
        }
        &warning {
          @apply border-warning;
          @apply text-warning;

          &:hover {
            @apply bg-warning-light;
            @apply text-warning-dark;
            @apply border-warning-dark;
          }

          &:active,
          &:focus {
            @apply bg-orange-100;
            @apply text-orange-700;
            @apply border-orange-700;
          }

          &:disabled {
            @apply bg-white;
            @apply border-orange-300;
            @apply text-orange-300;
          }
        }
      }
    }

    &text {
      @apply rounded-full;
      @apply transition-colors;

      &.color- {
        &error {
          @apply text-error-dark;

          &:hover {
            @apply bg-error-light;
          }

          &:active,
          &:focus {
            @apply bg-red-100;
          }

          &:disabled {
            @apply bg-error-light;
            @apply text-red-300;
          }
        }
        &info {
          @apply text-info-dark;

          &:hover {
            @apply bg-info-light;
          }

          &:active,
          &:focus {
            @apply bg-blue-100;
          }

          &:disabled {
            @apply bg-info-light;
            @apply text-blue-300;
          }
        }
        &neutral {
          @apply text-gray-800;

          &:hover {
            @apply bg-gray-50;
          }

          &:active,
          &:focus {
            @apply bg-gray-100;
          }

          &:disabled {
            @apply bg-gray-25;
            @apply text-gray-400;
          }
        }
        &success {
          @apply text-success-dark;

          &:hover {
            @apply bg-success-light;
          }

          &:active,
          &:focus {
            @apply bg-green-100;
          }

          &:disabled {
            @apply bg-success-light;
            @apply text-green-400;
          }
        }
        &upgrade {
          @apply text-upgrade-dark;

          &:hover {
            @apply bg-upgrade-light;
          }

          &:active,
          &:focus {
            @apply bg-purple-100;
          }

          &:disabled {
            @apply bg-upgrade-light;
            @apply text-purple-300;
          }
        }
        &warning {
          @apply text-warning-dark;

          &:hover {
            @apply bg-warning-light;
          }

          &:active,
          &:focus {
            @apply bg-orange-100;
          }

          &:disabled {
            @apply bg-warning-light;
            @apply text-orange-300;
          }
        }
      }
    }
  }
}
</style>
