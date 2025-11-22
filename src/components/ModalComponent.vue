<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue: boolean;
  title?: string;
  teleportToLocal?: boolean;
  okText?: string;
  cancelText?: string;
  showOkButton?: boolean;
  showCancelButton?: boolean;
  persistent?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  teleportToLocal: false,
  okText: "Confirm",
  cancelText: "Cancel",
  showOkButton: true,
  showCancelButton: true,
  persistent: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  ok: [];
  cancel: [];
}>();

const dialogModel = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
});

const attachProp = computed(() => {
  return props.teleportToLocal ? false : undefined;
});

const handleOk = () => {
  emit("ok");
};

const handleCancel = () => {
  emit("cancel");
};

const handleClose = () => {
  dialogModel.value = false;
  emit("cancel");
};
</script>

<template>
  <v-dialog
    v-model="dialogModel"
    :persistent="persistent"
    :attach="attachProp"
    max-width="600"
  >
    <v-card>
      <v-card-title class="modal-header">
        <span class="modal-title">{{ title }}</span>
        <v-btn
          icon
          size="small"
          variant="text"
          class="close-button"
          @click="handleClose"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider />

      <v-card-text class="modal-content">
        <slot />
      </v-card-text>

      <v-divider />

      <v-card-actions class="modal-footer">
        <v-spacer />
        <v-btn
          v-if="showCancelButton"
          variant="text"
          class="px-4 text-none"
          @click="handleCancel"
        >
          {{ cancelText }}
        </v-btn>
        <v-btn
          v-if="showOkButton"
          color="primary"
          variant="elevated"
          class="px-4 text-none"
          @click="handleOk"
        >
          {{ okText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.modal-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 500;
  flex: 1;
}

.close-button {
  position: absolute;
  top: 8px;
  right: 8px;
}

.modal-content {
  padding: 24px;
  min-height: 100px;
}

.modal-footer {
  padding: 16px 24px;
  display: flex;
  gap: 20px;
}
</style>
