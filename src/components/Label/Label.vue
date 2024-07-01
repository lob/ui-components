<template>
  <span
    :class="[
      readOnly ? 'text-gray-300' : 'text-gray-800',
      srOnlyLabel ? 'sr-only' : 'flex items-center mb-1 type-small-500',
      {
        'justify-between flex-row-reverse':
          tooltipContent && tooltipPosition === 'trailing'
      }
    ]"
    data-testid="labelWrapper"
  >
    <span
      v-if="tooltipContent"
      v-tooltip.bottom="tooltipContent"
      data-testid="uic-tooltip-icon"
      :class="[
        'text-gray-500',
        {
          'mr-1': tooltipContent && tooltipPosition !== 'trailing'
        }
      ]"
    >
      <Icon icon="CircleInfo" />
    </span>
    <label :for="labelFor">
      <span>
        {{ label }}
        <span v-if="required" class="ml-1 text-small-700 text-red-500">
          *
        </span>
      </span>
    </label>
    <slot />
  </span>
</template>

<script>
import { defineComponent } from 'vue';
import { Icon } from '../Icon';

export default defineComponent({
  name: 'LobLabel',
  components: {
    Icon
  },
  props: {
    label: { type: String, required: true },
    labelFor: { type: String, required: true },
    required: { type: Boolean, default: false },
    srOnlyLabel: { type: Boolean, default: false },
    tooltipContent: { type: String, default: null },
    tooltipPosition: {
      type: String,
      default: 'leading',
      validator: function (value) {
        return ['leading', 'trailing'].includes(value);
      }
    },
    readOnly: { type: Boolean, default: false }
  },
  computed: {
    tooltip() {
      return this.$slots.tooltip;
    }
  }
});
</script>
