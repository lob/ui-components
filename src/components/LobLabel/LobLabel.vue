<template>
  <span>
    <label
      :for="labelFor"
      :class="['block mb-2 text-sm text-gray-500', {'sr-only': srOnlyLabel}]"
    >
      {{ label }}
      <span
        v-if="required"
        class="text-sm text-turquoise-900"
      >
        *
      </span>
    </label>
    <slot />
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
  }
});
</script>
