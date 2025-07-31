<script setup lang="ts">
import { type ToastOptions } from "vue3-toastify";
import { type PropType, defineProps, ref, computed, type Ref } from "vue";

const props = defineProps({
  closeToast: Function as PropType<(e?: MouseEvent) => void>,
  toastProps: Object as PropType<ToastOptions>,
});
const toastData: Ref = ref(props.toastProps?.data);
const type = props.toastProps?.type ? props.toastProps?.type : "";

const title = ref(type);
const subTitle = ref(toastData.value?.message);

const titleClassName = computed(() => {
  return type === "success"
    ? "Toastify__toast__success-title-text"
    : "Toastify__toast__error-title-text";
});
const subTitleClassName = computed(() => {
  return type === "success"
    ? "Toastify__toast__success-sub-title-text"
    : "Toastify__toast__error-sub-title-text";
});
</script>

<template>
  <div>
    <span :class="titleClassName" class="toast-title">{{ title }}: </span>
    <span :class="subTitleClassName">{{ subTitle }}</span>
  </div>
</template>

<style scoped lang="scss">
.toast-title {
  text-transform: capitalize;
}
</style>
