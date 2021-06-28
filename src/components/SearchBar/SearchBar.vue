<template>
  <text-input
    id="searchBar"
    v-model="searchTerm"
    class="w-max bg-white-300 h-12"
    grey
  >
    <template #iconLeft>
      <search class="w-4 h-6" />
    </template>
    <template #iconRight>
      <button
        :role="disabled ? 'button' : null"
        aria-label="Close"
        :disabled="disabled"
        @click="eraseSearchTerm"
      >
        <close class="w-4 h-6"/>
      </button>
    </template>
  </text-input>
  <div class="bg-white shadow overflow-y-auto max-h-56">
    <table class="table-auto">
      <tbody v-if="searchTerm !== ''">
        <tr class="border-b border-white-300 rounded-t-lg">
          <td
            colspan="5"
            class="text-center py-4"
          >
            View all {{ searchResults.length }} results...
          </td>
        </tr>
        <tr
          v-for="(result, index) in searchResults"
          :key="index"
        >
          <td
            v-for="(key, slots) in Object.keys(result)"
            :key="slots"
            class="max-w-md px-4 py-2 text-gray-500"
          >
            <img
              v-if="key === 'img'"
              :src="result[key]"
              class="w-5 h-5"
            >
            <p v-else>
              {{ result[key] }}
            </p>
          </td>
          <td>
            <button @click="tempFunction">
              <chevron-right class="pt-2 pl-2 w-6 h-6" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import textInput from '../TextInput/TextInput';
import search from '../Icons/Search';
import close from '../Icons/Close';
import ChevronRight from '../Icons/ChevronRight.vue';
export default {
  name: 'SearchBar',
  components: { textInput, search, close, ChevronRight },
  props: {
    searchFunction: {
      type: Function,
      required: true
    }
  },
  emits: ['update:open'],
  computed: {
    disabled () {
      return !this.searchTerm
    }
  },
  data () {
    return {
      searchTerm: '',
      searchResults: []
    };
  },
  watch: {
    searchTerm (val) {
      this.searchFunction(val).then((results) => {
        this.searchResults = results;
      });
    }
  },
  mounted () {
    window.addEventListener('click', this.onClickOutside);
  },
  unmounted () {
    window.removeEventListener('click', this.onClickOutside);
  },
  methods: {
    eraseSearchTerm () {
      this.searchTerm = '';
    },
    tempFunction () {

    },
    onClickOutside ($event) {
      if (typeof this.$refs.container !== 'undefined') {
        const clickOnTheContainer = this.$refs.container === $event.target;
        const clickOnChild = this.$refs.container && this.$refs.container.contains($event.target);

        if (!clickOnTheContainer && !clickOnChild) {
          this.hide();
        }
      }
    },
    hide () {
      this.$emit('update:open', false);
    }
  }
};
</script>
