<template>
  <div
    v-if="shouldRender"
    class="pagination"
  >
    <div>
      <p class="pagination__results">
        {{ totalNumber }} result<span v-if="totalNumber !== 1">s</span>
      </p>
    </div>

    <div class="pagination__paging-container">
      <p class="pagination__text">
        {{ paginationText }}
      </p>
      <button
        :class="[
          'pagination__btn',
          { 'pagination__btn--disabled': page === 1 },
        ]"
        :disabled="page === 1"
        @click="pageClick(1)"
      >
        <span class="sr-only">Go to first page</span>
        <page-arrow-icon
          :first="true"
          :disabled="page === 1"
        />
      </button>
      <button
        :class="['pagination__btn', { 'pagination__btn--disabled': page <= 1 }]"
        :disabled="page <= 1"
        @click="pageClick(page - 1)"
      >
        <span class="sr-only">Go to previous page</span>
        <page-arrow-icon
          :previous="true"
          :disabled="page <= 1"
        />
      </button>
      <button
        :class="[
          'pagination__btn',
          { 'pagination__btn--disabled': offset + limit >= totalNumber },
        ]"
        :disabled="offset + limit >= totalNumber"
        @click="pageClick(page + 1)"
      >
        <span class="sr-only">Go to next page</span>
        <page-arrow-icon
          :next="true"
          :disabled="offset + limit >= totalNumber"
        />
      </button>
      <button
        :class="[
          'pagination__btn',
          { 'pagination__btn--disabled': offset + limit >= totalNumber },
        ]"
        :disabled="offset + limit >= totalNumber"
        @click="pageClick(lastPage)"
      >
        <span class="sr-only">Go to last page</span>
        <page-arrow-icon
          :last="true"
          :disabled="offset + limit >= totalNumber"
        />
      </button>
    </div>

    <div class="pagination__paging-container--mobile">
      <p>
        <button
          :class="[
            'pagination__btn',
            'pagination__btn--mobile',
            'pagination__btn--next',
            { 'pagination__btn--disabled': offset + limit >= totalNumber },
            { 'pagination__btn--hidden': page == lastPage },
          ]"
          :disabled="offset + limit >= totalNumber"
          @click="pageClick(page + 1)"
        >
          Next
          <font-awesome-icon
            class="pagination__btn__icon"
            :icon="['fal', 'angle-right']"
          />
        </button>
        <button
          :class="[
            'pagination__btn',
            'pagination__btn--mobile',
            'pagination__btn--prev',
            { 'pagination__btn--hidden': page != lastPage },
          ]"
          @click="pageClick(page - 1)"
        >
          <font-awesome-icon
            class="pagination__btn__icon"
            :icon="['fal', 'angle-left']"
          />
          Prev
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import PageArrowIcon from './PageArrowIcon.vue';

export default
{
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
  computed: {
    shouldRender () {
      return this.collection && this.collection.length > 0;
    },
    totalNumber () {
      return typeof this.total === 'number' ? this.total : 0;
    },
    paginationText () {
      return `${this.offset + 1} - ${Math.min(
        this.offset + this.limit,
        this.totalNumber
      )} of ${this.totalNumber}`;
    },
    offset () {
      return (this.page - 1) * this.limit;
    },
    lastPage () {
      return Math.ceil(this.totalNumber / this.limit);
    }
  },
  methods: {
    pageClick (newPage) {
      this.$emit('change', { page: newPage });
    }
  }
};
</script>

<style scoped lang="scss">
  .pagination {
    display: flex;
    font-size: 16px;
    justify-content: space-between;
    margin-top: 0;
    padding: 0 7px 16px;
    position: relative;
    top: -16px;
    width: 100%;

    @media (max-width: 576px) {
      // @include media($max-phone) {
      justify-content: unset;
    }

    &__paging-container {
      display: flex;
      align-items: center;

      @media (max-width: 576px) {
        // @include media($max-phone) {
        display: none;
      }

      &--mobile {
        display: none;
        padding-left: 15%;

        @media (max-width: 576px) {
          // @include media($max-phone) {
          display: flex;
          align-items: center;
        }
      }
    }

    &__text {
      font-size: 14px;
      font-weight: 400;
      margin-right: 31px;
    }

    &__btn {
      border: none;
      background-color: transparent;
      margin: 0 16px;
      position: relative;

      &__icon {
        font-size: 18px;
        margin: 0 2px;
        position: relative;
      }

      &--disabled {
        color: var(--color-gray-xl-dove);
        pointer-events: none;
      }

      &--mobile {
        align-items: center;
        color: var(--color-gray-xd-shadow);
        display: none;
        font-size: 14px;
        transition: transform 0.5s ease;

        @media (max-width: 576px) {
          // @include media($max-phone) {
          display: flex;
        }

        &.pagination__btn--next {
          &:hover {
            .pagination__btn__icon {
              transform: translateX(4px);
            }
          }
        }

        &.pagination__btn--prev {
          &:hover {
            .pagination__btn__icon {
              transform: translateX(-4px);
            }
          }
        }
      }

      &--hidden {
        display: none;
      }

      &:hover {
        color: var(--color-primary-l);
      }
    }
  }
</style>
