<template>
  <fieldset role="radiogroup">
    <legend :class="[{'text-sm font-normal normal-case tracking-normal text-gray-500 mb-2 border-b-0': !srOnlyLegend}, {'sr-only': srOnlyLegend}]">
      {{ legend }}
    </legend>
    <div :class="['flex flex-wrap bg-white p-[1px] border border-gray-100 rounded-sm focus-within:outline-dotted focus-within:outline-black focus-within:outline-offset-1', { 'justify-center': center }]">
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

