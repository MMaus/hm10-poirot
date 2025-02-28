<script setup lang="ts">
import CrimeSceneSteps from './CrimeSceneSteps.vue'
import { ref } from 'vue'
import { useLlmService } from '@/services/llmService'
import type { ChatStep } from '@/types/chat'
import { useDetectiveStore } from '@/stores/detective'
import { usePuzzleFactory } from '@/services/puzzleFactory'
import type { Puzzle } from '@/puzzles/Puzzle'

const userInput = ref('')
const steps = ref<ChatStep[]>([])
const showWelcome = ref(true)
const llmService = useLlmService()
const { isLoading } = llmService
const detectiveStore = useDetectiveStore()
const puzzleFactory = usePuzzleFactory()
const currentPuzzle = ref<Puzzle | null>(null)

const startAdventure = () => {
  showWelcome.value = false
  currentPuzzle.value = puzzleFactory.createPuzzle(detectiveStore.selectedDetective, llmService)
  
  const systemStep: ChatStep = {
    id: crypto.randomUUID(),
    type: 'system',
    message: currentPuzzle.value.getFirstResponse(),
    timestamp: Date.now()
  }
  steps.value.push(systemStep)
}

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
  const response = await llmService.sendPrompt(userInput.value)
  
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
    <v-card-text class="flex-grow-1 pa-0 position-relative">
      <v-fade-transition>
        <v-card
          v-if="showWelcome"
          class="welcome-card"
          elevation="2"
        >
          <v-card-text class="text-center">
            <div class="text-h6 mb-2">Start a new adventure with {{ detectiveStore.selectedDetective }}</div>
            <v-btn
              color="primary"
              @click="startAdventure"
            >
              Go!
            </v-btn>
          </v-card-text>
        </v-card>
      </v-fade-transition>
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

.welcome-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 300px;
  z-index: 1;
}
</style>
