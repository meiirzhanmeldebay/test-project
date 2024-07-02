<template>
  <div class="content-item">
    <router-link
      :to="{
        name: 'FeedInside',
        params: { id: id },
        query: { title: title, slug: 'photo' },
      }"
    >
      <div class="content-item__container">
        <div class="content-item__banner">
          <img :src="imgUrl" alt="" />
        </div>
        <div class="content-item__content">
          <div class="title">
            <h5>
              {{ title }}
            </h5>
          </div>
          <div class="description">
            <p>
              {{ description }}
            </p>
          </div>
          <span class="time">
            {{ time }}
          </span>
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
.content-item {
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
    flex-direction: column;
    @media screen and (min-width: 992px) {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
  &__banner {
    margin-bottom: 8px;
    width: 100%;
    img {
      width: 100%;
      height: 240px;
      border-radius: 8px;
      object-fit: cover;
      background-color: #f6f6f6;
    }
  }
  &__content {
    // padding-left: 16px;
    width: 100%;
    padding-bottom: 16px;
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
      }
    }
    .description {
      margin-bottom: 8px;
      p {
        font-size: 14px;
        line-height: 17px;
        color: #000;
        text-align: left;
        margin: 0;
        font-weight: 400;
      }
    }
    span {
      &.time {
        font-size: 14px;
        font-weight: 400;
        color: #bdbdbd;
      }
    }
  }
}
</style>