<template>
  <fieldset class="border-none m-0 p-0">
    <legend :class="['tw-text-sm tw-font-normal tw-normal-case tw-tracking-normal tw-text-gray-d tw-mb-1 tw-border-b-0', {'tw-sr-only': srOnlyLegend}]">
      {{ legend }}
      <span
        v-if="required"
        class="tw-text-sm tw-text-teal-xd"
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
