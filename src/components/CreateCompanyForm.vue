<script setup lang="ts">
import { ref, watch } from "vue";
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { validateFile, getAcceptedFileTypes } from "@/utils/validation";
import {
  formatFileSize,
  getFilePreviewUrl,
  revokeFilePreviewUrl,
} from "@/utils/fileHelpers";
import { createCompanySchema, type CreateCompanySchema } from "@/schemas";

const props = defineProps<{
  onSubmit: (data: CreateCompanySchema & { logo: File | null }) => void;
}>();

const validationSchema = toTypedSchema(createCompanySchema);

const { handleSubmit, resetForm, errors } = useForm({
  validationSchema,
  initialValues: {
    name: "",
    email: "",
    website: "",
  },
});

const { value: name } = useField<string>("name");
const { value: email } = useField<string>("email");
const { value: website } = useField<string>("website");

const logo = ref<File | null>(null);
const logoError = ref<string | null>(null);
const previewUrl = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const acceptedTypes = getAcceptedFileTypes();

const handleFileChange = (file: File) => {
  if (previewUrl.value) {
    revokeFilePreviewUrl(previewUrl.value);
    previewUrl.value = null;
  }

  logo.value = file;

  const error = validateFile(file);
  logoError.value = error;

  // Create preview if file is valid
  if (file && !error) {
    previewUrl.value = getFilePreviewUrl(file);
  }
};

const handleNativeFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files && files.length > 0) {
    handleFileChange(files[0]);
  }
};

const clearFile = () => {
  if (previewUrl.value) {
    revokeFilePreviewUrl(previewUrl.value);
    previewUrl.value = null;
  }
  logo.value = null;
  logoError.value = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const onSubmit = handleSubmit((values) => {
  const fileError = validateFile(logo.value);
  if (fileError) {
    logoError.value = fileError;
    return;
  }

  const data = {
    name: values.name,
    email: values.email,
    website: values.website,
    logo: logo.value,
  };

  props.onSubmit(data);
});

const resetFormData = () => {
  resetForm();
  logo.value = null;
  logoError.value = null;

  if (previewUrl.value) {
    revokeFilePreviewUrl(previewUrl.value);
    previewUrl.value = null;
  }
};

defineExpose({
  submitForm: onSubmit,
  resetForm: resetFormData,
});

watch(
  () => previewUrl.value,
  (newUrl, oldUrl) => {
    if (oldUrl && oldUrl !== newUrl) {
      revokeFilePreviewUrl(oldUrl);
    }
  },
);
</script>

<template>
  <v-form @submit.prevent="onSubmit">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="name"
            label="Company Name"
            placeholder="Enter company name"
            variant="outlined"
            :error-messages="errors.name"
            required
          />
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="email"
            label="Email"
            placeholder="company@example.com"
            variant="outlined"
            type="email"
            :error-messages="errors.email"
            required
          />
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="website"
            label="Website"
            placeholder="https://example.com"
            variant="outlined"
            type="url"
            :error-messages="errors.website"
            required
          />
        </v-col>

        <v-col cols="12">
          <div class="d-flex align-start flex-column ga-4">
            <input
              ref="fileInput"
              type="file"
              :accept="acceptedTypes"
              @change="handleNativeFileChange"
              style="display: none"
            />
            <v-btn color="primary" @click="fileInput?.click()" size="large">
              <v-icon>mdi-upload</v-icon>
              Upload Logo
            </v-btn>

            <v-chip
              v-if="logo"
              class="pa-3"
              closable
              @click:close="clearFile"
              size="small"
            >
              {{ logo.name }}
              [{{ formatFileSize(logo.size) }}]
            </v-chip>
          </div>
          <div v-if="logoError" class="text-error text-caption mt-1">
            {{ logoError }}
          </div>
        </v-col>

        <v-col v-if="previewUrl" cols="12">
          <div class="preview-container">
            <p class="text-subtitle-2 mb-2">Logo Preview:</p>
            <v-img
              :src="previewUrl"
              max-width="200"
              max-height="200"
              width="200"
              class="preview-image"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
    <button type="submit" style="display: none" aria-hidden="true"></button>
  </v-form>
</template>

<style scoped>
.preview-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.preview-image {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}
</style>
