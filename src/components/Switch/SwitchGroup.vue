<template>
  <fieldset role="radiogroup">
    <legend
      :class="[
        {
          'text-sm type-small-300 text-gray-500 mb-1 border-b-0': !srOnlyLegend
        },
        { 'sr-only': srOnlyLegend }
      ]"
    >
      {{ legend }}
    </legend>
    <div
      :class="[
        'customOutline flex flex-wrap bg-white p-[1px] border border-gray-100 rounded-sm',
        { 'justify-center': center }
      ]"
    >
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

<style lang="scss" scoped>
.customOutline:has(:focus-visible) {
  @apply outline-1;
  @apply outline-dashed;
  @apply outline-black;
  @apply outline-offset-1;
}
</style>
