<template>
  <ErrorComponent v-if="error" />
  <v-container v-else>
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
        <CompaniesTable
          :companies="companies"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </v-col>
    </v-row>
  </v-container>

  <ModalComponent
    v-model="showModal"
    :title="modalTitle"
    :teleport-to-local="false"
    ok-text="Submit"
    cancel-text="Cancel"
    :loading="isSubmitting"
    :disabled="isSubmitting"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <CreateCompanyForm
      ref="formRef"
      :company="editingCompany"
      @submit="handleFormSubmit"
    />
  </ModalComponent>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { toast } from "vue3-toastify";
import { useCompaniesStore } from "@/stores/companies";
import CompaniesTable from "@/components/CompaniesTable.vue";
import ModalComponent from "@/components/ModalComponent.vue";
import CreateCompanyForm from "@/components/CreateCompanyForm.vue";
import type { Company, CreateCompanyInput } from "@/types/companies";
import ErrorComponent from "@/components/Error.vue";

const companyStore = useCompaniesStore();
const { companies, error } = storeToRefs(companyStore);

const showModal = ref(false);
const isSubmitting = ref(false);
const formRef = ref<InstanceType<typeof CreateCompanyForm> | null>(null);
const editingCompany = ref<Company | null>(null);

const isEditing = computed(() => !!editingCompany.value);
const modalTitle = computed(() => (isEditing.value ? "Edit Company" : "Add Company"));

const addCompany = () => {
  editingCompany.value = null;
  showModal.value = true;
};

const handleFormSubmit = async (data: CreateCompanyInput) => {
  isSubmitting.value = true;

  try {
    if (isEditing.value && editingCompany.value) {
      await companyStore.updateCompany({
        id: editingCompany.value._id,
        name: data.name,
        email: data.email,
        website: data.website,
        logo: data.logo,
      });

      toast.success("Company updated successfully!", {
        position: "top-right",
      });
    } else {
      await companyStore.createCompany({
        name: data.name,
        email: data.email,
        website: data.website,
        logo: data.logo,
      });

      toast.success("Company created successfully!", {
        position: "top-right",
      });
    }

    showModal.value = false;
    editingCompany.value = null;
    formRef.value?.resetForm();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to save company";
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
  editingCompany.value = null;
  formRef.value?.resetForm();
};

const handleEdit = (id: string) => {
  const company = companies.value.find((c) => c._id === id);
  if (!company) return;

  editingCompany.value = company;
  formRef.value?.resetForm();
  showModal.value = true;
};

const handleDelete = (id: string) => {
  console.log(id);
};
</script>
