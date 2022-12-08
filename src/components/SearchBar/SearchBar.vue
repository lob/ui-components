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
    >
      <template #iconLeft>
        <MagnifyingGlass size="l" />
      </template>
      <template #iconRight>
        <button
          :class="[
            'block',
            searchTerm ? 'opacity-100 cursor-pointer' : 'opacity-0'
          ]"
          :aria-label="t('search.closeLabel')"
          :disabled="disabled"
          data-testid="clearSearchButton"
          @click="clearSearch"
        >
          <XmarkLarge class="w-6 h-6" />
        </button>
      </template>
    </text-input>
    <div
      v-if="visible"
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
            @click="hide"
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
            class="text-gray-500 hover:text-primary-700 cursor-pointer"
            @click="hide"
          >
            <slot :result="result" />
          </TableRow>
        </TableBody>
      </LobTable>
    </div>
  </div>
</template>

<script>
import TextInput from '../TextInput/TextInput';
import LobTable from '../Table/Table';
import TableBody from '../Table/TableBody';
import TableRow from '../Table/TableRow';
import LobLink from '../Link/Link.vue';
import MagnifyingGlass from '../Icons/MagnifyingGlass';
import XmarkLarge from '../Icons/XmarkLarge';

export default {
  name: 'SearchBar',
  components: { TextInput, LobTable, TableBody, TableRow, LobLink, MagnifyingGlass, XmarkLarge },
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
      visible: false
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
      if (val) {
        this.visible = true;
        this.debounceSearch(val);
      }
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
      if (this.searchTerm) {
        this.searchTerm = '';
        this.searchResults = [];
      }
    },
    onClickOutside ($event) {
      if (this.$refs.searchBar) {
        const clickOnTheContainer = this.$refs.searchBar === $event.target;
        const clickOnChild = this.$refs.searchBar && this.$refs.searchBar.contains($event.target);

        if (!clickOnTheContainer && !clickOnChild) {
          this.hide();
        }
      }
    },
    hide () {
      this.visible = false;
    }
  }
};
</script>
