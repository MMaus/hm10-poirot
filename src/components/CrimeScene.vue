<script setup lang="ts">
import CrimeSceneSteps from './CrimeSceneSteps.vue'
import { ref } from 'vue'
import { useLlmService } from '@/services/llmService'
import type { ChatStep } from '@/types/chat'

const userInput = ref('')
const steps = ref<ChatStep[]>([])
const { sendPrompt, isLoading, lastResponse } = useLlmService()

const submitDeduction = async () => {
  if (!userInput.value.trim()) return
  
  // Add user message
  const userStep: ChatStep = {
    id: crypto.randomUUID(),
    type: 'user',
    message: userInput.value,
    timestamp: Date.now()
  }
  steps.value.push(userStep)
  
  // Get LLM response
  const response = await sendPrompt(userInput.value)
  
  // Add LLM response
  const llmStep: ChatStep = {
    id: crypto.randomUUID(),
    type: 'llm',
    message: response.text,
    timestamp: response.timestamp
  }
  steps.value.push(llmStep)
  
  userInput.value = '' // Clear input after submission
}
</script>

<template>
  <v-card class="fill-height d-flex flex-column">
    <v-card-title>Crime Scene</v-card-title>
    <v-card-text class="flex-grow-1 pa-0">
      <CrimeSceneSteps :steps="steps" />
    </v-card-text>
    <v-card-text class="py-2">
      <v-text-field
        v-model="userInput"
        label="Enter your deduction"
        variant="outlined"
        density="comfortable"
        hide-details
        :loading="isLoading"
        @keyup.enter="submitDeduction"
      >
        <template v-slot:append>
          <v-btn
            :disabled="!userInput.trim()"
            :loading="isLoading"
            color="primary"
            @click="submitDeduction"
          >
            Submit
          </v-btn>
        </template>
      </v-text-field>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.fill-height {
  height: 100%;
  min-height: 600px;
}
</style>
