<template>
  <div class="input">
    <!-- <div class="position-relative"> -->
    <label
      class="input-label"
      :class="{
        changed: value?.length || changed,
        error: error,
        success: success,
      }"
    >
      {{ placeholder }}
    </label>
    <input
      ref="input"
      placeholder=""
      :type="currentType"
      :value="modelValue"
      :disabled="disabled"
      class="input-field"
      :class="{
        changed: modelValue?.length || changed,
        error: error,
        success: success,
        rounded: rounded,
      }"
      @blur="handleEvent"
      @keydown="handleEvent"
      @focus="handleFocus"
      @input="(e) => (inputMode === 'input' ? handleInput(e) : null)"
      @change="(e) => (inputMode === 'change' ? handleInput(e) : null)"
    />
    <button
      v-if="hint && modelValue?.length"
      class="hide-btn"
      type="button"
      :disabled="disabled"
      @click="changeType"
    >
      {{ currentType === "password" ? "Show" : "Hide" }}
    </button>
    <span v-if="error" class="hint-error">{{ error }}</span>
    <!-- <span v-if="hint" class="hint-text">{{ hint }}</span> -->
    <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CustomInput",
  props: {
    allowClear: {
      type: Boolean,
      default: false,
    },
    autoFocus: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: "",
    },
    hint: {
      type: Boolean,
      default: false,
    },
    inputMode: {
      type: String,
      default: "input",
    },
    noCyrillic: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
    success: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: String,
      required: true,
    },
    typeInput: {
      type: String,
      default: "",
    },
    rounded: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "event"],
  data() {
    return {
      localValue: this.value,
      currentType: this.type,
      changed: false,
    };
  },
  computed: {
    modelValue: {
      get() {
        return this.localValue;
      },
      set(value: string) {
        this.localValue = value;
        this.$emit("update:modelValue", value);
        this.changed = !!value;
      },
    },
  },
  methods: {
    focusInput() {
      if (this.autoFocus) {
        this.$nextTick(() => {
          (this.$refs.input as HTMLInputElement).focus();
        });
      }
    },
    handleFocus() {
      this.changed = true;
    },
    changeType() {
      this.currentType = this.currentType === "password" ? "text" : "password";
    },
    handleInput(event: Event) {
      const inputValue = (event.target as HTMLInputElement).value;
      this.$emit("update:modelValue", inputValue);
    },
    handleEvent(event: Event) {
      if (event.type === "blur") {
        this.changed = false;
        this.$emit("event", (event.target as HTMLInputElement).value);
      } else if ((event as KeyboardEvent).key === "Enter") {
        this.$emit("event", (event.target as HTMLInputElement).value);
      } else if (
        (event as KeyboardEvent).key === "Backspace" &&
        this.typeInput == "phone"
      ) {
        if ((event.target as HTMLInputElement).value.length < 3)
          event.preventDefault();
        this.$emit("event", (event.target as HTMLInputElement).value);
      }
    },
  },
  mounted() {
    this.focusInput();
  },
  watch: {
    value(v: string) {
      this.localValue = v;
      this.changed = !!v;
    },
    type(newType: string) {
      this.currentType = newType;
    },
  },
});
</script>
<style lang="scss" scoped>
.position-relative {
  position: relative;
}

.hide-btn {
  color: #5db075;
  background: transparent;
  border: 0;
  outline: none !important;
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 16px;
  padding: 0;
  z-index: 2;
  cursor: pointer;
}
.input {
  --error-clr: #ff0000;
  --success-clr: #2aa65c;

  margin-bottom: 16px;
  position: relative;
  &-field {
    box-sizing: border-box;
    position: relative;
    padding: 16px 16px 15px 16px;
    color: #bdbdbd;
    background-color: #f6f6f6;
    border-radius: 8px;
    border: 0px solid #e8e8e8;
    outline: none;
    z-index: 1;
    max-width: 343px;
    min-width: 100%;
    font-size: 16px;
    line-height: 19px;
    font-weight: 500;
    &:focus {
    }
    // state
    &.changed {
      // padding: 2rem 1rem 1rem;
      padding-top: 22px;
      padding-bottom: 10px;
    }
    &.rounded {
      border-radius: 100px;
    }
    &.error {
      border: 1px solid var(--error-clr);
    }
  }
  &-label {
    color: #b9b9b9;
    font-size: 16px;
    font-weight: 500;
    position: absolute;
    pointer-events: none;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    transition: all ease-out 200ms;
    z-index: 2;
    font-size: 16px;
    line-height: 19px;
    font-weight: 500;
    &.changed {
      font-size: 12px;
      top: 12px;
      transition: all ease 200ms;
    }
  }

  .hint {
    &-error {
      font-size: 10px;
      line-height: 1.1;
      color: var(--error-clr);
      margin-top: 0.25rem;
      position: absolute;
      bottom: -12px;
      left: 0;
    }

    &-text {
      color: #99a3b3;
      font-size: 12px;
      font-weight: 500;
      line-height: 1.33;
      margin-top: 0.25rem;
    }
  }
}
</style>
