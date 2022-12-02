<template>
  <span>
    <label
      :for="labelFor"
      :class="[
        readOnly ? 'text-gray-300' : 'text-gray-800',
        srOnlyLabel ? 'sr-only' : 'flex items-center mb-1 type-small-700'
      ]"
    >
      <Tooltip
        v-if="tooltipContent"
        position="right"
        class="mr-1"
      >
        <template #trigger>
          <Info class="w-4 h-4 text-gray-500" />
        </template>
        <template #content>
          <p class="w-48">
            {{ tooltipContent }}
          </p>
        </template>
      </Tooltip>
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
import Info from '../Icons/Info.vue';

export default defineComponent({
  name: 'LobLabel',
  components: {
    Tooltip,
    Info
  },
  props: {
    label: { type: String, required: true },
    labelFor: { type: String, required: true },
    required: { type: Boolean, default: false },
    srOnlyLabel: { type: Boolean, default: false },
    tooltipContent: { type: String, default: null },
    readOnly: { type: Boolean, default: false }
  },
  computed: {
    tooltip () {
      return this.$slots.tooltip;
    }
  }
});
</script>
