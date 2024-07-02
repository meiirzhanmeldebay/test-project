<template>
  <div class="loader" :class="className">
    <!-- <span class="spinner-border loader-spin" role="status" /> -->
  </div>
</template>
<script>
export default {
  props: {
    className: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
.loader {
  border: 2px solid #4b9460;
  border-radius: 50%;
  border-top: 2px solid #fff;
  width: 16px;
  height: 16px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  margin: auto;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
