<template>
  <v-data-table
    :headers="headers"
    :items="companies"
    :loading="loading"
    loading-text="Loading companies..."
    no-data-text="No companies found"
    class="elevation-1"
  >
    <template v-slot:[`item.img`]="{ item }">
      <v-avatar size="48" class="my-2" rounded="lg">
        <v-img :src="item.img" :alt="item.name" cover />
      </v-avatar>
    </template>

    <template v-slot:[`item.email`]="{ item }">
      <a v-if="item.email" :href="`mailto:${item.email}`" class="text-primary">
        {{ item.email }}
      </a>
      <span v-else class="text-grey">—</span>
    </template>

    <template v-slot:[`item.website`]="{ item }">
      <a
        v-if="item.website"
        :href="item.website"
        target="_blank"
        rel="noopener noreferrer"
        class="text-primary"
      >
        {{ item.website }}
      </a>
      <span v-else class="text-grey">—</span>
    </template>

    <template v-slot:[`item.actions`]>
      <v-btn
        color="primary"
        icon="mdi-pencil"
        size="small"
        variant="text"
        disabled
        class="mr-2"
        title="Edit (Coming Soon)"
      />
      <v-btn
        color="error"
        icon="mdi-delete"
        size="small"
        variant="text"
        disabled
        title="Delete (Coming Soon)"
      />
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import type { Company } from "@/types/companies";

interface Props {
  companies: Company[];
  loading: boolean;
}

defineProps<Props>();

const headers = [
  { title: "Logo", value: "img", sortable: false },
  { title: "Name", value: "name", sortable: true },
  { title: "Email", value: "email", sortable: true },
  { title: "Website", value: "website", sortable: true },
  { title: "Actions", value: "actions", sortable: false, align: "end" as const },
];
</script>

<style scoped>
.v-data-table {
  border-radius: 8px;
}
</style>

