<template>
  <span>
    <label
      :for="labelFor"
      :class="['flex items-center justify-between mb-2 text-sm text-gray-500', {'sr-only': srOnlyLabel}]"
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
        <span
          v-if="iconRight"
          class="pt-1 pb-1"
          >
          <slot name="iconRight" />
        </span>
    </label>
  </span>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'LobLabel',
  props: {
    label: { type: String, required: true },
    labelFor: { type: String, required: true },
    required: { type: Boolean, default: false },
    srOnlyLabel: { type: Boolean, default: false }
  },
  computed: {
    iconRight () {
      return this.$slots.iconRight;
    }
  }
});
</script>
