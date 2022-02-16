<template>
  <fieldset
    role="radiogroup"
  >
    <legend :class="[{'text-sm font-normal normal-case tracking-normal text-gray-500 mb-2 border-b-0': !srOnlyLegend}, {'sr-only': srOnlyLegend}]">
      {{ legend }}
    </legend>
    <div :class="['shadow flex flex-wrap p-1 bg-white rounded', { 'justify-center': center }]">
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
    },
    center: {
      type: Boolean,
      default: false
    }
  }
};
</script>

