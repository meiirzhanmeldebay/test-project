<template>
  <div class="sign-in">
    <!-- <h1>index page</h1> -->
    <CommonLayoutHeader
      title="Sign Up"
      :enableCustomEvent="true"
      customLink="close"
      to="/sign-in"
      @backHandler="logout"
    />
    <form @submit.prevent="signup">
      <div class="sign-in__body">
        <CommonFormInput
          v-model="form.name.value"
          :value="form.name.value"
          :error="form.name.error"
          :disabled="loading"
          :placeholder="'Name'"
          :single-mode="false"
        />

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
        <CommonFormCheckbox
          v-model="form.agreement.value"
          :value="form.agreement.value"
          label="I would like to receive your newsletter and other promotional information."
        />
      </div>
      <div class="sign-in__footer">
        <CommonButton
          :loading="loading"
          :disabled="
            loading || !form.agreement.value || !isFilled || !validEmail
          "
          type="submit"
          className="primary"
        >
          Sign Up
        </CommonButton>
        <CommonButton className="text"> Forgot your password? </CommonButton>
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
import CommonFormCheckbox from "../components/form/checkbox.vue";
import CommonButton from "../components/common/button.vue";

// importing global types
import type { TField, IForm } from "../types/global";

import { useAuthStore } from "../store/auth";

export default defineComponent({
  components: {
    CommonLayoutHeader,
    CommonFormInput,
    CommonFormCheckbox,
    CommonButton, // Registering the component
  },
  setup() {
    const router = useRouter();

    const authStore = useAuthStore();

    const state = reactive<{
      form: IForm;
      loading: boolean;
    }>({
      form: {
        name: {
          value: "",
          error: "",
        },
        email: {
          value: "",
          error: "",
          status: false,
        },
        password: {
          value: "",
          error: "",
        },
        agreement: {
          value: false,
          error: "",
        },
      },
      loading: false,
    });

    const logout = () => {
      alert("You are logging out!");
      useAuthStore().logout();
      router.push("/sign-in");
    };

    // checking is all input filled
    const isFilled = computed(() => {
      let requiredFields = ["name", "email", "password"];
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

    const signup = async () => {
      state.loading = true;

      let user = {
        email: String(state.form.email.value),
        name: String(state.form.name.value),
        password: String(state.form.password.value),
      };
      let isSignedUp = useAuthStore().signup(
        user.email,
        user.name,
        user.password
      );

      if (isSignedUp) {
        router.push("/profile");
        resetForm();
        state.loading = false;
      } else {
        alert("Please check your input");
        state.loading = false;
      }
    };

    // validate proper email
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

    const resetForm = () => {
      state.form = {
        name: {
          value: "",
          error: "",
        },
        email: {
          value: "",
          error: "",
          status: false,
        },
        password: {
          value: "",
          error: "",
        },
        agreement: {
          value: false,
          error: "",
        },
      };
    };

    return {
      ...toRefs(state),
      isFilled,
      validEmail,
      signup,
      validateEmail,
      resetForm,
      logout,
    };
  },
});
</script>
