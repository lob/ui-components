<template>
  <fieldset
    :class="[
      'border-none flex'
    ]"
  >
    <legend :class="[{'text-sm font-normal normal-case tracking-normal text-gray-500 mb-1 border-b-0':!srOnlyLegend}, {'sr-only': srOnlyLegend}]">
      {{ legend }}
      <span
        v-if="required"
        class="text-sm text-error"
      >
        *
      </span>
    </legend>
    <div
      :class="[
        'flex',
        {'flex-col' : separateLines}
      ]"
    >
      <slot />
    </div>
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
