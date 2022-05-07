<template>
  <input
    type="radio"
    :class="[
      'megabutton rounded-lg items-center py-9 px-8 border-4 border-transparent flex flex-col relative',
      'disabled:text-gray-500',
      'focus:focus-border focus:ring-3 focus:ring-primary-100',
      'hover:border-radius hover:ring-primary-100',
      { '!pt-11 !pb-6': withDisabledBanner },
      { 'disabled-text strikethrough cursor-not-allowed border-2 border-gray-100': disabled },
      { 'strikethrough': disabled && !withDisabledBanner },
      { 'shadow': !disabled },
      { 'w-72': contentWithoutImage },
      { 'box': contentWithImage }
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
  <div
    v-if="withDisabledBanner"
    class="disabled-banner uppercase text-lg font-semibold absolute mx-0 top-0 left-0 right-0 w-full h-8"
  >
    {{ disabledBanner }}
  </div>
  <div class="">
    <div v-if="contentWithImage">
      <img src="imageSource">
    </div>

    <div :class="[{ 'text-left text-lg font-semibold mt-6': withContent }, { 'text-center text-xl': largeText }]">
      {{ title }}
    </div>
    <div
      v-if="withContent"
      class="text-left"
    >
      <p>{{ content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MegaButton',
  props: {
    // TODO: make this accept slots as well
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledBanner: {
      type: String,
      default: null
    },
    imageSource: {
      type: String,
      default: null
    }
  },
  emits: ['click'],
  computed: {
    contentWithoutImage () {
      return !this.imageSource && this.title && this.content;
    },
    contentWithImage () {
      return this.imageSource && this.title && this.content;
    },
    largeText () {
      return !this.imageSource && this.title && !this.content;
    },
    withContent () {
      return this.title && this.content;
    },
    withDisabledBanner () {
      return this.disabled && this.disabledBanner;
    }
  },
  methods: {
    handleClick ($event) {
      this.$emit('click', $event);
    }
  }
};
</script>

<style scoped lang="scss">
.box {
  height: 15em;
  width: 15em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}
.light-shadow {
  box-shadow: 0px 4.31695px 12.9508px rgba(0, 0, 0, 0.08);
}

.shadow {
  box-shadow: 0px 2.1550705432891846px 3.6636199951171875px 0px rgba(0, 0, 0, 0.0169);

  box-shadow: 0px 9.482311248779297px 7.585848808288574px 0px rgba(0, 0, 0, 0.0275);

  box-shadow: 0px 23.274761199951172px 15.128595352172852px 0px rgba(0, 0, 0, 0.035);

  box-shadow: 0px 44.825469970703125px 29.653770446777344px 0px rgba(0, 0, 0, 0.0425);

  box-shadow: 2px 4px 16px 1px rgba(0, 0, 0, 0.06);
}

.strikethrough {
  background: linear-gradient(to top right, #fff calc(50% - 1px), #aaa, #fff calc(50% + 1px) );
}

.focus-border {
    border: 2px solid rgba(24, 118, 219, 1);
}
.disabled-text {
  color: rgba(140, 140, 140, 1);

}

.megabutton {
  box-shadow: 0px 4.320000171661377px 12.949999809265137px 0px rgba(0, 0, 0, 0.08);
}

.megabutton:hover:not(:disabled):not(:focus) {
  box-shadow: 0px 2.1550705432891846px 3.6636199951171875px 0px rgba(0, 0, 0, 0.0169);
  box-shadow: 0px 9.482311248779297px 7.585848808288574px 0px rgba(0, 0, 0, 0.0275);
  box-shadow: 0px 23.274761199951172px 15.128595352172852px 0px rgba(0, 0, 0, 0.035);
  box-shadow: 0px 44.825469970703125px 29.653770446777344px 0px rgba(0, 0, 0, 0.0425);
}

.megabutton:focus:not(:active) {
  box-shadow: 2px 4px 16px 1px rgba(0, 0, 0, 0.06), 0px 44.8255px 29.6538px rgba(0, 0, 0, 0.0425185), 0px 23.2748px 15.1286px rgba(0, 0, 0, 0.035), 0px 9.48231px 7.58585px rgba(0, 0, 0, 0.0274815), 0px 2.15507px 3.66362px rgba(0, 0, 0, 0.0168519);
  border: 4px solid rgba(124, 198, 221, 1);
}

.disabled-banner {
    height: 2rem;
    background: rgba(187, 220, 234, 0.5);
    color: rgba(50, 67, 80, 1);
}
</style>
