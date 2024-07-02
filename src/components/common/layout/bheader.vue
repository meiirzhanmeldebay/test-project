<template>
  <div class="bheader">
    <div
      class="bheader-container"
      :class="{
        center: !enableCustomEvent && !enableFilter,
        white: customStyle,
      }"
    >
      <div class="header__left" v-if="customLink">
        <template v-if="customLink == 'Back'">
          <button type="button" class="btn btn-link" @click="goBack">
            {{ customLink }}
          </button>
        </template>
        <template v-else>
          <button
            type="button"
            class="btn btn-link"
            :class="{ grey: to.length }"
            @click="goBack"
          >
            <template v-if="customLink == 'close'">
              <closeIcon />
            </template>
            <template v-else>
              {{ customLink }}
            </template>
          </button>
        </template>
      </div>
      <div class="header__center">
        <h1 class="title">
          {{ title }}
        </h1>
      </div>
      <div class="header__right" v-if="enableCustomEvent || enableFilter">
        <router-link :to="to" v-if="to" class="btn btn-link">
          Log in
        </router-link>
        <button
          type="button"
          class="btn btn-link"
          @click="filterData"
          v-if="enableFilter"
        >
          Filter
        </button>
        <button
          type="button"
          class="btn btn-link"
          @click="logout"
          v-if="!enableFilter && !to"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import closeIcon from "../../../components/icons/close.vue";
export default {
  name: "CenteredHeaderWithBack",
  props: {
    title: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      default: "",
    },
    enableCustomEvent: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: "",
    },
    enableFilter: {
      type: Boolean,
      default: false,
    },
    customStyle: {
      type: Boolean,
      default: false,
    },
    customLink: {
      type: String,
      default: "",
    },
  },
  components: {
    // Registering the component
    closeIcon,
  },
  data() {
    return {
      previousRoute: null,
    };
  },
  methods: {
    goBack() {
      if (this.enableCustomEvent) {
        this.$emit("backHandler");
      } else {
        console.log("here");
        this.$router.go(-1);
      }
    },
    logout() {
      this.$emit("backHandler");
    },
    filterData() {
      // this.$emit("backHandler");
    },
  },
  watch: {
    $route(to, from) {
      this.previousRoute = from;
    },
  },
};
</script>

<style lang="scss">
$backBtnSize: 2rem;

.bheader {
  padding: 16px 0;
  position: relative;
  z-index: 2;
  &-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &.center {
      justify-content: center;
    }
    &.white {
      padding: 0 16px;
      .title {
        color: #fff;
      }
      .btn-link {
        color: #fff;
      }
    }
  }
  .header {
    &__left {
      display: flex;
      align-items: center;
    }
  }
  .btn-link {
    // flex-basis: $backBtnSize;
    background: none;
    border: none;
    // height: $backBtnSize;
    // width: $backBtnSize;
    padding: 0;
    height: 20px;
    min-width: 32px;
    color: #5db075;
    font-size: 16px;
    font-weight: 500;
    line-height: 18px;
    outline: none !important;
    &.grey {
      color: #bdbdbd;
    }
    &:hover {
      opacity: 0.5;
    }
  }
  .title {
    flex-basis: calc(100% - $backBtnSize);
    font-size: 30px;
    line-height: 36px;
    font-style: normal;
    font-weight: 600;
    text-align: center;
    margin: 0;

    @media screen and (max-width: 349.98px) {
      margin: 0;
    }
  }
}
</style>
