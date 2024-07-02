<template>
  <label class="checkbox" @click="toggleCheckbox">
    <input
      class="checkbox-input form-check-input"
      type="checkbox"
      v-model="isChecked"
      :disabled="disabled"
    />
    <span class="checkmark"></span>
    <span v-if="label" class="checkbox-label form-check-label">
      {{ label }}
    </span>
    <slot v-else />
  </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    singleMode: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  computed: {
    isChecked: {
      get() {
        return this.value;
      },
      set(newValue: boolean) {
        this.$emit("update:modelValue", newValue);
      },
    },
  },
  methods: {
    toggleCheckbox() {
      this.isChecked = !this.isChecked;
      this.$emit("update:modelValue", this.isChecked);
    },
  },
});
</script>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  align-items: center;
  margin: 1rem 0;
  position: relative;
  &-input {
    &.form-check-input {
      position: absolute;
      opacity: 0;
      width: 1em;
      height: 1em;
      margin: 0;
      /* When the checkbox is checked, add a blue background */
      &:checked ~ .checkmark {
        border-color: #2aa65c;
        // background-color: #2aa65c;
      }
      /* Show the checkmark when checked */
      &:checked ~ .checkmark:after {
        display: block;
      }
      &:focus {
        box-shadow: 0 0 0 0.25rem rgba(42, 166, 92, 0.25);
      }
    }
  }
  &-label {
    padding-left: 24px;
    color: #666666;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 1.25;
    // margin-left: 0.5rem;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 16px;
    width: 16px;
    background-color: #f6f6f6;
    border-radius: 4px;
    border: 1px solid transparent;
    /* Create the checkmark/indicator (hidden when not checked) */
    &:after {
      content: "";
      position: absolute;
      display: none;
      left: 4px;
      top: 2px;
      width: 4px;
      height: 7px;
      border: solid #2aa65c;
      border-width: 0 1px 1px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
}
</style>
