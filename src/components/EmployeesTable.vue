<template>
  <v-data-table
    :headers="headers"
    :items="employees"
    loading-text="Loading employees..."
    no-data-text="No employees found"
    class="elevation-1"
  >
    <template v-slot:[`item.email`]="{ item }">
      <a v-if="item.email" :href="`mailto:${item.email}`" class="text-primary">
        {{ item.email }}
      </a>
      <span v-else class="text-grey">—</span>
    </template>

    <template v-slot:[`item.companyName`]="{ item }">
      <router-link
        v-if="item.companyId"
        :to="`/companies/${item.companyId}`"
      >
        {{ item.companyName }}
      </router-link>
      <span v-else class="text-grey">—</span>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-btn
        color="primary"
        icon="mdi-pencil"
        size="small"
        variant="text"
        class="mr-2"
        title="Edit"
        @click="emit('edit', item._id)"
      />
      <v-btn
        color="error"
        icon="mdi-delete"
        size="small"
        variant="text"
        title="Delete"
        @click="emit('delete', item._id)"
      />
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import type { Employee } from "@/types/employees";

interface Props {
  employees: Employee[];
}

defineProps<Props>();

const emit = defineEmits<{
  (event: "edit", id: string): void;
  (event: "delete", id: string): void;
}>();

const headers = [
  { title: "Name", value: "name", sortable: true },
  { title: "Company", value: "companyName", sortable: true },
  { title: "Email", value: "email", sortable: true },
  { title: "Position", value: "position", sortable: true },
  {
    title: "Actions",
    value: "actions",
    sortable: false,
    align: "end" as const,
  },
];
</script>

<style scoped>
.v-data-table {
  border-radius: 8px;
}
</style>
