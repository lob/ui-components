<template>
  <fieldset class="border-none m-0 p-0">
    <legend :class="['legend text-sm font-normal normal-case tracking-normal text-gray-d mb-1 border-b-0', {'sr-only': srOnlyLegend}]">
      {{ legend }}
      <span
        v-if="required"
        class="text-sm text-teal-xd"
      >
        *
      </span>
    </legend>
    <slot />
  </fieldset>
</template>

<script>
export default {
  name: 'RadioGroup',
  props: {
    legend: {
      type: String,
      default: ''
    },
    srOnlyLegend: {
      type: Boolean,
      default: false
    },
    separateLines: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  }
};
</script>
