<template>
  <div
    ref="searchBar"
    class="relative"
  >
    <text-input
      id="searchBar"
      v-model="searchTerm"
      class="w-max bg-white-300 h-12"
      grey
    >
      <template #iconLeft>
        <Search class="w-4 h-6" />
      </template>
      <template #iconRight>
        <button
          aria-label="Close"
          :disabled="disabled"
          data-testid="clearSearchButton"
          @click="clearSearch"
        >
          <Close class="w-4 h-6" />
        </button>
      </template>
    </text-input>
    <div
      v-if="!outsideClick"
      class="bg-white shadow overflow-y-auto max-h-56 min-w-full absolute"
      role="results"
    >
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
      <LobTable
        v-if="!searching && searchResults.length"
        class="min-w-max divide-y divide-gray-200"
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
      </LobTable>
    </div>
  </div>
</template>

<script>
// import { TextInput, LobTable, TableBody, TableRow, Search, Close } from '@/components';
import TextInput from '../TextInput/TextInput';
import LobTable from '../Table/Table';
import TableBody from '../Table/TableBody';
import TableRow from '../Table/TableRow';
import Search from '../Icons/Search';
import Close from '../Icons/Close';

export default {
  name: 'SearchBar',
  components: { TextInput, LobTable, TableBody, TableRow, Search, Close },
  props: {
    searchFunction: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      searchTerm: '',
      searchResults: [],
      searching: false,
      timeout: null,
      outsideClick: false
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
        this.outsideClick = false;
        const clickOnTheContainer = this.$refs.searchBar === $event.target;
        const clickOnChild = this.$refs.searchBar && this.$refs.searchBar.contains($event.target);
        if (!clickOnTheContainer && !clickOnChild) {
          this.hide();
        }
      }
    },
    hide () {
      this.outsideClick = true;
    }
  }
};
</script>
