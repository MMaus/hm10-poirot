<script setup lang="ts">
import CrimeScene from '@/components/CrimeScene.vue'
import VocabularyStack from '@/components/VocabularyStack.vue'
import ScoreBoard from '@/components/ScoreBoard.vue'
</script>

<template>
  <div class="main-container mx-auto">
    <v-row no-gutters>
      <v-col cols="4">
        <VocabularyStack />
      </v-col>
      <v-col cols="4">
        <CrimeScene />
      </v-col>
      <v-col cols="4">
        <ScoreBoard />
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.main-container {
  min-width: 800px;
  max-width: 1200px;
  width: 100%;
}
</style>
