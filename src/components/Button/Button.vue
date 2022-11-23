<template>
  <button
    :class="[
      'flex justify-center items-center rounded-full',
      { 'type-xs-700 py-2 px-4' : primary && small },
      { 'type-small-700 py-2 px-4' : primary && medium },
      { 'type-small-700 py-3 px-5' : primary && large },
      { 'type-base-700 py-[14px] px-6' : primary && xlarge },
      { 'cursor-not-allowed': disabled },
      { 'bg-black text-white hover:bg-gray-700 active:bg-gray-800 focus:bg-gray-800 focus:outline-dashed focus:outline-black focus:outline-offset-1 disabled:bg-gray-200 disabled:text-gray-400' : primary && !danger },
      { 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus:bg-red-600 focus:outline-dashed focus:outline-black focus:outline-offset-1 disabled:bg-red-200 disabled:text-red-400' : primary && danger }
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <span class="flex justify-between items-center">
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  name: 'LobButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: function (value) {
        return ['primary', 'secondary', 'link'].includes(value);
      }
    },
    size: {
      type: String,
      default: 'large',
      validator: function (value) {
        return ['small', 'medium', 'large', 'xl'].includes(value);
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    danger: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  computed: {
    primary () {
      return this.variant === 'primary';
    },
    secondary () {
      return this.variant === 'secondary';
    },
    link () {
      return this.variant === 'link';
    },
    small () {
      return this.size === 'small';
    },
    medium () {
      return this.size === 'medium';
    },
    large () {
      return this.size === 'large';
    },
    xlarge () {
      return this.size === 'xl';
    }
  },
  methods: {
    handleClick ($event) {
      this.$emit('click', $event);
    }
  }
};
</script>
