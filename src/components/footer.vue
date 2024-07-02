<template>
  <div class="footer">
    <div class="footer__container">
      <ul class="footer__list">
        <li class="footer__item">
          <router-link to="/feed" class="footer__link"> </router-link>
        </li>
        <li class="footer__item">
          <router-link to="/content" class="footer__link"></router-link>
        </li>
        <li class="footer__item">
          <router-link to="/" class="footer__link"></router-link>
        </li>
        <li class="footer__item">
          <router-link to="/sign-up" class="footer__link"></router-link>
        </li>
        <li class="footer__item">
          <router-link to="/profile" class="footer__link"></router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped lang="scss">
.footer {
  box-sizing: content-box;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 83px;
  background-color: #f6f6f6;
  &__container {
    padding: 15px 26px 36px 26px;
  }
  &__list {
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-between;
  }
  &__item {
    list-style: none;
  }
  &__link {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    &.active,
    &:hover {
      background-color: #5db075;
    }
  }
}
</style>