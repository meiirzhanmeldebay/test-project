<template>
  <main>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </main>
  <AppFooter />
</template>
<script setup>
import AppFooter from "./components/footer.vue";
</script>
<style scoped lang="scss">
main {
  padding-bottom: 100px;
}
nav {
  display: flex;
  justify-content: center;
  a {
    margin-right: 16px;
  }
}
</style>