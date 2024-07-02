<template>
  <div class="content">
    <div class="content__header">
      <CommonLayoutHeader
        title="Content"
        :enableCustomEvent="false"
        :enable-filter="true"
        customLink="Back"
      />
    </div>
    <div class="content__body">
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
      <div :class="{ wrapper: true, 'wrapper-loading': !profilePhotos.length }">
        <template v-if="profilePhotos.length">
          <CommonContentItem
            v-for="(item, key) in profilePhotos"
            :key="key"
            :id="item.id"
            :title="item.title"
            :time="item.time ? item.time : '8m ago'"
            :description="item.title"
            imgUrl="https://picsum.photos/600/400"
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

import { useProfileStore } from "../store/profile";
// importing global components
import CommonLayoutHeader from "../components/common/layout/bheader.vue";
import CommonFormInput from "../components/form/input.vue";
import CommonContentItem from "../components/pages/content/item.vue";
import loader from "../components/common/layout/loader.vue";
// importing global types
import type { TField, FeedItem, IForm } from "../types/global";

export default defineComponent({
  components: {
    // Registering the component
    CommonLayoutHeader,
    CommonFormInput,
    CommonContentItem,
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
          imgUrl: "/images/feed/big_banner.png",
        },
        {
          title: "Header",
          id: 2,
          time: "8m ago",
          description:
            "He'll want to use your yacht, and I don't want this thing smelling like fish.",
          imgUrl: "/images/feed/big_banner.png",
        },
        {
          title: "Header",
          id: 3,
          time: "8m ago",
          description:
            "He'll want to use your yacht, and I don't want this thing smelling like fish.",
          imgUrl: "/images/feed/big_banner.png",
        },
        {
          title: "Header",
          id: 4,
          time: "8m ago",
          description:
            "He'll want to use your yacht, and I don't want this thing smelling like fish.",
          imgUrl: "/images/feed/big_banner.png",
        },
        {
          title: "Header",
          id: 5,
          time: "8m ago",
          description:
            "He'll want to use your yacht, and I don't want this thing smelling like fish.",
          imgUrl: "/images/feed/big_banner.png",
        },
        {
          title: "Header",
          id: 6,
          time: "8m ago",
          description:
            "He'll want to use your yacht, and I don't want this thing smelling like fish.",
          imgUrl: "/images/feed/big_banner.png",
        },
        {
          title: "Header",
          id: 7,
          time: "8m ago",
          description:
            "He'll want to use your yacht, and I don't want this thing smelling like fish.",
          imgUrl: "/images/feed/big_banner.png",
        },
        {
          title: "Header",
          id: 8,
          time: "8m ago",
          description:
            "He'll want to use your yacht, and I don't want this thing smelling like fish.",
          imgUrl: "/images/feed/big_banner.png",
        },
        {
          title: "Header",
          id: 9,
          time: "8m ago",
          description:
            "He'll want to use your yacht, and I don't want this thing smelling like fish.",
          imgUrl: "/images/feed/big_banner.png",
        },
        {
          title: "Header",
          id: 10,
          time: "8m ago",
          description:
            "He'll want to use your yacht, and I don't want this thing smelling like fish.",
          imgUrl: "/images/feed/big_banner.png",
        },
      ],
    });

    const profilePhotos = computed(() => {
      return useProfileStore().profilePhotos;
    });

    // get photos
    const getProfilePhotos = async () => {
      try {
        const data = await useProfileStore().getProfilePhotos();
      } catch (e: any) {
        console.log("error", e);
      }
    };

    onMounted(async () => {
      // checks if profilePhotos exist and fetches it when doesn't
      if (!profilePhotos.value.length) {
        await getProfilePhotos();
      }
    });

    return {
      ...toRefs(state),
      profilePhotos,
      getProfilePhotos,
    };
  },
});
</script>

<style lang="scss" scoped>
.content {
  padding: 0 16px;
  &__body {
    .wrapper {
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
