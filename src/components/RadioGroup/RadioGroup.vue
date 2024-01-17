<template>
  <fieldset :class="['border-none flex']">
    <legend
      :class="srOnlyLegend ? 'sr-only' : 'type-small-700 text-black mb-1.5'"
    >
      {{ legend }}
      <span v-if="required" class="text-sm text-red-500"> * </span>
    </legend>
    <div :class="['flex w-full', { 'flex-col': separateLines }]">
      <slot />
    </div>
  </fieldset>
</template>

<script>
export default {
  name: "RadioGroup",
  props: {
    legend: {
      type: String,
      default: "",
    },
    srOnlyLegend: {
      type: Boolean,
      default: false,
    },
    separateLines: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
