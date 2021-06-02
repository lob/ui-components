<template>
  <fieldset
    role="radiogroup"
  >
    <legend :class="['text-sm font-normal normal-case tracking-normal text-gray-500 mb-1 border-b-0', {'sr-only': srOnlyLegend}]">
      {{ legend }}
    </legend>
    <div class="lob-switch-group flex p-1 bg-white rounded">
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

<style scoped lang="scss">
  .lob-switch-group {
    box-shadow: 0 5px 14px rgba(44, 67, 81, 0.13), 0 0 4px rgba(44, 67, 81, 0.02);
  }
</style>

