<template>
  <div class="tabs" :class="theme">
    <div class="tabs-container container">
      <ul class="tabs-list">
        <template v-for="(tab, index) in tabs" :key="index">
          <li
            v-if="tab?.id"
            class="tabs-item"
            @click="selectTab(tab.slug, index)"
          >
            <div
              class="tabs-item__link"
              :class="{ active: activeIndex === index }"
            >
              {{ tab.title }}
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    activeIndex: {
      type: Number,
      default: 0,
    },
    tabs: {
      type: Array,
      default: () => [],
    },
    theme: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      activeTab: "",
    };
  },
  methods: {
    selectTab(slug: string, index: number) {
      this.activeTab = slug;
      this.$emit("tab-selected", slug, index);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  background: #fff;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.1);

  &.subMobile {
    background: none;
    box-shadow: none;
    margin-top: 1rem;
    .tabs {
      &-list {
        width: 100%;
        max-width: 730px;
        border-radius: 100px;
      }
      &-item {
        width: 100%;
      }
    }
  }
  @media screen and (max-width: 575.98px) {
    background: none;
    box-shadow: none;
    margin-top: 1rem;

    .tabs-list {
      border-radius: 0.75rem;
      // border: 1px solid rgba(153, 163, 179, 0.3);
    }
  }

  &.sub {
    background: none;
    box-shadow: none;
    margin-top: 0.5rem;

    .tabs {
      &-list {
        max-width: 730px;
        border-radius: 0.75rem;
        border: 1px solid rgba(153, 163, 179, 0.3);
        width: 100%;
      }
      &-item {
        width: 100%;
        line-height: 1.14;
      }
    }
  }
  &.simple {
    background: none;
    box-shadow: none;
    margin: 1rem 0;

    .tabs {
      &-container {
        justify-content: flex-start;
        padding: 0;
      }
      &-list {
        justify-content: flex-start;
        border: none;
        padding: 0;
      }
      &-item {
        &:not(:first-child) {
          .tabs-item__link {
            margin-left: 1rem;
            @media screen and (max-width: 767.98px) {
              margin-left: 0.5rem;
            }
          }
        }
        &__link {
          @media screen and (max-width: 767.98px) {
            padding: 0.25rem 0.5rem;
          }
          &:not(.active) {
            background: rgba(86, 102, 129, 0.1);
            &:hover {
              background: #2aa65c;
            }
          }
        }
      }
    }
  }
  &.auto-width {
    .tabs {
      &-item {
        width: auto;
        @media screen and (max-width: 767.98px) {
          width: 100%;
        }
        @media screen and (min-width: 576px) {
          &__link {
            padding: 0.375rem 0.5rem;
          }
        }
      }
    }
  }

  &-container {
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (min-width: 992px) {
      padding-left: 0;
      padding-right: 0;
    }

    &:not(.simple) {
      @media screen and (min-width: 420px) {
        justify-content: center;
      }

      @media screen and (max-width: 419.98px) {
        justify-content: flex-start;
      }
    }
  }

  &-list {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    text-align: center;
    padding: 1px;
    margin: 0;
    background-color: #f6f6f6;
  }
  &-item {
    position: relative;

    &__link {
      background-color: #f6f6f6;
      border-radius: 100px;
      color: #bdbdbd;
      cursor: pointer;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 19px;
      padding: 14px 16px;
      transition: background-color 250ms ease-out;
      // @media screen and (max-width: 575.98px) {
      //   font-size: 12px;
      //   /*
      //   @media screen and (max-width: 419.98px) {
      //     font-size: calc(1.6vw + 4px);
      //   }
      //   */
      // }
      &:hover {
        &:not(.active) {
          color: #5db075;
          background: #fff;
          // box-shadow: 0px 0px 1rem 0px rgba(42, 166, 92, 0.34);
          transition: background-color 250ms ease;
        }
      }
      &.active {
        background: #fff;
        // box-shadow: 0px 0px 1rem 0px rgba(42, 166, 92, 0.34);
        color: #5db075;
        font-weight: bold;
        pointer-events: none;
      }
    }
  }
}
</style>
