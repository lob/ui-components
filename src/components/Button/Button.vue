<template>
  <button
    :style="styleObject"
    :class="buttonType"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      required: true
    },
    height: {
      type: Number,
      default: 50
    },
    neutral: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    fullWidth: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      styleObject: {
        height: `${this.height}px`,
        width: this.fullWidth === true ? '100%' : ''
      },
      classes: {
        normal: [
          'bg-primary-l',
          'hover:bg-primary',
          'text-white',
          'py-2',
          'px-4',
          'rounded'
        ],
        neutral: [
          'bg-white',
          'text-gray-d',
          'border-solid',
          'border-2',
          'border-gray-l',
          'py-2',
          'px-4',
          'rounded'
        ]
      }
    };
  },
  computed: {
    buttonType () {
      return this.neutral ? this.classes.neutral : this.classes.normal;
    }
  }
};
</script>

<style scoped lang="scss">
</style>
