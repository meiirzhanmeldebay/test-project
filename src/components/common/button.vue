<template>
  <button
    :type="type"
    class="button"
    :class="`button-${className} ${loading ? 'loading' : ''}`"
    :disabled="disabled"
  >
    <loader v-if="loading" />
    <slot v-else></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import loader from "../../components/common/layout/loader.vue";

export default defineComponent({
  name: "Button",
  components: {
    // Registering the component
    loader,
  },
  props: {
    type: {
      type: String,
      default: "submit",
    },
    className: {
      type: String,
      default: "primary",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.button {
  --fnt-clr: #fff;
  color: var(--fnt-clr);
  display: block;
  font-weight: 600;
  line-height: 1.25;
  border-radius: 100px;
  border: 0;
  box-shadow: none;
  padding: 16px;
  max-width: 343px;
  min-width: 100%;
  font-size: 16px;
  line-height: 19px;

  // state
  &:hover,
  &:active {
    color: var(--fnt-clr);
  }
  &:focus {
    outline: none;
  }
  &:disabled,
  &.loading {
    user-select: none;
    pointer-events: none;
  }
  // theme - type
  &-primary {
    background: #5db075;
    // box-shadow: 0px 0.25rem 0.75rem 0px rgba(42, 166, 92, 0.4);
    &:hover,
    &:active {
      background: #4b9460;
    }
    &:disabled,
    &.disabled {
      opacity: 0.30000001192092896;
      background: #4b9460;
    }
  }

  &-text {
    --fnt-clr: #5db075;
    background: transparent;

    &:hover,
    &:active {
      background: #f6f6f6;
      --fnt-clr: #4b9460;
    }

    &:disabled,
    &.disabled {
      opacity: 0.5;
    }
  }

  &-grey {
    --fnt-clr: #5db075;
    background: #f1f2f6;
    box-shadow: none;
    padding: 0.5rem 1rem;
    font-size: 12px;
    text-transform: uppercase;
    border-radius: 1rem;
    font-weight: 700;
    min-width: 98px;
    height: 31px;
    margin-bottom: 0.5rem;
    &:disabled,
    &.disabled {
      opacity: 0.5;
    }
    &:hover,
    &:active {
      background: #f1f2f6;
    }
  }
}
</style>