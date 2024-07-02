<template>
  <div class="feed-inside">
    <div class="feed-inside__container">
      <div class="feed-inside__banner">
        <img :src="'https://picsum.photos/600/400'" alt="" />
      </div>
      <div class="feed-inside__content">
        <div class="title">
          <h2>
            {{ feedData?.title }}
          </h2>
          <span class="author"> Author </span>
        </div>
        <div class="description">
          <p>
            {{ feedData?.body ? feedData?.body : text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, computed } from "vue";
import { useProfileStore } from "../store/profile";
import { useRoute } from "vue-router";
import type { PhotoItem, PostItem } from "../types/profile";
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
  setup() {
    const profileStore = useProfileStore();
    const route = useRoute();
    const state = reactive<{
      loading: boolean;
      feedData: PhotoItem | null;
      postData: PostItem | null;
      text: string;
    }>({
      loading: false,
      feedData: null,
      postData: null,
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti fuga tempore ratione modi neque optio debitis, facere aperiam fugiat a, culpa sapiente temporibus, omnis nemo numquam cupiditate corporis? Dolore, doloribus.",
    });

    const getProfilePhotoByID = async (id: number) => {
      try {
        const data = await useProfileStore().getProfilePhotoByID(id);
        state.feedData = data;
      } catch (e: any) {
        console.log("error", e);
      }
    };

    const getProfilePostByID = async (id: number) => {
      try {
        const data = await useProfileStore().getProfilePostByID(id);
        state.feedData = data;
      } catch (e: any) {
        console.log("error", e);
      }
    };

    onMounted(async () => {
      console.log("mounted", route.query.slug);
      let slug = route.query.slug;
      let id = route.params?.id ? Number(route.params?.id) : 1;
      if (slug == "photo") {
        await getProfilePhotoByID(id);
      } else {
        await getProfilePostByID(id);
      }
      // await getProfilePosts();
    });

    return {
      ...toRefs(state),
      getProfilePhotoByID,
      getProfilePostByID,
    };
  },
});
</script>

<style lang="scss" scoped>
.feed-inside {
  padding: 32px 16px 0 16px;
  &__container {
    display: flex;
    flex-direction: column;
  }
  &__banner {
    margin-bottom: 32px;
    img {
      width: 100%;
      height: 196px;
      border-radius: 8px;
      object-fit: cover;
      background-color: #f6f6f6;
    }
  }
  &__content {
    // padding-left: 16px;
    padding-bottom: 16px;
    .title {
      display: flex;
      flex-direction: column;
      align-items: left;
      margin-bottom: 16px;
      h2 {
        font-size: 30px;
        font-weight: 500;
        line-height: 32px;
        margin: 0;
        color: #000;
        margin-bottom: 8px;
      }
      span {
        &.author {
          font-size: 16px;
          font-weight: 600;
          color: #000;
        }
      }
    }
    .description {
      p {
        font-size: 16px;
        font-weight: 500;
        line-height: 17px;
        color: #666666;
        text-align: left;
        margin: 0;
      }
    }
  }
}
</style>