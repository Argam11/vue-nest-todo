<template>
  <ErrorComponent v-if="error" />
  <v-container v-else>
    <v-row>
      <v-col cols="8">
        <h1 class="text-h4">Employees</h1>
      </v-col>
      <v-col cols="4" class="d-flex justify-end align-center">
        <v-btn color="primary" class="px-4 text-none" @click="addEmployee"
          >Add Employee</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <EmployeesTable
          :employees="employees"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </v-col>
    </v-row>
  </v-container>

  <ConfirmDialog
    v-model="showDeleteConfirm"
    title="Delete Employee"
    :message="`Are you sure you want to delete &quot;${deletingEmployee?.name}&quot;? This action cannot be undone.`"
    confirm-text="Delete"
    :loading="isDeleting"
    @confirm="confirmDelete"
    @cancel="cancelDelete"
  />

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
    <CreateEmployeeForm
      ref="formRef"
      :employee="editingEmployee"
      :companies="companies"
      @submit="handleFormSubmit"
    />
  </ModalComponent>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { toast } from "vue3-toastify";
import { useEmployeesStore } from "@/stores/employees";
import { useCompaniesStore } from "@/stores/companies";
import EmployeesTable from "@/components/EmployeesTable.vue";
import ModalComponent from "@/components/ModalComponent.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import CreateEmployeeForm from "@/components/CreateEmployeeForm.vue";
import type { CreateEmployeeSchema } from "@/schemas";
import type { Employee } from "@/types/employees";
import ErrorComponent from "@/components/Error.vue";

const employeesStore = useEmployeesStore();
const { employees, error } = storeToRefs(employeesStore);

const companiesStore = useCompaniesStore();
const { companies } = storeToRefs(companiesStore);

const showModal = ref(false);
const isSubmitting = ref(false);
const formRef = ref<InstanceType<typeof CreateEmployeeForm> | null>(null);
const editingEmployee = ref<Employee | null>(null);
const deletingEmployee = ref<Employee | null>(null);
const showDeleteConfirm = ref(false);
const isDeleting = ref(false);

const isEditing = computed(() => !!editingEmployee.value);
const modalTitle = computed(() =>
  isEditing.value ? "Edit Employee" : "Add Employee",
);

const ensureCompaniesLoaded = async () => {
  if (!companies.value.length) {
    await companiesStore.fetchCompanies();
  }
};

const addEmployee = async () => {
  editingEmployee.value = null;
  await ensureCompaniesLoaded();
  showModal.value = true;
};

const handleFormSubmit = async (data: CreateEmployeeSchema) => {
  isSubmitting.value = true;

  try {
    if (isEditing.value && editingEmployee.value) {
      await employeesStore.updateEmployee({
        id: editingEmployee.value._id,
        name: data.name,
        email: data.email,
        position: data.position,
        companyId: data.companyId,
      });

      toast.success("Employee updated successfully!", {
        position: "top-right",
      });
    } else {
      await employeesStore.createEmployee({
        name: data.name,
        email: data.email,
        position: data.position,
        companyId: data.companyId,
      });

      toast.success("Employee created successfully!", {
        position: "top-right",
      });
    }

    showModal.value = false;
    editingEmployee.value = null;
    formRef.value?.resetForm();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to save employee";
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
  editingEmployee.value = null;
  formRef.value?.resetForm();
};

const handleEdit = async (id: string) => {
  const employee = employees.value.find((e) => e._id === id);
  if (!employee) return;

  await ensureCompaniesLoaded();

  editingEmployee.value = employee;
  formRef.value?.resetForm();
  showModal.value = true;
};

const handleDelete = (id: string) => {
  const employee = employees.value.find((e) => e._id === id);
  if (!employee) return;

  deletingEmployee.value = employee;
  showDeleteConfirm.value = true;
};

const confirmDelete = async () => {
  if (!deletingEmployee.value) return;

  isDeleting.value = true;
  try {
    await employeesStore.deleteEmployee(deletingEmployee.value._id);
    toast.success("Employee deleted successfully!", {
      position: "top-right",
    });
    showDeleteConfirm.value = false;
    deletingEmployee.value = null;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete employee";
    toast.error(errorMessage, {
      position: "top-right",
    });
  } finally {
    isDeleting.value = false;
  }
};

const cancelDelete = () => {
  deletingEmployee.value = null;
};
</script>
