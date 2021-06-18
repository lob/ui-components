<template>
  <div
    :class="[
      { 'text-5xl font-bold': variant === 'heading1' },
      { 'text-3xl font-bold': variant === 'heading2' },
      { 'text-lg uppercase text-gray-500 font-medium': variant === 'heading3' },
      { 'text-sm text-gray-500': variant === 'caption' }
    ]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Typography',
  props: {
    variant: {
      type: String,
      default: 'body1',
      required: false,
      validator: (value) =>
        ['heading1', 'heading2', 'heading3', 'body1', 'caption'].indexOf(
          value
        ) !== -1
    }
  }
};
</script>
