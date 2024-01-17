<template>
  <div
    v-if="shouldRender"
    class="flex md:justify-between mt-0 relative pt-0 px-2 pb-1 -top-1 w-full"
  >
    <div>
      <p>
        {{ total }}
        <span v-if="total !== 1">{{ t('pagination.pageResultsLabel') }}</span>
        <span v-else>{{ t('pagination.pageSingleResultLabel') }}</span>
      </p>
    </div>

    <div class="hidden md:flex items-center">
      <p class="text-sm text-normal mr-8">
        {{ paginationText }}
      </p>
      <button
        :class="[
          'border-none bg-transparent my-0 mx-4 relative hover:text-primary-300',
          { 'text-gray-100 pointer-none': page === 1 }
        ]"
        :disabled="page === 1"
        @click="pageClick(1)"
      >
        <span class="sr-only">{{ t('pagination.firstPageLabel') }}</span>
        <page-arrow-icon :first="true" :disabled="page === 1" />
      </button>
      <button
        :class="[
          'border-none bg-transparent my-0 mx-4 relative hover:text-primary-300',
          { 'text-gray-100 pointer-none': page <= 1 }
        ]"
        :disabled="page <= 1"
        @click="pageClick(page - 1)"
      >
        <span class="sr-only">{{ t('pagination.prevPageLabel') }}</span>
        <page-arrow-icon :previous="true" :disabled="page <= 1" />
      </button>
      <button
        :class="[
          'border-none bg-transparent my-0 mx-4 relative hover:text-primary-300',
          { 'text-gray-100 pointer-none': offset + limit >= total }
        ]"
        :disabled="offset + limit >= total"
        @click="pageClick(page + 1)"
      >
        <span class="sr-only">{{ t('pagination.nextPageLabel') }}</span>
        <page-arrow-icon :next="true" :disabled="offset + limit >= total" />
      </button>
      <button
        :class="[
          'border-none bg-transparent my-0 mx-4 relative hover:text-primary-300',
          { 'text-gray-100 pointer-none': offset + limit >= total }
        ]"
        :disabled="offset + limit >= total"
        @click="pageClick(lastPage)"
      >
        <span class="sr-only">{{ t('pagination.lastPageLabel') }}</span>
        <page-arrow-icon :last="true" :disabled="offset + limit >= total" />
      </button>
    </div>

    <div class="flex md:hidden items-center pl-8">
      <p>
        <button
          :class="[
            'border-none bg-transparent my-0 mx-4 relative hover:text-primary-300 items-center text-gray-900 flex md-hidden text-sm transition-transform duration-500 ease-linear transform group',
            { 'text-gray-100 pointer-none': offset + limit >= total },
            { hidden: page == lastPage }
          ]"
          :disabled="offset + limit >= total"
          @click="pageClick(page + 1)"
        >
          {{ t('pagination.nextPageLabelMobile') }}
          <page-arrow-icon
            :next="true"
            class="transform group-hover:translate-x-1 group-hover:text-primary-300"
          />
        </button>
        <button
          :class="[
            'border-none bg-transparent my-0 mx-4 relative hover:text-primary-300 items-center text-gray-900 flex md-hidden text-sm transition-transform duration-500 ease-linear transform group',
            'pagination__btn--prev',
            { hidden: page != lastPage }
          ]"
          @click="pageClick(page - 1)"
        >
          <page-arrow-icon
            :previous="true"
            class="transform group-hover:-translate-x-1 group-hover:text-primary-300"
          />
          {{ t('pagination.prevPageLabelMobile') }}
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import PageArrowIcon from './PageArrowIcon.vue';

export default {
  name: 'Pagination',
  components: { PageArrowIcon },
  props: {
    collection: {
      type: Array,
      default: null
    },
    page: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 0
    }
  },
  emits: ['change'],
  computed: {
    shouldRender() {
      return this.collection && this.collection.length > 0;
    },
    paginationText() {
      return `${this.offset + 1} - ${Math.min(
        this.offset + this.limit,
        this.total
      )} of ${this.total}`;
    },
    offset() {
      return (this.page - 1) * this.limit;
    },
    lastPage() {
      return Math.ceil(this.total / this.limit);
    }
  },
  methods: {
    pageClick(newPage) {
      this.$emit('change', { page: newPage });
    }
  }
};
</script>
