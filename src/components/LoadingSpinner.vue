<script setup lang="ts">
interface Props {
  message?: string;
  fullscreen?: boolean;
}

withDefaults(defineProps<Props>(), {
  message: 'Loading...',
  fullscreen: true,
});
</script>

<template>
  <div :class="['loading-container', { 'fullscreen': fullscreen }]">
    <div class="loading-spinner">
      <div class="spinner"></div>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.loading-container.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 9999;
}

.loading-spinner {
  text-align: center;
}

.spinner {
  width: 50px;
  height: 50px;
  margin: 0 auto 20px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-spinner p {
  color: #42b883;
  font-size: 16px;
  font-weight: 500;
  margin: 0;
}
</style>
