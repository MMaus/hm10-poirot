<script setup lang="ts">
import { watch, nextTick } from 'vue'
import type { ChatStep } from '@/types/chat'

const props = defineProps<{
  steps: ChatStep[]
}>()

// Automatically scroll to bottom when new messages arrive
const scrollToBottom = () => {
  nextTick(() => {
    const container = document.querySelector('.crime-scene-steps')
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  })
}

// Watch for changes in steps to trigger scroll
watch(() => props.steps.length, scrollToBottom)
</script>

<template>
  <div class="crime-scene-steps">
    <div
      v-for="step in steps"
      :key="step.id"
      class="step-wrapper"
      :class="{ 'step-user': step.type === 'user', 'step-llm': step.type === 'llm' }"
    >
      <v-card
        :color="step.type === 'user' ? 'primary' : 'grey-lighten-4'"
        class="step-card"
        :class="{ 'text-white': step.type === 'user' }"
        elevation="1"
      >
        <v-card-text class="py-2">
          <div class="text-caption mb-1">
            {{ step.type === 'user' ? 'You' : 'Assistant' }}
          </div>
          <div>{{ step.message }}</div>
          <div class="text-caption text-right mt-1">
            {{ new Date(step.timestamp).toLocaleTimeString() }}
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<style scoped>
.crime-scene-steps {
  height: 800px;
  width: 100%;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #f5f5f5;
}

.step-wrapper {
  display: flex;
  width: 100%;
  margin-bottom: 8px;
}

.step-card {
  max-width: 80%;
  min-width: 200px;
}

.step-user {
  justify-content: flex-end;
}

.step-llm {
  justify-content: flex-start;
}
</style>
