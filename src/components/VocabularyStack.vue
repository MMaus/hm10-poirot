<script setup lang="ts">
import { ref } from 'vue';

const vocabularyWords = ref<string[]>([]);
const newWord = ref('');
const explanation = ref('Explanation of vocabulary');

const addWord = () => {
  if (newWord.value.trim()) {
    vocabularyWords.value.unshift(newWord.value.trim());
    newWord.value = '';
  }
};

const removeWord = (index: number) => {
  vocabularyWords.value.splice(index, 1);
  // Reset explanation if we're removing the word that was being explained
  if (explanation.value.startsWith('Explain ') && 
      !vocabularyWords.value.includes(explanation.value.substring(8))) {
    explanation.value = 'Explanation of vocabulary';
  }
};

const showExplanation = (word: string) => {
  explanation.value = `Explain ${word}`;
};
</script>

<template>
  <v-card class="fill-height d-flex flex-column">
    <v-card-title>Vocabulary Stack</v-card-title>
    <v-card-text class="flex-grow-1 d-flex flex-column">
      <!-- Chip list area -->
      <div class="mb-4 chip-container">
        <v-chip
          v-for="(word, index) in vocabularyWords"
          :key="index"
          class="ma-1"
          closable
          @click="showExplanation(word)"
          @click:close="removeWord(index)"
        >
          {{ word }}
        </v-chip>
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
        <v-btn
          color="primary"
          @click="addWord"
        >
          Add
        </v-btn>
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
