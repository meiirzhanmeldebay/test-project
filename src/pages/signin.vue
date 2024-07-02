<template>
  <div class="sign-in">
    <!-- <h1>index page</h1> -->
    <CommonLayoutHeader
      title="Log in"
      :enableCustomEvent="false"
      :enableFilter="false"
    />
    <form @submit.prevent="signin">
      <div class="sign-in__body">
        <CommonFormInput
          v-model="form.email.value"
          :value="form.email.value"
          :error="form.email.error"
          :disabled="loading"
          :placeholder="'Email'"
          :single-mode="false"
        />
        <CommonFormInput
          v-model="form.password.value"
          :value="form.password.value"
          :error="form.password.error"
          :disabled="loading"
          :placeholder="'Password'"
          :single-mode="false"
          type="password"
          :hint="true"
        />
      </div>
      <div class="sign-in__footer">
        <CommonButton
          :loading="loading"
          type="submit"
          className="primary"
          :disabled="loading || !isFilled || !validEmail"
        >
          Log In
        </CommonButton>
        <CommonButton className="text" :disabled="loading">
          Forgot your password?
        </CommonButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs } from "vue";
import { useRouter } from "vue-router";

// importing global components
import CommonLayoutHeader from "../components/common/layout/bheader.vue";
import CommonFormInput from "../components/form/input.vue";
import CommonButton from "../components/common/button.vue";

// importing global types
import type { TField, IForm } from "../types/global";

import { useAuthStore } from "../store/auth";

export default defineComponent({
  components: {
    CommonLayoutHeader,
    CommonFormInput,
    CommonButton, // Registering the component
  },
  setup() {
    const router = useRouter();

    const state = reactive<{
      form: IForm;
      loading: boolean;
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
    });

    // checking is all input filled
    const isFilled = computed(() => {
      let requiredFields = ["email", "password"];
      return requiredFields.every((field) =>
        typeof state.form[field].value === "string"
          ? !!String(state.form[field]?.value).trim()
          : false
      );
    });

    // checking valid email
    const validEmail = computed(() => {
      return state.form.email.value ? validateEmail() : false;
    });

    const users = computed(() => {
      return useAuthStore().users;
    });

    const userData = computed(() => {
      return useAuthStore().userData;
    });

    const validateEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (state.form.email.value && !emailRegex.test(state.form.email.value)) {
        state.form.email.error = "validation.incorrect_email";
        state.form.email.status = false;
        return false;
      } else {
        state.form.email.error = "";
        state.form.email.status = true;

        return true;
      }
    };

    const signin = async () => {
      state.loading = true;
      // validateEmail();
      let user = {
        email: String(state.form.email.value),
        password: String(state.form.password.value),
      };

      let loginStatus = useAuthStore().signin(user.email, user.password);
      if (loginStatus) {
        router.push("/profile");
        state.loading = false;
      } else {
        alert("Please check your input");
        state.loading = false;
      }
    };

    const resetForm = () => {
      state.form = {
        email: {
          value: "",
          error: "",
          status: false,
        },
        password: {
          value: "",
          error: "",
        },
      };
    };

    return {
      ...toRefs(state),
      isFilled,
      users,
      userData,
      validEmail,
      signin,
      validateEmail,
      resetForm,
    };
  },
});
</script>