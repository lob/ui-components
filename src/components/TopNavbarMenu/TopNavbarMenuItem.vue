<template>
  <div
    :class="[
      {'pb-2': small},
      {'pb-4': !small}
    ]"
  >
    <component
      :is="isExternal ? 'a' : 'router-link'"
      :[linkProp]="to"
      class="flex pt-1 flex-nowrap items-center hover:text-primary-500"
    >
      <img
        :src="imageSource"
        alt=""
        :class="[
          'self-center transition-transform duration-200 ease-linear transform hover:scale-110',
          {'w-10 h-10': small},
          {'w-12 h-12': !small}]"
      >
      <div class="pl-2 text-gray-900">
        <span
          :class="['pt-1.5 opacity-75 transition-colors transition-opacity no-underline md:pb-0.5 md:text-lg block relative align-top mx-auto whitespace-nowrap border-none text-normal', {'py-1': small}]"
        >
          <slot />
        </span>
        <div
          v-if="subtitle"
          class="opacity-80 pr-0 text-gray-700 text-sm hidden md:block"
        >
          {{ subtitle }}
        </div>
      </div>
    </component>
  </div>
</template>

<script>
export default {
  name: 'TopNavbarMenuItem',
  props: {
    to: {
      type: String,
      required: true
    },
    imageSource: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isExternal () {
      const protocolRelativePattern = /^https?:\/\/|^\/\//i;
      return protocolRelativePattern.test(this.to);
    },
    linkProp () {
      return this.isExternal ? 'href' : 'to';
    }
  }
};
</script>
