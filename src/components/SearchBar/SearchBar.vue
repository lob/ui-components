<template>
  <text-input
    id="searchBar"
    ref="searchBar"
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
        data-testid="clearSearchButton"
        @click="clearSearch"
      >
        <close class="w-4 h-6" />
      </button>
    </template>
  </text-input>
  <div class="bg-white shadow overflow-y-auto max-h-56">
    <div
      v-if="searchTerm"
      class="text-center py-4"
    >
      <template v-if="searching">
        Loading, please wait...
      </template>
      <template v-else-if="searchResults.length">
        View all {{ searchResults.length }} results...
      </template>
      <template v-else>
        No results found
      </template>
    </div>
    <Table
      v-if="!searching && searchResults.length"
      class="min-w-full divide-y divide-gray-200"
      space="sm"
    >
      <TableBody>
        <TableRow
          v-for="result in searchResults"
          :key="result"
          class="hover:shadow rounded-md cursor-pointer"
        >
          <div
            v-for="key in Object.keys(result)"
            :key="key"
            class="whitespace-nowrap"
          >
            <img
              v-if="key === 'img'"
              :src="result[key]"
              class="w-5 h-5"
            >
            <template v-else>
              {{ result[key] }}
            </template>
          </div>
          <div class="text-right text-xl">
            >
          </div>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script>
import textInput from '../TextInput/TextInput';
import search from '../Icons/Search';
import close from '../Icons/Close';
import Table from '../Table/Table';
import TableBody from '../Table/TableBody';
import TableRow from '../Table/TableRow';
export default {
  name: 'SearchBar',
  components: { textInput, search, close, Table, TableBody, TableRow },
  props: {
    searchFunction: {
      type: Function,
      required: true
    }
  },
  emits: ['update:open'],
  data () {
    return {
      searchTerm: '',
      searchResults: [],
      searching: false,
      timeout: null
    };
  },
  computed: {
    disabled () {
      return !this.searchTerm;
    }
  },
  watch: {
    searchTerm (val) {
      val && this.debounceSearch(val);
    }
  },
  mounted () {
    window.addEventListener('click', this.onClickOutside);
  },
  unmounted () {
    window.removeEventListener('click', this.onClickOutside);
  },
  methods: {
    debounceSearch (searchTerm, delayMs)  {
      this.searching = true;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.search(searchTerm);
      }, delayMs || 500);
    },
    search (val) {
      this.searchResults = [];
      this.searchFunction(val).then((results) => {
        this.searchResults = results;
      }).finally(() => {
        this.searching = false;
      });
    },
    clearSearch () {
      this.searchTerm = '';
      this.searchResults = [];
    },
    onClickOutside ($event) {
      if (typeof this.$refs.searchBar !== 'undefined') {
        const clickOnTheContainer = this.$refs.searchBar === $event.target;
        const clickOnChild = this.$refs.searchBar && this.$refs.searchBar.contains($event.target);

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
