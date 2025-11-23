<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <h1 class="text-h4">Companies</h1>
      </v-col>
      <v-col cols="4" class="d-flex justify-end align-center">
        <v-btn color="primary" class="px-4 text-none" @click="addCompany"
          >Add Company</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <CompaniesTable :companies="store.companies" :loading="store.loading" />
      </v-col>
    </v-row>
  </v-container>

  <ModalComponent
    v-model="showModal"
    title="Add Company"
    :teleport-to-local="false"
    ok-text="Submit"
    cancel-text="Cancel"
    :loading="isSubmitting"
    :disabled="isSubmitting"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <CreateCompanyForm ref="formRef" @submit="handleFormSubmit" />
  </ModalComponent>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { toast } from "vue3-toastify";
import { useCompaniesStore } from "@/stores/companies";
import CompaniesTable from "@/components/CompaniesTable.vue";
import ModalComponent from "@/components/ModalComponent.vue";
import CreateCompanyForm from "@/components/CreateCompanyForm.vue";
import type { CreateCompanyInput } from "@/types/companies";

const showModal = ref(false);
const isSubmitting = ref(false);
const formRef = ref<InstanceType<typeof CreateCompanyForm> | null>(null);

const addCompany = () => {
  showModal.value = true;
};

const handleFormSubmit = async (data: CreateCompanyInput) => {
  isSubmitting.value = true;

  try {
    await store.createCompany({
      name: data.name,
      email: data.email,
      website: data.website,
      logo: data.logo,
    });

    toast.success("Company created successfully!", {
      position: "top-right",
    });

    showModal.value = false;
    formRef.value?.resetForm();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create company";
    toast.error(errorMessage, {
      position: "top-right",
    });
  } finally {
    isSubmitting.value = false;
  }
};

const handleOk = () => {
  formRef.value?.submitForm();
};

const handleCancel = () => {
  showModal.value = false;
  formRef.value?.resetForm();
};

const store = useCompaniesStore();

onMounted(() => {
  store.fetchCompanies();
});
</script>
