<template>
  <span>
    <label
      :for="labelFor"
      :class="[
        {'flex items-center justify-between mb-2 text-sm text-gray-500': !srOnlyLabel},
        { 'sr-only': srOnlyLabel }
      ]"
    >
      <span>
        {{ label }}
        <span
          v-if="required"
          class="text-sm text-turquoise-900"
        >
          *
        </span>
      </span>
      <Tooltip
        v-if="tooltipContent"
        position="left"
      >
        <template #trigger>
          <Info class="w-5 h-5" />
        </template>
        <template #content>
          <p class="w-48">
            {{ tooltipContent }}
          </p>
        </template>
      </Tooltip>
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
    tooltipContent: { type: String, default: null }
  },
  computed: {
    tooltip () {
      return this.$slots.tooltip;
    }
  }
});
</script>
