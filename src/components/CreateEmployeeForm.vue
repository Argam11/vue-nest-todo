<template>
  <v-form @submit.prevent="onSubmit">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="name"
            label="Employee Name"
            placeholder="Enter employee name"
            variant="outlined"
            :error-messages="errors.name"
            required
          />
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="email"
            label="Email"
            placeholder="employee@example.com"
            variant="outlined"
            type="email"
            :error-messages="errors.email"
            required
          />
        </v-col>

        <v-col cols="12">
          <v-select
            v-model="position"
            label="Position"
            placeholder="Select a position"
            variant="outlined"
            :items="EMPLOYEE_POSITIONS"
            :error-messages="errors.position"
            required
          />
        </v-col>

        <v-col cols="12">
          <v-select
            v-model="companyId"
            label="Company"
            placeholder="Select a company"
            variant="outlined"
            :items="companies"
            item-title="name"
            item-value="_id"
            :error-messages="errors.companyId"
            required
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { createEmployeeSchema, type CreateEmployeeSchema } from "@/schemas";
import { EMPLOYEE_POSITIONS } from "@/constants/employeePositions";
import type { Employee } from "@/types/employees";
import type { Company } from "@/types/companies";

const props = defineProps<{
  employee?: Employee | null;
  companies: Company[];
  onSubmit: (data: CreateEmployeeSchema) => void;
}>();

const validationSchema = toTypedSchema(createEmployeeSchema);

const { handleSubmit, resetForm, setValues, errors } = useForm({
  validationSchema,
  initialValues: {
    name: "",
    email: "",
    position: "",
    companyId: "",
  },
});

const { value: name } = useField<string>("name");
const { value: email } = useField<string>("email");
const { value: position } = useField<string>("position");
const { value: companyId } = useField<string>("companyId");

const onSubmit = handleSubmit((values) => {
  props.onSubmit(values);
});

onMounted(() => {
  if (props.employee) {
    setValues({
      name: props.employee.name,
      email: props.employee.email,
      position: props.employee.position,
      companyId: props.employee.companyId,
    });
  }
});

defineExpose({
  submitForm: onSubmit,
  resetForm,
});
</script>
