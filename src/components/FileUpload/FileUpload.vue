<template>
  <label :for="id">
    <span
      role="button"
      aria-controls="filename"
      tabindex="0"
      :class="[
        { 'type-small-700 py-3 px-5 max-h-11': regular },
        { 'type-xs-700 py-2 px-4 max-h-8': small },
        'flex justify-center items-center rounded-full bg-white text-gray-800 border border-gray-800 whitespace-nowrap h-min',
        'hover:bg-gray-50 active:bg-gray-100 focus:bg-gray-100 focus:outline-dashed focus:outline-black focus:outline-offset-1'
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
