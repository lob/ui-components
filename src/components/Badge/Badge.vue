<template>
  <div class="inline-block">
    <div
      :class="['flex justify-center align-center px-4 py-1 rounded-full text-gray-500 bg-gray-50',
               [ small ? '!type-xs-600' : 'type-small-600' ],
               { 'bg-blue-50 text-blue-600': info },
               { 'bg-green-50 text-green-700': success },
               { 'bg-orange-50 text-orange-600': warning },
               { 'bg-red-50 text-red-600': error },
               { 'bg-gradient-114 from-[#1876db] to-[#5748ff] !text-white': gradient }
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    variant: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['default', 'info', 'success', 'warning', 'error', 'gradient'].includes(value);
      }
    },
    size: {
      type: String,
      default: 'default',
      validator: function (value) {
        return ['default', 'small'].includes(value);
      }
    }
  },
  computed: {
    info () {
      return this.variant === 'info';
    },
    success () {
      return this.variant === 'success';
    },
    warning () {
      return this.variant === 'warning';
    },
    error () {
      return this.variant === 'error';
    },
    gradient () {
      return this.variant === 'gradient';
    },
    small () {
      return this.size === 'small';
    }
  }
};
</script>
