<template>
  <ModalComponent
    v-model="dialogModel"
    :title="title"
    :ok-text="confirmText"
    :cancel-text="cancelText"
    :loading="loading"
    :disabled="loading"
    :persistent="loading"
    :teleport-to-local="false"
    @ok="handleConfirm"
    @cancel="handleCancel"
  >
    <div class="confirm-dialog-body">
      <v-icon v-if="icon" :color="iconColor" size="48" class="mb-4">
        {{ icon }}
      </v-icon>
      <p class="text-body-1">{{ message }}</p>
    </div>
  </ModalComponent>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ModalComponent from "@/components/ModalComponent.vue";

interface Props {
  modelValue: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  icon?: string;
  iconColor?: string;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: "Confirm",
  message: "Are you sure?",
  confirmText: "Confirm",
  cancelText: "Cancel",
  icon: "mdi-alert-circle-outline",
  iconColor: "error",
  loading: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  confirm: [];
  cancel: [];
}>();

const dialogModel = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
});

const handleConfirm = () => {
  emit("confirm");
};

const handleCancel = () => {
  dialogModel.value = false;
  emit("cancel");
};
</script>

<style scoped>
.confirm-dialog-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 8px 0;
}
</style>
