<template>
  <div
    ref="searchBar"
    class="relative"
  >
    <text-input
      id="searchBar"
      v-model="searchTerm"
      class="min-w-full"
      :label="t('search.textLabel')"
      :sr-only-label="true"
      input-class="focus-within:bg-white-300"
    >
      <template #iconLeft>
        <Search class="w-6 h-6" />
      </template>
      <template #iconRight>
        <button
          class="block"
          :aria-label="t('search.closeLabel')"
          :disabled="disabled"
          data-testid="clearSearchButton"
          @click="clearSearch"
        >
          <Close class="w-6 h-6" />
        </button>
      </template>
    </text-input>
    <div
      v-if="!outsideClick"
      class="bg-white shadow overflow-y-auto min-w-full absolute"
      role="results"
    >
      <div
        v-if="searchTerm && header"
        class="text-center py-4 border-white-300 border-b-2 text-gray-500"
      >
        <template v-if="searching">
          {{ t('search.loading') }}
        </template>
        <template v-else-if="searchResults.length">
          <LobLink
            :to="link"
            :underline="false"
            class="hover:text-primary-700"
          >
            {{ t('search.resultsPrefix') }} {{ totalResults }} {{ t('search.resultsSuffix') }}
          </LobLink>
        </template>
        <template v-else>
          {{ t('search.noResults') }}
        </template>
      </div>
      <LobTable
        v-if="searchTerm && !searching && searchResults.length"
        class="min-w-full divide-y divide-gray-200"
        space="sm"
      >
        <TableBody>
          <TableRow
            v-for="result in searchResults"
            :key="result"
            class="text-gray-500 hover:text-primary-700"
          >
            <slot :result="result" />
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
import LobLink from '../Link/Link.vue';
import Search from '../Icons/Search';
import Close from '../Icons/Close';

export default {
  name: 'SearchBar',
  components: { TextInput, LobTable, TableBody, TableRow, LobLink, Search, Close },
  props: {
    searchFunction: {
      type: Function,
      required: true
    },
    count: {
      type: Number,
      default: 0
    },
    link: {
      type: String,
      default: ''
    },
    header: {
      type: Boolean,
      default: true
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
    },
    totalResults () {
      return this.count ? this.count : this.searchResults.length;
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
