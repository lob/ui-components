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
    <div class="text-center py-4" v-if="searchTerm">
      <template v-if="searching">Loading, please wait...</template>
      <template v-else-if="searchResults.length">View all {{ searchResults.length }} results...</template>
      <template v-else>No results found</template>
    </div>
    <Table class="min-w-full divide-y divide-gray-200" space="sm" v-if="!searching && searchResults.length">
      <TableBody>
        <TableRow v-for="(result, index) in searchResults" class="rounded-md w-max" :key="index">
          <div class="whitespace-nowrap" v-for="(key, slots) in Object.keys(result)" :key="slots">
            <img
              v-if="key === 'img'"
              :src="result[key]"
              class="w-5 h-5"
            >
            <template v-else>
              {{ result[key] }}
            </template>
          </div>
          <div class="text-right text-xl">></div>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script>
import textInput from '../TextInput/TextInput';
import search from '../Icons/Search';
import close from '../Icons/Close';
import ChevronRight from '../Icons/ChevronRight.vue';
import Table from '../Table/Table';
import TableBody from '../Table/TableBody';
import TableRow from '../Table/TableRow';
export default {
  name: 'SearchBar',
  components: { textInput, search, close, ChevronRight, Table, TableBody, TableRow },
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
      searchResults: [],
      searching: false,
      timeout: null
    };
  },
  watch: {
    searchTerm (val) {
      val && this.debounceSearch(val)
    }
  },
  mounted () {
    window.addEventListener('click', this.onClickOutside);
  },
  unmounted () {
    window.removeEventListener('click', this.onClickOutside);
  },
  methods: {
    debounceSearch(searchTerm, delayMs)  {
      this.searching = true;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.search(searchTerm);
      }, delayMs || 500);
    },
    search(val) {
      this.searchResults = [];
      this.searchFunction(val).then((results) => {
        this.searchResults = results;
      }).finally(()=>{
        this.searching = false;
      })
    },
    eraseSearchTerm () {
      this.searchTerm = '';
      this.searchResults = [];
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
