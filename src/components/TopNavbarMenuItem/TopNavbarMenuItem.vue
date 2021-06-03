<template>
  <div :class="[ 
      {'pb-2': small}, 
      {'pb-4': !small}
    ]">
    <a :href="href" class="flex pt-1 flex-nowrap items-center hover:text-primary-500">
      <img :src="imageSource" alt="" 
        :class="[
        'self-center transition-transform duration-200 ease-linear transform hover:scale-110', 
        {'w-10 h-10': small}, 
        {'w-12 h-12': !small}]"
      >
      <div class="pl-2 text-gray-900">
        <span
          :class="['pt-1.5 opacity-75 transition-colors transition-opacity no-underline md:pb-0.5 md:text-lg block relative align-top mx-auto whitespace-nowrap border-none text-normal', {'py-1': small}]"> 
          <slot></slot>
        </span>
        <div class="opacity-80 pr-0 text-gray-700 text-sm hidden md:block" v-if="subtitle">{{ subtitle }}</div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'TopNavbarMenuItem',
  props: {
    href: {
      type: String,
      required: true
    },
    imageSource: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: false
    },
    small: {
      type: Boolean,
      default: false
    }
  }
};
</script>