<template>
  <div class="feed">
    <div class="feed__header">
      <CommonLayoutHeader
        title="Feed"
        :enableCustomEvent="false"
        :enable-filter="true"
        customLink="Back"
      />
    </div>
    <div class="feed__content">
      <form @click.prevent="">
        <CommonFormInput
          v-model="form.email.value"
          :value="form.email.value"
          :error="form.email.error"
          :disabled="loading"
          :placeholder="'Search'"
          :single-mode="false"
          :rounded="true"
        />
      </form>
      <div :class="{ content: true, 'content-loading': !profilePosts.length }">
        <template v-if="profilePosts.length">
          <CommonFeedItem
            v-for="(item, key) in profilePosts"
            :key="key"
            :id="item.id"
            :title="item.title"
            :time="item.time ? item.time : '8m ago'"
            :description="item.body"
            :imgUrl="item.imgUrl ? item.imgUrl : '/images/feed/big_banner.png'"
          />
        </template>
        <template v-else>
          <loader />
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, computed } from "vue";
// importing global components
import CommonLayoutHeader from "../components/common/layout/bheader.vue";
import CommonFormInput from "../components/form/input.vue";
import CommonFeedItem from "../components/pages/feed/item.vue";
import loader from "../components/common/layout/loader.vue";
// importing global types
import type { TField, FeedItem, IForm } from "../types/global";

import { useProfileStore } from "../store/profile";

export default defineComponent({
  components: {
    // Registering the component
    CommonLayoutHeader,
    CommonFormInput,
    CommonFeedItem,
    loader,
  },
  setup() {
    const state = reactive<{
      form: IForm;
      loading: boolean;
      feedData: FeedItem[];
    }>({
      form: {
        email: {
          value: "",
          error: "",
          status: false,
        },
        password: {
          value: "",
          error: "",
        },
      },
      loading: false,
      feedData: [
        {
          title: "Header",
          id: 1,
          time: "8m ago",
          description:
            "He'll want to use your yacht, and I don't want this thing smelling like fish.",
          imgUrl: "/images/feed/banner.png",
        },
        {
          title: "Header",
          id: 2,
          time: "8m ago",
          description:
            "He'll want to use your yacht, and I don't want this thing smelling like fish.",
          imgUrl: "/images/feed/banner.png",
        },
        {
          title: "Header",
          id: 3,
          time: "8m ago",
          description:
            "He'll want to use your yacht, and I don't want this thing smelling like fish.",
          imgUrl: "/images/feed/banner.png",
        },
        {
          title: "Header",
          id: 4,
          time: "8m ago",
          description:
            "He'll want to use your yacht, and I don't want this thing smelling like fish.",
          imgUrl: "/images/feed/banner.png",
        },
        {
          title: "Header",
          id: 5,
          time: "8m ago",
          description:
            "He'll want to use your yacht, and I don't want this thing smelling like fish.",
          imgUrl: "/images/feed/banner.png",
        },
        {
          title: "Header",
          id: 6,
          time: "8m ago",
          description:
            "He'll want to use your yacht, and I don't want this thing smelling like fish.",
          imgUrl: "/images/feed/banner.png",
        },
        {
          title: "Header",
          id: 7,
          time: "8m ago",
          description:
            "He'll want to use your yacht, and I don't want this thing smelling like fish.",
          imgUrl: "/images/feed/banner.png",
        },
        {
          title: "Header",
          id: 8,
          time: "8m ago",
          description:
            "He'll want to use your yacht, and I don't want this thing smelling like fish.",
          imgUrl: "/images/feed/banner.png",
        },
        {
          title: "Header",
          id: 9,
          time: "8m ago",
          description:
            "He'll want to use your yacht, and I don't want this thing smelling like fish.",
          imgUrl: "/images/feed/banner.png",
        },
        {
          title: "Header",
          id: 10,
          time: "8m ago",
          description:
            "He'll want to use your yacht, and I don't want this thing smelling like fish.",
          imgUrl: "/images/feed/banner.png",
        },
      ],
    });

    const profilePosts = computed(() => {
      return useProfileStore().profilePosts;
    });

    // get posts
    const getProfilePosts = async () => {
      try {
        const data = await useProfileStore().getProfilePosts();
      } catch (e: any) {
        console.log("error", e);
      }
    };

    onMounted(async () => {
      // checks if profilePosts exist and fetches it when doesn't
      if (!profilePosts.value.length) {
        await getProfilePosts();
      }
    });

    return {
      ...toRefs(state),
      profilePosts,
      getProfilePosts,
    };
  },
});
</script>

<style lang="scss" scoped>
.feed {
  padding: 0 16px;
  &__content {
    .content {
      @media screen and (min-width: 992px) {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      &-loading {
        min-height: 200px;
        display: flex;
        align-items: center;
        .loader {
          width: 32px;
          height: 32px;
        }
      }
    }
  }
  &__footer {
    text-align: center;
  }
}
</style>
