<template>
  <div
    :class="[
      { 'text-5xl mt-16 mb-2 font-bold': variant === 'heading1' },
      { 'text-3xl mt-10 mb-2 font-bold': variant === 'heading2' },
      { 'text-lg mt-6 mb-2 uppercase text-gray-500 font-medium': variant === 'heading3' },
      { 'my-2': variant === 'body1' },
      { 'text-sm my-2 text-gray-500': variant === 'caption' }
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
