<template>
  <div class="feed-item">
    <router-link
      :to="{
        name: 'FeedInside',
        params: { id: id },
        query: { title: title, slug: 'post' },
      }"
    >
      <div class="feed-item__container">
        <div class="feed-item__banner">
          <img :src="imgUrl" alt="" />
        </div>
        <div class="feed-item__content">
          <div class="title">
            <h5>
              {{ title }}
            </h5>
            <span class="time">
              {{ time }}
            </span>
          </div>
          <div class="description">
            <p>
              {{ description }}
            </p>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Button",
  props: {
    id: {
      type: Number,
      default: 1,
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    time: {
      type: String,
      default: "",
    },
    imgUrl: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="scss" scoped>
.feed-item {
  &:not(:last-child) {
    margin-bottom: 16px;
  }
  & > a {
    text-decoration: none;
  }
  @media screen and (min-width: 992px) {
    width: calc(50% - 8px);
  }
  &__container {
    display: flex;
  }
  &__banner {
    img {
      width: 50px;
      height: 50px;
      border-radius: 8px;
    }
  }
  &__content {
    padding-left: 16px;
    padding-bottom: 16px;
    width: 100%;
    .title {
      display: flex;
      justify-content: space-between;
      align-content: center;
      margin-bottom: 8px;
      h5 {
        font-size: 16px;
        line-height: 19px;
        font-weight: 600;
        margin: 0;
        color: #000;
        width: calc(100% - 100px);
      }
      span {
        &.time {
          font-size: 14px;
          font-weight: 400;
          color: #bdbdbd;
        }
      }
    }
    .description {
      p {
        font-size: 14px;
        line-height: 17px;
        font-weight: 400;
        color: #000;
        text-align: left;
        margin: 0;
      }
    }
  }
}
</style>