<script setup lang="ts">
import { ref } from 'vue'

type ChipState = 'clear' | 'green' | 'yellow'

const props = defineProps<{
  word: string
}>()

const emit = defineEmits<{
  (e: 'remove', word: string): void
  (e: 'selected', word: string, state: ChipState): void
}>()

const state = ref<ChipState>('clear')

const handleClick = () => {
  let newState: ChipState = 'clear'

  switch (state.value) {
    case 'clear':
      newState = 'green'
      break
    case 'green':
      newState = 'yellow'
      break
    case 'yellow':
      newState = 'yellow'
      break
  }

  state.value = newState
  emit('selected', props.word, newState)
}

const handleRemove = (e: MouseEvent) => {
  e.stopPropagation()
  emit('remove', props.word)
}
</script>

<template>
  <div
    class="chip"
    :class="[
      {
        'bg-blue-lighten-1': state === 'clear',
        'bg-green': state === 'green',
        'bg-yellow': state === 'yellow',
      },
    ]"
    @click="handleClick"
  >
    <span class="text-sm px-2">{{ word }}</span>
    <button class="close-btn px-2 hover:bg-gray-200 rounded-r" @click="handleRemove">×</button>
  </div>
</template>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 1rem;
  margin: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.close-btn {
  font-size: 1.25rem;
  line-height: 1;
}
</style>
