<template>
  <div class="loading-container">
    <v-progress-circular
      model-value="20"
      size="64"
      width="6"
      color="primary"
      indeterminate
    />
    <p>Loading...</p>
  </div>
</template>

<style scoped>
.loading-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
}
</style>
