<template>
  <span
    :class="[
      readOnly ? 'text-gray-300' : 'text-gray-800',
      srOnlyLabel ? 'sr-only' : 'flex items-center mb-1 type-small-700',
      { 'justify-between flex-row-reverse': tooltipContent && (tooltipPosition === 'trailing') }
    ]"
  >
    <Tooltip
      v-if="tooltipContent"
      position="bottom"
      :class="['text-gray-500', { 'mr-1': tooltipPosition === 'leading' }]"
      :data-testid="tooltipPosition === 'trailing' ? 'tooltip-trailing' : 'tooltip-leading'"
    >
      <template #trigger>
        <CircleInfo />
      </template>
      <template #content>
        <p class="w-max max-w-[200px]">
          {{ tooltipContent }}
        </p>
      </template>
    </Tooltip>
    <label :for="labelFor">
      <span>
        {{ label }}
        <span
          v-if="required"
          class="ml-1 text-small-700 text-red-500"
        >
          *
        </span>
      </span>
    </label>
    <slot />
  </span>
</template>

<script>
import { defineComponent } from 'vue';
import Tooltip from '../Tooltip/Tooltip.vue';
import CircleInfo from '../Icons/CircleInfo.vue';

export default defineComponent({
  name: 'LobLabel',
  components: {
    Tooltip,
    CircleInfo
  },
  props: {
    label: { type: String, required: true },
    labelFor: { type: String, required: true },
    required: { type: Boolean, default: false },
    srOnlyLabel: { type: Boolean, default: false },
    tooltipContent: { type: String, default: null },
    tooltipPosition: { type: String, default: 'leading',
      validator: function (value) {
        return ['leading', 'trailing'].includes(value);
      } },
    readOnly: { type: Boolean, default: false }
  },
  computed: {
    tooltip () {
      return this.$slots.tooltip;
    }
  }
});
</script>
