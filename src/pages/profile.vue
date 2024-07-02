<template>
  <div class="profile">
    <div class="profile__container">
      <div class="profile__header">
        <CommonLayoutHeader
          title="Profile"
          :enableCustomEvent="true"
          :enable-filter="false"
          :customStyle="true"
          customLink="Settings"
          @backHandler="logout"
        />
        <div class="avatar">
          <div class="picture">
            <img src="/images/avatar.png" alt="" />
          </div>
          <div class="content">
            <h2 class="title">
              {{ userData.name }}
            </h2>
            <p class="sub">
              {{ userData.email }}
            </p>
          </div>
        </div>
      </div>
      <div class="profile__content">
        <CommonTabs
          theme="subMobile"
          :tabs="tabsData"
          :active-index="activeIndexTab"
          @tab-selected="updateActiveTab"
        />
        <div class="tab-content">
          <template v-if="activeTab === 'posts'">
            <CommonFeedItem
              v-for="(item, key) in profilePosts"
              :key="key"
              :id="item.id"
              :title="item.title"
              :time="item.time ? item.time : '8m ago'"
              :description="item.body"
              :imgUrl="
                item.imgUrl ? item.imgUrl : '/images/feed/big_banner.png'
              "
            />
          </template>
          <template v-if="activeTab === 'photos'">
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
        </div>
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
import CommonFeedItem from "../components/pages/feed/item.vue";
import CommonContentItem from "../components/pages/content/item.vue";
import CommonTabs from "../components/common/layout/tab.vue";

// importing global types
import type { TField, FeedItem, TabItem, IForm } from "../types/global";

import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";

export default defineComponent({
  components: {
    // Registering the component
    CommonLayoutHeader,
    CommonFormInput,
    CommonFeedItem,
    CommonContentItem,
    CommonTabs,
  },
  setup() {
    const router = useRouter();

    const profileStore = useProfileStore();

    const state = reactive<{
      form: IForm;
      loading: boolean;
      feedData: FeedItem[];
      tabsData: TabItem[];
      activeIndexTab: number;
      activeTab: string;
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
      activeIndexTab: 0,
      activeTab: "posts",
      tabsData: [
        {
          id: 1,
          title: "Posts",
          slug: "posts",
        },
        {
          id: 2,
          title: "Photos",
          slug: "photos",
        },
      ],
    });

    // activetes clicked tab
    const updateActiveTab = (slug: string, index: number) => {
      state.activeTab = slug;
      state.activeIndexTab = index;
      // если нужен router query
      // if (index === 0) router.replace({ query: {} });
      // else router.replace({ query: { tab: slug } });
    };

    const profilePosts = computed(() => {
      return useProfileStore().profilePosts;
    });

    const profilePhotos = computed(() => {
      return useProfileStore().profilePhotos;
    });

    const userData = computed(() => {
      return useAuthStore().userData;
    });

    const logout = () => {
      alert("You are logging out!");
      useAuthStore().logout();
      router.push("/sign-in");
    };

    // get profile photos
    const getProfilePhotos = async () => {
      try {
        const data = await useProfileStore().getProfilePhotos();
      } catch (e: any) {
        console.log("error", e);
      }
    };

    // get profile posts
    const getProfilePosts = async () => {
      try {
        const data = await useProfileStore().getProfilePosts();
      } catch (e: any) {
        console.log("error", e);
      }
    };

    onMounted(async () => {
      await getProfilePhotos();
      await getProfilePosts();
    });

    return {
      ...toRefs(state),
      profilePosts,
      profilePhotos,
      userData,
      updateActiveTab,
      getProfilePhotos,
      getProfilePosts,
      logout,
    };
  },
});
</script>

<style lang="scss" scoped>
.profile {
  // padding: 0 16px;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200px;
    background: #5db075;
    z-index: 1;
  }
  &__header {
    position: relative;
    z-index: 2;

    .avatar {
      // margin-top: 16px;
      position: relative;
      text-align: center;
      z-index: 2;
      .picture {
        text-align: center;
      }
      .content {
        .title {
          margin: 0;
          font-size: 30px;
          line-height: 36px;
          color: #000;
          margin-bottom: 8px;
        }
        .sub {
          font-size: 16px;
          line-height: 19px;
        }
      }
    }
  }
  &__content {
    padding: 0 16px;
    .content {
      @media screen and (min-width: 992px) {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
      }
    }
    .tab-content {
      padding: 16px 0;
      @media screen and (min-width: 992px) {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
      }
    }
  }
  &__footer {
    text-align: center;
  }
}
</style>
