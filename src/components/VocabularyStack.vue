<script setup lang="ts">
import { ref } from 'vue'
import { useVocabularyExplainer } from '@/composables/VocabularyExplainer'
import VocabularyChip from '@/components/VocabularyChip.vue'

type ChipState = 'clear' | 'green' | 'yellow'

const vocabularyWords = ref<string[]>([])
const chipStates = ref<Map<string, ChipState>>(new Map())
const newWord = ref('')
const explanation = ref('Explanation of vocabulary')
const vocabularyExplainer = useVocabularyExplainer()

const addWord = () => {
  if (newWord.value.trim()) {
    vocabularyWords.value.unshift(newWord.value.trim())
    newWord.value = ''
  }
}

const removeWord = (event: Event, index: number) => {
  if (event.target instanceof HTMLElement) {
    if (!event.target.classList.contains('mdi-close')) {
      console.log('not close icon')
      return
    }
  }
  console.log('remove word', index)
  const new_words = vocabularyWords.value.filter((word, i) => i !== index)
  console.log('new words', new_words)
  vocabularyWords.value = new_words
  event.stopPropagation()
  // Reset explanation if we're removing the word that was being explained
  if (
    explanation.value.startsWith('Explain ') &&
    !vocabularyWords.value.includes(explanation.value.substring(8))
  ) {
    explanation.value = 'Explanation of vocabulary'
  }
}

const handleChipStateChange = async (word: string, state: ChipState) => {
  if (!vocabularyWords.value.includes(word)) {
    explanation.value = 'Explanation of vocabulary'
    return
  }

  chipStates.value.set(word, state)
  console.log('show explanation', word)
  explanation.value = await vocabularyExplainer.explain(word, true, state)
}
</script>

<template>
  <v-card class="fill-height d-flex flex-column">
    <v-card-title>Vocabulary Stack</v-card-title>
    <v-card-text class="flex-grow-1 d-flex flex-column">
      <!-- Chip list area -->
      <div class="mb-4 chip-container">
        <v-chip-group column multiple>
          <VocabularyChip
            v-for="(word, index) in vocabularyWords"
            :key="word"
            :word="word"
            @remove="removeWord($event, index)"
            @selected="handleChipStateChange"
          />
        </v-chip-group>
      </div>

      <!-- Explanation text area -->
      <v-textarea
        v-model="explanation"
        readonly
        rows="4"
        class="mb-4"
        variant="outlined"
      ></v-textarea>

      <!-- Input field and add button -->
      <div class="d-flex align-center">
        <v-text-field
          v-model="newWord"
          label="Enter vocabulary"
          @keyup.enter="addWord"
          class="flex-grow-1 mr-2"
        ></v-text-field>
        <v-btn color="primary" @click="addWord"> Add </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.fill-height {
  height: 100%;
}

.chip-container {
  min-height: 48px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: 8px;
}
</style>
