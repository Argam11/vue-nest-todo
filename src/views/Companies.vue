<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">Companies</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <CompaniesTable :companies="store.companies" :loading="store.loading" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useCompaniesStore } from "@/stores/companies";
import CompaniesTable from "@/components/CompaniesTable.vue";

const store = useCompaniesStore();

onMounted(() => {
  store.fetchCompanies();
});
</script>
