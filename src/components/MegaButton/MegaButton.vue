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
      @input="onInput"
      @click="onClick"
    >
    <label
      :for="id"
      :class="[
        'text-gray-900',
        'h-full flex justify-center relative cursor-pointer',
        'rounded-lg border-2 border-transparent ring-4 ring-transparent shadow-input',
        'peer-focus-visible:ring-primary-100 peer-focus-visible:ring-4',
        'peer-hover:shadow',
        'peer-checked:border-2 peer-checked:border-primary-500 peer-checked:shadow',
        'peer-disabled:cursor-not-allowed peer-disabled:shadow-none peer-disabled:text-gray-100',
        'peer-disabled:border-2 peer-checked:border-disabled-gray',
        { 'max-w-[240px]': smallText },
        { 'min-w-[160px] max-w-[240px]': imageSource && !smallText },
        { 'items-center': !hasDisabledBanner && !smallText },
        { 'border-0' : twoTone }
      ]"
    >
      <div
        class="w-full"
      >
        <div
          v-if="disabled && !disabledBanner"
          data-testId="strikethru"
          class="strikethru-line absolute top-0 h-full w-full"
        />
        <div
          v-if="imageSource"
          data-testId="imageContainer"
          :class="[
            'mx-4 my-6',
            {'!m-0 px-4 py-6 bg-white-100 rounded-t-lg h-32' : twoTone},
            {'!pb-0' : twoTone && lowerImage}
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
              'max-h-20 mx-auto',
              {'!max-h-full' : lowerImage}
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
    twoTone: {
      type: Boolean,
      default: false
    },
    lowerImage: {
      type: Boolean,
      default: false
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
.strikethru-line {
  background: linear-gradient(to top right, rgba(255, 255, 255, 0) calc(50% - 1px), #c4c4c4, rgba(255, 255, 255, 0) calc(50% + 1px));
}

label {
  box-shadow: 0 4.32px 12.95px rgba(0, 0, 0, 0.08);
}

input[type="radio"]:disabled + label {
  border: 1px solid #c4c4c4;
  color: #8c8c8c;
  box-shadow: none;
}

</style>
