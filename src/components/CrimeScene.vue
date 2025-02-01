<script setup lang="ts">
import CrimeSceneSteps from './CrimeSceneSteps.vue'
import { ref } from 'vue'

const userInput = ref('')
</script>

<template>
  <v-card class="fill-height d-flex flex-column">
    <v-card-title>Crime Scene</v-card-title>
    <v-card-text class="flex-grow-1 pa-0">
      <CrimeSceneSteps />
    </v-card-text>
    <v-card-text class="py-2">
      <v-text-field
        v-model="userInput"
        label="Enter your deduction"
        variant="outlined"
        density="comfortable"
        hide-details
      />
    </v-card-text>
  </v-card>
</template>

<style scoped>
.fill-height {
  height: 100%;
  min-height: 600px;
}
</style>
