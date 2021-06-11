<template>
  <fieldset
    role="radiogroup"
  >
    <legend :class="['text-sm font-normal normal-case tracking-normal text-gray-500 mb-1 border-b-0', {'sr-only': srOnlyLegend}]">
      {{ legend }}
    </legend>
    <div class="shadow flex p-1 bg-white rounded">
      <slot />
    </div>
  </fieldset>
</template>

<script>
export default {
  name: 'SwitchGroup',
  props: {
    legend: {
      type: String,
      required: true
    },
    srOnlyLegend: {
      type: Boolean,
      default: false
    }
  }
};
</script>

