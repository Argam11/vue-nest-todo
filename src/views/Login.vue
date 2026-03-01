<template>
  <div class="login-form">
    <h1>Login</h1>
    <v-form @submit.prevent="submit">
      <v-text-field
        class="my-6"
        variant="outlined"
        v-model="username"
        :error-messages="errors.username"
        label="Username"
      />
      <v-text-field
        class="my-6"
        variant="outlined"
        v-model="password"
        :error-messages="errors.password"
        label="Password"
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append-inner="showPassword = !showPassword"
      />
      <v-btn class="mt-2" type="submit" block :disabled="isSubmitting">
        <template #prepend>
          <v-progress-circular
            v-if="isSubmitting"
            indeterminate
            size="20"
            width="2"
          ></v-progress-circular>
        </template>
        {{ isSubmitting ? "Loading..." : "Submit" }}</v-btn
      >
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue3-toastify";

import { login } from "@/services/auth";
import ToastifyComponent from "@/components/ToastifyComponent.vue";
import { useUserStore } from "@/stores/user";
import { loginSchema } from "@/schemas";

const userStore = useUserStore();
const showPassword = ref(false);

const router = useRouter();

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: {
    username: "",
    password: "",
  },
});

const { value: username } = useField<string>("username");
const { value: password } = useField<string>("password");

const submit = handleSubmit(async (values) => {
  try {
    const { username } = await login(values);

    userStore.setUser({ username });
    router.replace("/");
  } catch (error) {
    if (error instanceof Error) {
      toast.error(ToastifyComponent, {
        data: { message: error.message },
      });
    }
  }
});
</script>

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
