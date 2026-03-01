<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn @click="goBack">
          <template #prepend>
            <v-icon>mdi-arrow-left</v-icon>
          </template>
          Back
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-avatar size="100" rounded="lg">
          <v-img :src="company?.logo" alt="Company Logo" cover />
        </v-avatar>
      </v-col>
      <v-col cols="10">
        <h1>{{ company?.name }}</h1>
      </v-col>
    </v-row>
    <v-list lines="two" class="company-info">
      <v-list-item title="Email" :subtitle="company?.email"> </v-list-item>
      <v-list-item title="Website" :subtitle="company?.website"> </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCompaniesStore } from "@/stores/companies";
import { useRouter } from "vue-router";

const router = useRouter();
const companyStore = useCompaniesStore();
const { company } = storeToRefs(companyStore);

const goBack = () => {
  router.back();
};

console.log("company", company);
</script>

<style scoped>
.company-info {
  padding: 10px;
  margin-top: 20px;
  border-radius: 8px;
  background-color: rgb(70, 69, 69);
  color: white;
}
</style>
