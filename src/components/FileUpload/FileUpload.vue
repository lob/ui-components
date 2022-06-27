<template>
  <label :for="id">
    <span
      role="button"
      aria-controls="filename"
      tabindex="0"
      :class="[
        { 'px-6 text-base h-[48px]': regular },
        { 'px-4 text-sm h-[32px]': small },
        'flex justify-center items-center rounded-lg',
        'font-medium bg-white text-primary-500 border border-primary-500',
        'hover:bg-gray-100/[.15] active:bg-bg-gray-100/[.25] active:scale-[.96]',
        'focus-visible:ring-primary-100 focus-visible:ring-4 focus:outline-none'
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
