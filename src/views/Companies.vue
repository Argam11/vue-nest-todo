<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <h1 class="text-h4">Companies</h1>
      </v-col>
      <v-col cols="4" class="d-flex justify-end align-center">
        <v-btn color="primary" class="px-4 text-none" @click="addCompany">Add Company</v-btn>
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
    title="Confirm Action"
    :teleport-to-local="false"
    ok-text="Confirm"
    cancel-text="Cancel"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <p>Your custom content goes here</p>
  </ModalComponent>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useCompaniesStore } from "@/stores/companies";
import CompaniesTable from "@/components/CompaniesTable.vue";
import ModalComponent from "@/components/ModalComponent.vue";

const showModal = ref(false);

const addCompany = () => {
  showModal.value = true;
};

const handleOk = () => {
  console.log("OK clicked");
};

const handleCancel = () => {
  showModal.value = false;
};

const store = useCompaniesStore();

onMounted(() => {
  store.fetchCompanies();
});
</script>
