<template>
  <fieldset class="fieldset">
    <legend :class="['legend', {'legend--sr-only': srOnlyLegend}]">
      {{ legend }}
      <span
        v-if="required"
        class="legend--required"
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

<style scoped lang="scss">
  .fieldset {
    border: none;
    margin: 0;
    padding: 0;
  }

  .legend {
    font-size: 14px;
    line-height: 18px;
    font-weight: 400;
    text-transform: none;
    letter-spacing: 1px;
    color: var(--color-gray-shadow);
    border-bottom: none;
    margin-bottom: 5px;
  }

  .legend--sr-only {
    border: 0;
    clip: rect(0 0 0 0);
    clip-path: polygon(0px 0px, 0px 0px, 0px 0px);
    -webkit-clip-path: polygon(0px 0px, 0px 0px, 0px 0px);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap;
  }

  .legend--required {
    font-size: 14px;
    color: var(--color-turquoise-xd);
  }
</style>
