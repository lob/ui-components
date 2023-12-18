<template>
  <div class="relative">
    <input
      :id="id"
      type="radio"
      class="absolute top-1/2 left-1/2 opacity-0 peer"
      :name="name"
      :value="value.toString()"
      :checked="checked"
      :disabled="disabled"
      :aria-disabled="ariaDisabled"
      @input="onInput"
      @click="onClick"
    >
    <label
      :for="id"
      :style="{ 'width': customWidth || '' }"
      :class="[
        'text-gray-900',
        'h-full flex justify-center relative cursor-pointer',
        'rounded-lg border border-transparent shadow-input',
        'peer-focus-visible:outline-dashed peer-focus-visible:outline-black peer-focus-visible:outline-offset-1 peer-focus-visible:outline-1',
        'peer-hover:shadow',
        'peer-checked:border peer-checked:border-black peer-checked:shadow',
        'peer-disabled:cursor-not-allowed peer-disabled:shadow-none peer-disabled:text-gray-100',
        'peer-disabled:border peer-checked:border-disabled-gray',
        smallText ? `max-w-[${maxWidth}]` : '',
        imageSource && !smallText ? `min-w-[160px] max-w-[${maxWidth}]` : '',
        { 'items-center': !hasDisabledBanner && !smallText },
        {'border-0' : topFullImage && !checked }
      ]"
    >
      <div class="w-full">
        <div
          v-if="imageSource"
          data-testId="imageContainer"
          :class="[
            'mx-4 my-6',
            {'!m-0' : topFullImage}
          ]"
        >
          <div
            v-if="hasDisabledBanner"
            class="bottom-[60%] inset-x-0 absolute text-center bg-turquoise-100 uppercase text-gray-700 text-sm tracking-wide font-bold p-1"
            data-testId="imageDisabledBanner"
          >
            {{ disabledBanner }}
          </div>
          <img
            :class="[
              'max-h-20 mx-auto rounded-t-lg',
              {'!max-h-full' : topFullImage},
              {'opacity-60' : disabled}
            ]"
            :src="imageSource"
            :alt="imageAltText"
          >
        </div>
        <div
          v-if="hasDisabledBanner && !imageSource"
          class="mt-0 top-0 inset-x-0 absolute text-center bg-turquoise-100 uppercase text-gray-700 text-sm tracking-wide font-bold p-1 rounded-t-lg"
          data-testId="disabledBanner"
        >
          {{ disabledBanner }}
        </div>
        <div
          :class="[
            { 'mx-6 xl:mx-10': !imageSource && !smallText },
            { 'mx-6': smallText },
            { 'my-8': !hasDisabledBanner },
            { 'mt-12 mb-6': hasDisabledBanner && !imageSource },
            { 'mt-12 mb-6': hasDisabledBanner }
          ]"
        >
          <div
            :class="[
              'text-lg font-medium',
              { 'text-center': !smallText },
              { 'text-left': smallText },
              { 'text-[1.25rem] 2xl:text-[2rem] whitespace-nowrap': megaText }
            ]"
          >
            <slot name="label">
              {{ label }}
            </slot>
          </div>
          <div
            v-if="smallText"
            class="text-left mt-1 text-[14px]"
          >
            <slot name="text">
              <p>{{ text }}</p>
            </slot>
          </div>
        </div>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  name: 'MegaButton',
  props: {
    id: {
      type: String,
      required: true
    },
    modelValue: {
      type: [String, Boolean],
      default: null
    },
    name: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Boolean],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    disabledBanner: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    imageSource: {
      type: String,
      default: null
    },
    imageAltText: {
      type: String,
      default: ''
    },
    topFullImage: {
      type: Boolean,
      default: false
    },
    ariaDisabled: {
      type: Boolean,
      default: false
    },
    customWidth: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue', 'input', 'click'],
  computed: {
    checked () {
      return this.modelValue === this.value;
    },
    hasDisabledBanner () {
      return this.disabled && this.disabledBanner;
    },
    megaText () {
      return this.labelContent && !this.textContent && !this.imageSource;
    },
    smallText () {
      return this.labelContent && this.textContent;
    },
    labelContent () {
      return this.$slots.label || this.label;
    },
    textContent () {
      return this.$slots.text || this.text;
    },
    maxWidth () {
      return this.customWidth || '240px';
    }
  },
  methods: {
    onInput () {
      this.$emit('update:modelValue', this.value);
      this.$emit('input', this.value);
    },
    onClick ($event) {
      this.$emit('click', $event);
    }
  }
};
</script>

<style scoped lang="scss">

label {
  box-shadow: 0 4.32px 12.95px rgba(0, 0, 0, 0.08);
}

input[type="radio"]:disabled + label {
  border: 1px solid #c4c4c4;
  color: #8c8c8c;
  box-shadow: none;
}

</style>
