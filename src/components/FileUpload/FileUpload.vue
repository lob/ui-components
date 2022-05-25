<template>
  <label :for="id">
    <span
      role="button"
      aria-controls="filename"
      tabindex="0"
      :class="[
        { 'px-8 text-[1.25rem] h-[48px]': regular },
        { 'px-6 text-sm h-[32px]': small },
        'flex justify-center items-center rounded-lg border border-primary-500',
        'font-bold tracking-[-0.04em] bg-white text-primary-500 secondary',
        'active:border-black active:text-black focus-visible:ring-primary-100 focus-visible:ring-4 focus:outline-none'
      ]"
      @keydown.enter="onKeydown"
      @keydown.space="onKeydown"
    >
      {{ fileSelected ? fileSelected : label }}
    </span>
  </label>
  <input
    v-bind="$attrs"
    :id="id"
    ref="fileInput"
    type="file"
    :accept="accept"
    readonly
    class="hidden"
    @change="onFilePicked"
  >
</template>

<script>
export default {
  name: 'FileUpload',
  props: {
    label: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    accept: {
      type: String,
      required: true
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  emits: ['fileUpload'],
  data () {
    return {
      fileSelected: ''
    };
  },
  computed: {
    regular () {
      return !this.small;
    }
  },
  methods: {
    onKeydown () {
      this.$refs.fileInput.click();
    },
    onFilePicked (event) {
      const file = event.target.files[0];
      if (file) {
        this.fileSelected = file.name;
        this.$emit('fileUpload', event);
      }
    },
    clear () {
      this.$refs.fileInput.value = null;
      this.fileSelected = '';
    }
  }
};
</script>

<style scoped lang="scss">
.secondary:hover:not(:focus) {
  box-shadow:
    0 9px 12px 0 rgba(0, 0, 0, 0.2),
    0 19px 29px 0 rgba(0, 0, 0, 0.14),
    0 7px 36px 0 rgba(0, 0, 0, 0.12);
}

.secondary:focus:active {
  box-shadow: none;
}
</style>
