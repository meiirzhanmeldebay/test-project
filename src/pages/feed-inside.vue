<template>
  <div class="feed-inside">
    <div class="feed-inside__container">
      <template v-if="feedData && feedData.title">
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
      </template>
      <template v-else>
        <loader />
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, computed } from "vue";
import { useProfileStore } from "../store/profile";
import { useRoute } from "vue-router";
import type { PhotoItem, PostItem } from "../types/profile";
import loader from "../components/common/layout/loader.vue";
export default defineComponent({
  components: {
    loader,
  },
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

    // get photos by id
    const getProfilePhotoByID = async (id: number) => {
      try {
        const data = await useProfileStore().getProfilePhotoByID(id);
        state.feedData = data;
      } catch (e: any) {
        console.log("error", e);
      }
    };

    // get posts by id
    const getProfilePostByID = async (id: number) => {
      try {
        const data = await useProfileStore().getProfilePostByID(id);
        state.feedData = data;
      } catch (e: any) {
        console.log("error", e);
      }
    };

    onMounted(async () => {
      let slug = route.query.slug;
      let id = route.params?.id ? Number(route.params?.id) : 1;
      // checks page slug depending slug fetches photo/post by id
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
    min-height: 200px;
    .loader {
      width: 32px;
      height: 32px;
    }
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