<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import { toast } from "vue3-toastify";

import { login } from "@/services/auth";
import type { LoginInput } from "@/types/login";
import ToastifyComponent from "@/components/ToastifyComponent.vue";

const showPassword = ref(false);
const loading = ref(false);

const router = useRouter();

const { handleSubmit } = useForm<LoginInput>({
  validationSchema: {
    username(value: string) {
      if (value?.length >= 2) return true;

      return "Username needs to be at least 2 characters.";
    },
    password(value: string) {
      if (value?.length >= 8) return true;

      return "Password needs to be at least 8 characters.";
    },
  },
});

const username = useField("username");
const password = useField("password");

const submit = handleSubmit(async (values) => {
  try {
    loading.value = true;
    const { access_token } = await login(values);

    localStorage.setItem("access_token", access_token);

    router.replace("/");

    console.log("access_token", access_token);
  } catch (error) {
    if (error instanceof Error) {
      toast.error(ToastifyComponent, {
        data: { message: error.message },
      });
    }
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="login-form">
    <h1>Login</h1>
    <v-form @submit.prevent="submit">
      <v-text-field
        class="my-6"
        variant="outlined"
        v-model="username.value.value"
        :error-messages="username.errorMessage.value"
        label="Username"
      />
      <v-text-field
        class="my-6"
        variant="outlined"
        v-model="password.value.value"
        :error-messages="password.errorMessage.value"
        label="Password"
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append-inner="showPassword = !showPassword"
      />
      <v-btn class="mt-2" type="submit" block>{{
        loading ? "Loading..." : "Submit"
      }}</v-btn>
    </v-form>
  </div>
</template>

<style scoped lang="scss">
.login-form {
  width: 400px;
  margin: 100px auto;
  border: 1px solid #fff;
  padding: 16px;
  border-radius: 8px;
  background-color: rgb(33, 33, 33);

  h1 {
    text-align: center;
  }
}
</style>
